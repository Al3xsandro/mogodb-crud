import { Request, Response } from "express";
import { container } from "tsyringe";
import { IFindOrdersDTO } from "../../dtos/IFindOrdersDTO";
import { FindOrdersUseCase } from "./FindOrdersUseCase";

class FindOrdersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            below_price,
            up_price,
            date,
            page,
            product_id,
         }: IFindOrdersDTO = request.query;

        const findOrdersUseCase = container.resolve(FindOrdersUseCase);

        const orders = await findOrdersUseCase.execute({
            below_price,
            up_price,
            date,
            page,
            product_id
        });

        return response.json(orders);
    };
};

export { FindOrdersController };