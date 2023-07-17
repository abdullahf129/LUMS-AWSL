import { NextFunction, Request, Response } from "express";
import { ErrorMessage, MyError } from "../interfaces/error";
import { logger } from "../functions/logger";

export const errorHandler = (
	err: MyError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error(err);

	if (!res.headersSent) {
		const status = err.statusCode || 500;
		const message = err.message || "Something went wrong";
		// const stack = err.stack || "No stack trace available";

		const response: ErrorMessage = {
			message: message,
		};

		res.status(status).json(response);
	}
};
