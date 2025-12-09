import { Hono } from "hono";
import dealRouter from "./deal.route";
import authRotuer from "./auth.route";
import orderRouter from "./order.route";
import paymentRouter from "./payment.route";
import chatRouter from "./chat.route";
import otherRouter from "./other.route";

const rootRouter = new Hono()

rootRouter.route("/deals", dealRouter)
rootRouter.route("/auth", authRotuer)
rootRouter.route("/orders", orderRouter)
rootRouter.route("/payments", paymentRouter)
rootRouter.route("/chat", chatRouter)
rootRouter.route("/other", otherRouter)

export default rootRouter