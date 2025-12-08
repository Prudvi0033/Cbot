import { model, Schema, Types } from "mongoose";
import type { Order_Interface } from "../types/types";


const orderSchema = new Schema<Order_Interface>({
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },

    productId: {
        type: Types.ObjectId,
        ref: "Product"
    },
     status: {
        type: String,
        enum: ["PENDING", "SHIPPED", "DELIVERED"],
        default: "PENDING"
    },
    createdAt: { type: Date, default: Date.now }
})

const Order = model("Order", orderSchema)

export default Order