import type { Context, Next } from "hono"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
export const authMiddleware = async (c: Context, next: Next) => {
    try {
        const authHeader = c.req.header('Authorization')

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return c.json({
                msg: "Can't find the auth header"
            }, 401)
        }

        const token = authHeader.split(" ")[1]!

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; phone: string };

        c.set("userId", decoded.userId);

        await next();
    } catch (error) {
        return c.json({ msg: "Invalid or expired token" }, 401)
    }
}