type Product = {
    id: string;
    quantity: number;
}

interface ICreateOrderDTO {
    _id?: string;
    customerId: string;
    totalPrice: number;
    products: Product[];
};

export { ICreateOrderDTO };