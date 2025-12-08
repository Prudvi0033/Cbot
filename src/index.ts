import { Hono, type Context } from "hono";
import { connectDB } from "./lib/db";

const app = new Hono() 

app.get("/", (c: Context) => {
    return c.text('hello')
})

connectDB();

export default {
    port: process.env.PORT,
    fetch: app.fetch
};