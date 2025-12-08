import { model, Schema, Types } from "mongoose";

export const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    //relations
    orders: [{
        type: Types.ObjectId,
        ref: "Order"
    }],
    payments: [{
        type: Types.ObjectId,
        ref: "Payment"
    }]
})

const User = model("User", userSchema)

export default User;