import {Request, Response, NextFunction} from "express"
import { verify } from "node:crypto";
import { verifyAccessToken } from "../servives/token.service.js";

export function authenticateRequest(req: Request, res: Response, next: NextFunction){

    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({
            success: false,
            error: "Authorization header is required"
        })
    }

    const [scheme, token] = authorization.split(" ");

    if(scheme !== "Bearer" || !token){
        res.status(401).json({
            success: false,
            error: "Invalid authorization header"
        });
        return;
    }

    try{

        const payload = verifyAccessToken(token)

        res.locals.userId = payload.userId

        next();

    }
    catch(error){
        res.status(401).json({
            success: false,
            error: "Invalid or expired access token"
        })
    }


}