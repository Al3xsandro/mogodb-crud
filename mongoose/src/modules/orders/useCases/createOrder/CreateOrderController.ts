import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { customerId, totalPrice, products }: ICreateOrderDTO = request.body;
        
        const createOrderUseCase = container.resolve(CreateOrderUseCase);

        const order = await createOrderUseCase.execute({
            customerId,
            totalPrice,
            products
        });

        return response.status(201).json(order);
    }
};

export { CreateOrderController };