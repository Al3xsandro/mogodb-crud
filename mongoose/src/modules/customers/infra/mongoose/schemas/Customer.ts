import mongoose, { Document, Schema } from "mongoose";

interface ICustomer {
    _id?: string;
    email: string;
    password: string;
    telefone: string;
};

type ICustomerDocument = Document & ICustomer;

const customerSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        telefone: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const customer = mongoose.model<ICustomerDocument>('Customer', customerSchema);

export { 
    customer,
    ICustomerDocument
};