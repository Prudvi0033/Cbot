import { Hono } from "hono";
import { createOrder, getCategories, getOrders, getProductsByCategory } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const orderRouter = new Hono()

orderRouter.get("/categories", getCategories)
orderRouter.get("/category-products", getProductsByCategory)

orderRouter.use(authMiddleware)

orderRouter.post("/create", createOrder)
orderRouter.get("/user", getOrders)

export default orderRouter