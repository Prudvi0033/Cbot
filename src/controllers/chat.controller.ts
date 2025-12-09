import type { Context } from "hono";
import { parseNlp } from "../lib/nlp";
import Product from "../models/product.model";
import Payment from "../models/payment.model";
import Deal from "../models/deal.model";
import Order from "../models/order.model";

export const getUserRequest = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const { text } = await c.req.json();
    const { intent, category, maxPrice, minPrice } = parseNlp(text);

    if (intent === "products") {
      try {
        const products = await Product.aggregate([
          {
            $match: {
              ...(category ? { category } : {}),
              ...(minPrice !== null || maxPrice !== null
                ? {
                    price: {
                      ...(minPrice !== null ? { $gte: minPrice } : {}),
                      ...(maxPrice !== null ? { $lte: maxPrice } : {}),
                    },
                  }
                : {}),
            },
          },
        ]);

        if (products.length === 0) {
          return c.json(
            { data: "No prodcuts found for this category/price" },
            404
          );
        }

        return c.json({
          data: products,
        });
      } catch (error) {
        console.log(error);
        return c.json({ error: "Failed to fetch products" }, 500);
      }
    }

    if (intent === "orders") {
      try {
        const orders = await Order.find({ userId });

        if (orders.length === 0) {
          return c.json({ data: "No orders found." }, 404);
        }

        const enrichedOrders = await Promise.all(
          orders.map(async (order) => {
            const product = await Product.findById(order.productId);
            return {
              userId,
              name: product?.name || "Unknown product",
              category: product?.category || "Unknown category",
              price: product?.price || 0,
              imageUrl: product?.imageUrl || "",
              status: order.status,
              createdAt: order.createdAt,
            };
          })
        );

        return c.json({ data: enrichedOrders });
      } catch (error) {
        console.log("Error fetching orders:", error);
        return c.json({ error: "Failed to fetch orders" }, 500);
      }
    }

    if (intent === "deals") {
      try {
        const deals = await Deal.aggregate([
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $match: {
              ...(category ? { "product.category": category } : {}),
              ...(minPrice !== null || maxPrice !== null
                ? {
                    dealPrice: {
                      ...(minPrice !== null ? { $gte: minPrice } : {}),
                      ...(maxPrice !== null ? { $lte: maxPrice } : {}),
                    },
                  }
                : {}),
            },
          },
          {
            $project: {
              _id: 0,
              name: "$product.name",
              category: "$product.category",
              price: "$product.price",
              imageUrl: "$product.imageUrl",
              dealPrice: 1,
              createdAt: "$createdAt",
            },
          },
          { $limit: 3 },
        ]);

        if (deals.length === 0) {
          return c.json(
            { data: "No deals found for this category/price" },
            404
          );
        }

        return c.json({
          data: deals,
        });
      } catch (error) {
        console.log("Error fetching deals:", error);
        return c.json({ msg: "Failed to fetch deals" }, 500);
      }
    }

    if (intent === "payments") {
      try {
        const payments = await Payment.find({ userId });

        if (payments.length === 0) {
          return c.json({ data: "No payments found." }, 404);
        }

        return c.json({
          data: payments,
        });
      } catch (error) {
        console.log(error);
        return c.json({ error: "Failed to fetch payments" }, 500);
      }
    }

    if (intent === "polite") {
      return c.json({
        data: "You're welcome! I'm here to help if you need anything else.",
      });
    }

    return c.json({
      data: "No details related to what you are looking for.",
    });
  } catch (error) {
    console.log("Error in getting chat message", error);
    return c.json("Error in getting chat message");
  }
};
