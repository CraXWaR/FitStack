import type {Request, Response, NextFunction} from "express";

export const apiNotFound = (_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({
        errors: [
            {field: "general", message: "Endpoint not found"}
        ]
    });
};