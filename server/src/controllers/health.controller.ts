import type {Request, Response} from "express";

const getHealth = (req: Request, res: Response ) => {
    res.status(200).json({
        status: 'OK',
        message: 'FitStack Api Health is running!',
        timestamp: new Date().toISOString()
    })
}

export default getHealth;