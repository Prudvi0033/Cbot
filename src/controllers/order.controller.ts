import type { Context } from "hono";
import Product from "../models/product.model";
import Order from "../models/order.model";
import Payment from "../models/payment.model";
import { getPaymentStatus, getRandomStatus } from "../lib/utils";

export const getCategories = async (c: Context) => {
  try {
    const allCategories = await Product.aggregate([
      { $group: { _id: "$category" } },
      { $sort: { _id: 1 } },
    ]);

    const categories = allCategories.map((cat) => cat._id);
    return c.json(
      {
        msg: "Categories",
        categories,
      },
      200
    );
  } catch (error) {
    console.log("Error in getting categories");
    return c.json({ msg: "Error in getting categories" }, 500);
  }
};

export const getProductsByCategory = async (c: Context) => {
  try {
    const category = c.req.query("category");
    const products = await Product.find({
      category: category,
    });

    return c.json(
      {
        msg: `Prodcuts in ${category}`,
        products,
      },
      200
    );
  } catch (error) {
    console.log("Error in getting products by category");
    return c.json({ msg: "Error in getting products by category" }, 500);
  }
};

export const createOrder = async (c: Context) => {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json(
        {
          msg: "Userid not found",
        },
        400
      );
    }

    const { productId } = await c.req.json();

    const product = await Product.findById(productId);
    if (!product) {
      return c.json(
        {
          msg: "Product not found",
        },
        400
      );
    }

    const order = await Order.create({
      userId: userId,
      productId: productId,
      status: getRandomStatus(),
    });

    if (!order) {
      return c.json(
        {
          msg: "Order not created",
        },
        400
      );
    }

    const paymentStatus = getPaymentStatus();

    let amountPaid, pendingAmount;

    if (paymentStatus == "PENDING") {
      amountPaid = 0;
      pendingAmount = product.price;
    } else {
      amountPaid = product.price;
      pendingAmount = 0;
    }

    const payment = await Payment.create({
      userId: userId,
      orderId: order.id,
      status: paymentStatus,
      amountPaid: amountPaid,
      pendingAmount: pendingAmount,
    });

    return c.json({
      msg: "Order Placed",
    });
  } catch (error) {
    console.log("Error in placing Order", error);
    c.json("Error in placing order");
  }
};

export const getOrders = async (c: Context) => {
  try {
    const userId = c.get("userId");

    const orders = await Order.find({
      userId: userId,
    });

    const products = await Promise.all(
      orders.map(async (order) => {
        const product = await Product.findById(order.productId)!;

        return {
          userId: userId,
          name: product?.name,
          category: product?.category,
          price: product?.price,
          imageUrl: product?.imageUrl,
          staus: order.status,
        };
      })
    );

    return c.json({
        msg: "User orders",
        orders: products
    });
  } catch (error) {
    console.log("Error in getting orders");
    c.json("Error in getting orders");
  }
};
