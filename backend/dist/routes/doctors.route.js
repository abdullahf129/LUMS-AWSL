"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = __importDefault(require("../prisma/client"));
const error_1 = require("../interfaces/error");
dotenv_1.default.config();
const doctorsRouter = express_1.default.Router();
doctorsRouter.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    const all_doctors = await client_1.default.doctors.findMany();
    if (!all_doctors) {
        throw new error_1.MyError("No doctors in the database 😞", 500);
    }
    else {
        res.status(200).json(all_doctors);
    }
}));
doctorsRouter.post("/create", (0, express_async_handler_1.default)(async (req, res) => {
    const creds = req.body;
    if (!creds.Name || !creds.Address || !creds.Contact || !creds.Type) {
        throw new error_1.MyError("One or more than one attributes are missing", 400);
    }
    // const doctor = await prisma.doctors.findFirstOrThrow({
    // 	where: {
    // 		Name: creds.Name,
    // 	},
    // });
    // if (doctor) {
    // 	throw new MyError("Doctor with this name already exists", 404);
    // } else {
    const newEntry = await client_1.default.doctors.create({
        data: {
            Name: creds.Name,
            Address: creds.Address,
            Contact: creds.Contact,
            Type: creds.Type,
        },
    });
    if (!newEntry) {
        throw new error_1.MyError("Error adding doctor 😞", 500);
    }
    res.status(200).json({ message: "Doctor added successfully 😊 👌" });
    // }
}));
doctorsRouter.delete("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        throw new error_1.MyError("Doctor not found", 404);
    }
    else {
        const deletedEntry = await client_1.default.doctors.delete({
            where: {
                DoctorId: id,
            },
        });
        if (!deletedEntry) {
            throw new error_1.MyError("Error deleting doctor 😞", 500);
        }
        res.status(200).json({ message: "Doctor deleted successfully 😊 👌" });
    }
}));
exports.default = doctorsRouter;
