import jwt from "jsonwebtoken"
import { AccessTokenPayload, RefreshTokenPayload } from "../types/auth.types.js";
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from "../config/auth.config.js";


function getRequiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not configured`);
    }

    return value;
}

const accessSecret = getRequiredEnv("JWT_ACCESS_SECRET");
const refreshSecret = getRequiredEnv("JWT_REFRESH_SECRET");

export function generateAccessToken (userId: string): string {
    const payload: AccessTokenPayload = {
        userId
    }
     return jwt.sign(payload, accessSecret, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN
     })
}

export function generateRefreshToken(userId: string):string{
    const payload: RefreshTokenPayload = {
        userId
    }
    return jwt.sign(payload, refreshSecret, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN
    })
}

export function verifyRefreshToken(token: string): RefreshTokenPayload{
    return jwt.verify(token, refreshSecret) as RefreshTokenPayload;
}

export function verifyAccessToken(token: string): AccessTokenPayload{
    return jwt.verify(token, accessSecret) as AccessTokenPayload
}