"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../functions/logger");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(err);
    if (!res.headersSent) {
        const status = err.statusCode || 500;
        const message = err.message || "Something went wrong";
        // const stack = err.stack || "No stack trace available";
        const response = {
            message: message,
        };
        res.status(status).json(response);
    }
};
exports.errorHandler = errorHandler;
