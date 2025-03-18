import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    sub: string;
    "custom:role"?: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            }
        }
    }
}
export const authmiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Unauthorize" });
            return;
        }

        try {
            const decoded = jwt.decode(token) as DecodedToken
            const userRole = decoded["custom:role"] || "";
            req.user = {
                id: decoded.sub,
                role: userRole
            }

            const hasAccess = allowedRoles.includes(userRole.toLocaleLowerCase());
            if (!hasAccess) {
                res.status(401).json({ message: "Access Denied" });
            }
        } catch (error) {
            console.error("failed to decode token:", error);
            res.status(400).json({ message: "Invalid Token" });
            return;
        }
        next();
    }
}