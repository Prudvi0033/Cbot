import { Hono } from "hono";
import type { Context } from "hono";

const otherRouter = new Hono();

otherRouter.get("/", (c: Context) => {
  return c.json({
    data: "For any assistance, please contact our support team at +1-800-123-4567. We're here to help you with any questions or issues!"
  });
});

export default otherRouter;
