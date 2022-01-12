interface IFindOrdersDTO {
    page?: number,
    product_id?: string,
    below_price?: number,
    up_price?: string,
    date?: Date,
};

export { IFindOrdersDTO };