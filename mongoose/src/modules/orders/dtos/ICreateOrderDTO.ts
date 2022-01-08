type Product = {
    id: string;
    quantity: string;
}

interface ICreateOrderDTO {
    _id?: string;
    customerId: string;
    totalPrice: number;
    products: Product[];
};

export { ICreateOrderDTO };