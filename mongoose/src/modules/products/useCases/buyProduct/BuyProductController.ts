import { Request, Response } from "express";
import { container } from "tsyringe";
import { BuyProductUseCase } from "./BuyProductUseCase";

class BuyProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const buyProductsUseCase = container.resolve(BuyProductUseCase);
        
        return response.json();
    }
};

export { BuyProductController };