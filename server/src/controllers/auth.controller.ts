import {Request, Response}from "express"
import { loginUser, refreshAccessToken, registerUser } from "../servives/auth.service.js";

export async function register(req: Request, res: Response){
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            error: "Email and password are required"
        });

        return;
    }

    try{

        const user = await registerUser(email, password);

        res.status(201).json({
            success: true,
            user
        })

    }
    catch(error){
        if(error instanceof Error && 
            error.message === "USer already exists"
        ) {
            res.status(409).json({
                success: false,
                error: error.message
            })
            return
        }
        throw error
    }
}

export async function login(req: Request, res: Response){
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            error : "Email and password are required"
        });
    }

    try{
        const result = await loginUser(email, password);

        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7*24*60*60*1000,
                path: "/auth"
            }
        );

        res.status(200).json({
            success: true,
            data: {
                user: result.user,
                accessToken: result.accessToken
            }
        })

    }
    catch(error){
        res.status(401).json({
            success: false,
            error: "Invalid email or password"
        })
    }
}

export async function RefreshTokenController(req: Request, res: Response){
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        res.status(401).json({
            success: false,
            error: "Refresh token is missing"
        });

        return;
    }

    try{
        const result = await refreshAccessToken(refreshToken);

        res.status(200).json({
            success: true,
            accessToken: result.accessToken
        });
    }catch(error){
        res.status(401).json({
            success: false,
            error: "Invalid or expired refresh token"
        });
    }
}