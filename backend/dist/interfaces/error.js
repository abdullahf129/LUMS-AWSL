"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyError = void 0;
class MyError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.MyError = MyError;
