import { randomUUID, verify } from "node:crypto";
import { hashPassword } from "../utils/password.js";
import { createUser, getUserByEmail } from "../storage/user.repository.js";
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./token.service.js";
import { REFRESH_TOKEN_EXPIRES_IN_MS } from "../config/auth.config.js";
import { createRefreshToken, getRefreshTokenByToken, getRefreshTokensByUserId } from "../storage/refreshToken.repository.js";

export async function registerUser(email:string, password: string){
    const existingUser = await getUserByEmail(email)

    if(existingUser){
        throw new Error("User already exists")
    }

    const passwordHash = await hashPassword(password);

    const user = await createUser(
        randomUUID(),
        email,
        passwordHash
    )

    return user
}

export async function loginUser(email: string, password: string){
    const user = await getUserByEmail(email)

    if(!user){
        throw new Error("Invalid email or password")
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid){
        throw new Error("Invalid email or password")
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)
    const refreshTokenHash = await bcrypt.hash(
        refreshToken,
        12
    );
    const expiresAt = new Date(Date.now()+REFRESH_TOKEN_EXPIRES_IN_MS)
    const refreshTokenId = randomUUID();

    await createRefreshToken(refreshTokenId, user.id, refreshTokenHash, expiresAt)

    return {
        user:{
            id: user.id,
            email: user.email
        },
        accessToken,
        refreshToken
    }
}

export async function refreshAccessToken(refreshToken: string){
    const payload = verifyRefreshToken(refreshToken)

    const refreshTokens = await getRefreshTokensByUserId(payload.userId)

    let storedToken = null

    for (const token of refreshTokens){
        const matches = await bcrypt.compare(refreshToken, token.tokenHash)

        if (matches) {
            storedToken = token;
            break;
        }
    }

    if (!storedToken){
        throw new Error("Refresh token is invalid")
    }

    if (storedToken.expiresAt < new Date()) {
        throw new Error("Refresh token has expired");
    }


    const accessToken = generateAccessToken(payload.userId)

    return {
        accessToken
    }


}