import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";

class CreateCustomerController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            email,
            password,
            telefone,
        }: ICreateCustomerDTO = request.body;

        const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

        await createCustomerUseCase.execute({
            email,
            password,
            telefone
        });

        return response.status(201).send();
    }
}

export { CreateCustomerController };