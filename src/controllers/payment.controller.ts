import type { Context } from "hono"
import Payment from "../models/payment.model"

export const getPaymentDetails = async (c: Context) => {
    try {
        const userId = c.get('userId')
        const payments = await Payment.find({
            userId: userId
        })

        return c.json({data: payments})
    } catch (error) {
        console.log("Error in getting payments");
        c.json("Error in getting payments")
    }
}