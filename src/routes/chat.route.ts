import { Hono } from "hono";
import { getUserRequest } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const chatRouter = new Hono()

chatRouter.use(authMiddleware)
chatRouter.post("/send", getUserRequest)

export default chatRouter