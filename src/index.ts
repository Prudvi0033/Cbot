import { Hono, type Context } from "hono";
import { connectDB } from "./lib/db";
import rootRouter from "./routes";
import {cors} from 'hono/cors'

const app = new Hono() 

app.use("*", cors({
    origin: ['http://localhost:3000', 'https://cbot-client.vercel.app'],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

app.get("/", (c: Context) => {
    return c.text('hello')
})

app.route("/api", rootRouter)

connectDB();

export default {
    port: process.env.PORT,
    fetch: app.fetch
};