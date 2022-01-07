import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindTotalProductsUseCase } from "./FindTotalProductsUseCase";

class FindTotalProductsController {
    async handle(request: Request, response: Response) {
        const findTotalProductsUseCase = container.resolve(FindTotalProductsUseCase);
    
        const products = await findTotalProductsUseCase.execute();

        return response.status(200).json(products);
    };
};

export { FindTotalProductsController };