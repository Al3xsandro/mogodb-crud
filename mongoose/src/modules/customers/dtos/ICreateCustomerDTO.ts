interface ICreateCustomerDTO {
    email: string;
    stripeId?: string;
    password: string;
    telefone: string;
}

export { ICreateCustomerDTO };