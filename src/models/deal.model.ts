import { model, Schema, Types } from "mongoose";

const dealSchema = new Schema({
  productId: { type: Types.ObjectId, ref: "Product" },
  dealPrice: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now }
});

const Deal = model("Deal", dealSchema)

export default Deal
