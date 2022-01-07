import mongoose, { Document, Schema } from "mongoose";

interface IProduct {
    _id?: string;
    name: string;
    price: number;
    quantity: number;
}

type IProductDocument = Document & IProduct;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const product = mongoose.model<IProductDocument>('Product', productSchema);

export {
    product,
    IProductDocument
}