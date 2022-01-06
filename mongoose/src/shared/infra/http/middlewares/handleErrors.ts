import { 
    Request,
    Response,
    NextFunction
} from "express";
import { AppError } from "../../../errors/AppError";


export function handleErrors(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    };

    return response.status(500).send({
        status: "error",
        message: `Internal server error: ${err.message}`
    });
};