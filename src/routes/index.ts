import { Hono } from "hono";
import dealRouter from "./deal.route";
import authRotuer from "./auth.route";

const rootRouter = new Hono()

rootRouter.route("/deals", dealRouter)
rootRouter.route("/auth", authRotuer)

export default rootRouter