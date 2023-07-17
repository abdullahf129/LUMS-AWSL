"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyReportToken = exports.checkAdminAuthenticated = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = require("../interfaces/error");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
dotenv_1.default.config();
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
exports.generateToken = generateToken;
exports.checkAdminAuthenticated = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        throw new error_1.MyError("Unauthorized", 401);
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const { role } = decoded;
    if (!decoded || role !== "admin") {
        throw new error_1.MyError("Unauthorized", 401);
    }
    else {
        req.body.user = decoded;
        next();
    }
});
exports.verifyReportToken = (0, express_async_handler_1.default)(async (req, res, next) => {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    if (!token) {
        throw new error_1.MyError("Unauthorized", 401);
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        throw new error_1.MyError("Unauthorized", 401);
    }
    else {
        req.email = decoded.email;
        next();
    }
});
