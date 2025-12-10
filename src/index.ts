import { Hono, type Context } from "hono";
import { connectDB } from "./lib/db";
import rootRouter from "./routes";
import {cors} from 'hono/cors'

const router = new Hono() 

router.options("*", (c) => c.body(null, 204))

router.use("*", cors({
    origin: ['http://localhost:3000', 'https://cbot-client.vercel.app'],
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

router.get("/", (c: Context) => {
    return c.text('hello')
})

router.route("/api", rootRouter)

connectDB();

export default {
    port: process.env.PORT,
    fetch: router.fetch
};