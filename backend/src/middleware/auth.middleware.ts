import { UserType } from './../models/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express'

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"]

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized to access this route." })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decoded as JwtPayload).userId
        next()
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized to access this route." })
    }



}   