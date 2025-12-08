import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now }
})

const Product = model('Product', productSchema)

export default Product