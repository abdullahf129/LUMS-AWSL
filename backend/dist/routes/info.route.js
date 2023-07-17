"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: Will implement if time permits
const express_1 = __importDefault(require("express"));
const infoRouter = express_1.default.Router();
infoRouter.get("/", (req, res) => {
});
exports.default = infoRouter;
