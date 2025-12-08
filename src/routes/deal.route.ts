import { Hono } from "hono";
import { getDeals } from "../controllers/deal.controller";

const dealRouter = new Hono()

dealRouter.get("/", getDeals)

export default dealRouter;