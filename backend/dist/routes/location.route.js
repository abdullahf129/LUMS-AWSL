"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const error_1 = require("../interfaces/error");
const client_1 = __importDefault(require("../prisma/client"));
const locationRouter = express_1.default.Router();
// get all locations
locationRouter.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    const allLocations = await client_1.default.locations.findMany();
    if (!allLocations) {
        throw new error_1.MyError("Error getting locations", 500);
    }
    res.status(200).json({ success: true, data: allLocations });
}));
//create a location
locationRouter.post("/create", (0, express_async_handler_1.default)(async (req, res) => {
    const details = req.body;
    if (!details.name) {
        throw new error_1.MyError("Missing details", 400);
    }
    const location = await client_1.default.locations.create({
        data: {
            Name: details.name,
        },
    });
    if (!location) {
        throw new error_1.MyError("Error creating location", 500);
    }
    res.status(200).json({ success: true, data: location });
}));
//delete a location
locationRouter.delete("/delete/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    const location = await client_1.default.locations.delete({
        where: {
            LocationId: parseInt(id),
        },
    });
    if (!location) {
        throw new error_1.MyError("Error deleting location", 500);
    }
    res.status(200).json({ success: true, message: "Location deleted" });
}));
exports.default = locationRouter;
