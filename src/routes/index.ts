import { Hono } from "hono";
import dealRouter from "./deal.route";
import authRotuer from "./auth.route";
import orderRouter from "./order.route";
import paymentRouter from "./payment.route";

const rootRouter = new Hono()

rootRouter.route("/deals", dealRouter)
rootRouter.route("/auth", authRotuer)
rootRouter.route("/orders", orderRouter)
rootRouter.route("payments", paymentRouter)

export default rootRouter