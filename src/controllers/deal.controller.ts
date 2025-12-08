import type { Context } from "hono";
import Deal from "../models/deal.model";
import Product from "../models/product.model";

export const getDeals = async (c: Context) => {
    try {
        const deals = await Deal.aggregate([{$sample: {size: 3}}])
        
        const prodcuts = await Promise.all(
            deals.map(async (deal) => {
                const product = await Product.findById(deal.productId);

                if(!product) return null;

                return {
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    dealPrice: deal.dealPrice,
                    createdAt: product.createdAt
                }
            })
        )

        return c.json({
            msg: "Deals",
            prodcuts
        })
    } catch (error) {
        console.log("error getting deals",error);
        return c.json({ msg: "Failed to fetch deals" }, 500);
    }
}