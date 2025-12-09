import { Hono } from "hono";
import { login, profile, signUp } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRotuer = new Hono()

authRotuer.post("/sign-up", signUp)
authRotuer.post("/login", login)

authRotuer.use(authMiddleware)
authRotuer.get("/profile", profile)

export default authRotuer;