import { Request, Response } from "express"

export const home = (_req:Request, res: Response) : void => {
    res.status(200).json({
        application: "Drivelite",
        status: "Running",
        version: "1.0.0"
    });
};