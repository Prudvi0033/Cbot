import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getPaymentDetails } from "../controllers/payment.controller";

const paymentRouter = new Hono()

paymentRouter.use(authMiddleware)
paymentRouter.get("/", getPaymentDetails)

export default paymentRouter