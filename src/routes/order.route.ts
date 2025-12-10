import { Hono } from "hono";
import { createOrder, getCategories, getOrders, getProductsByCategory } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const orderRouter = new Hono()

orderRouter.get("/categories", getCategories)
orderRouter.get("/category-products", getProductsByCategory)

const protectedOrderRouter = new Hono()
protectedOrderRouter.use(authMiddleware)
protectedOrderRouter.post("/create", createOrder)
protectedOrderRouter.get("/user", getOrders)

orderRouter.route("", protectedOrderRouter)

export default orderRouter