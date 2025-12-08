import type { Context } from "hono";
import jwt from 'jsonwebtoken';
import User from "../models/user.model";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!

const generateJwt = (userId: string, phone: string) => {
    const token = jwt.sign({userId, phone}, JWT_SECRET, {expiresIn: '7d'})
    return token;
}

export const signUp = async (c: Context) => {
    try {
        const { name, phone, password, email, address } = await c.req.json();

        if (!name || !phone || !password) {
            return c.json({ msg: "Name, phone, and password are required" }, 400);
        }

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return c.json({ msg: "User already exists" }, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            phone,
            password: hashedPassword,
            email,
            address,
        });

        const token = generateJwt(user._id.toString(), phone);

        return c.json({ msg: "User created", token }, 201);
    } catch (error) {
        console.error(error);
        return c.json({ msg: "Signup failed" }, 500);
    }
};

export const login = async (c: Context) => {
    try {
        const { phone, password } = await c.req.json();

        if (!phone || !password) {
            return c.json({ msg: "Phone and password are required" }, 400);
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return c.json({ msg: "User doesn't exist" }, 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return c.json({ msg: "Incorrect credentials" }, 401);
        }

        const token = generateJwt(user._id.toString(), phone);

        return c.json({ msg: "User logged in", token }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ msg: "Login failed" }, 500);
    }
};
