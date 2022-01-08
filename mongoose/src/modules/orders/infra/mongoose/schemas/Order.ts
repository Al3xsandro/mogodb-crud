import mongoose, { Document, Schema } from "mongoose";

type Product = {
    id: string;
    quantity: string;
}

interface IOrder {
    _id?: string;
    customerId: string;
    totalPrice: number;
    products: Product[];
};

type IOrderDocument = Document & IOrder;

const orderSchema = new Schema(
    {
        customerId: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
    },
);

const order = mongoose.model<IOrderDocument>('Order', orderSchema);

export {
    order,
    IOrderDocument
}