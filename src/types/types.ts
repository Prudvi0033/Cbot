import type { Types } from "mongoose";

export interface Deal_Interface {
    productId: Types.ObjectId,
    dealPrice: Number
    createdAt: Date,
}

export interface Order_Interface {
    userId: Types.ObjectId,
    productId: Types.ObjectId,
    status: string,
    createdAt: Date
}

export interface Payment_Interface {
    userId: Types.ObjectId,
    orderId: Types.ObjectId,
    amountPaid: number,
    pendingAmount: number,
    status: string,
    createdAt: Date
}

export interface Product_Interface {
    name: string,
    category: string,
    price: number,
    imageUrl: string,
    createdAt: Date
}

export interface User_Interface {
    name: string,
    phone: string,
    password: string,
    address: string,
    email: string,
    createdAt: Date,
    orders: string[],
    payments: string[]
}