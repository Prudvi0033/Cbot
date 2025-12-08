import { Hono } from "hono";
import { login, signUp } from "../controllers/auth.controller";

const authRotuer = new Hono()

authRotuer.post("/sign-up", signUp)
authRotuer.post("/login", login)

export default authRotuer;