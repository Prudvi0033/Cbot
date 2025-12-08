import { model, Schema, Types } from "mongoose";
import type { Payment_Interface } from "../types/types";

const paymentSchema = new Schema<Payment_Interface>({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  orderId: {
    type: Types.ObjectId,
    ref: "Order",
  },

  paymentMethod: {
    type: String,
    enum: ['PAY_NOW', 'PAY_ON_DELIVERY'],
  },

  amountPaid: { type: Number, required: true },
  pendingAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending",
  },

  createdAt: { type: Date, default: Date.now },
});

const Payment = model("Payment", paymentSchema);

export default Payment;
