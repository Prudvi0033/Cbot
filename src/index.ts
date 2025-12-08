import { Hono, type Context } from "hono";
import { connectDB } from "./lib/db";
import rootRouter from "./routes";

const app = new Hono() 

app.get("/", (c: Context) => {
    return c.text('hello')
})

app.route("/api", rootRouter)

connectDB();

export default {
    port: process.env.PORT,
    fetch: app.fetch
};