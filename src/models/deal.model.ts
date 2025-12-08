import { model, Schema, Types } from "mongoose";
import type { Deal_Interface } from "../types/types";

const dealSchema = new Schema<Deal_Interface>({
  productId: { type: Types.ObjectId, ref: "Product" },
  dealPrice: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now }
});

const Deal = model("Deal", dealSchema)

export default Deal
