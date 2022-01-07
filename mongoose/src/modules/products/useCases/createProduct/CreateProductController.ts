import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            name,
            price,
            quantity
        } = request.body;

        const createProductUseCase = container.resolve(CreateProductUseCase);
    
        const product = await createProductUseCase.execute({
            name,
            price,
            quantity
        });

        return response.status(201).json(product);
    }
};

export { CreateProductController };