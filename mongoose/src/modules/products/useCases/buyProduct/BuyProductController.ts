import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateCheckoutDTO } from "../../dtos/ICreateCheckoutDTO";
import { BuyProductUseCase } from "./BuyProductUseCase";

class BuyProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { customer_id, price_id, quantity }: ICreateCheckoutDTO = request.body;

        const buyProductsUseCase = container.resolve(BuyProductUseCase);

        const checkout_url = await buyProductsUseCase.execute({
            customer_id,
            price_id,
            quantity
        });
        
        return response.json(checkout_url);
    }
};

export { BuyProductController };