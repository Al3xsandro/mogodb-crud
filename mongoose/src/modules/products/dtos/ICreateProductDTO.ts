interface ICreateProductDTO {
    name: string;
    price: number;
    quantity: number;
    stripe_product_id: string;
    stripe_price_id: string;
};

export { ICreateProductDTO };