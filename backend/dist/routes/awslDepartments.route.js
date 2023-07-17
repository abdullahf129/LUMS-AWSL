"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = __importDefault(require("../prisma/client"));
const error_1 = require("../interfaces/error");
const awslDepartmentRouter = express_1.default.Router();
//get all departments
awslDepartmentRouter.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    const department = await client_1.default.departments.findMany();
    if (!department) {
        throw new error_1.MyError("Error fetching departments 😞", 500);
    }
    else {
        res.status(200).json(department);
    }
}));
awslDepartmentRouter.get("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id);
    const department_val = await client_1.default.departments.findUnique({
        where: {
            DepartmentId: id,
        }
    });
    if (!department_val) {
        throw new error_1.MyError("Department not found", 404);
    }
    res.status(200).json(department_val);
}));
awslDepartmentRouter.get("/:id/:members", (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id);
    const members = await client_1.default.aWSLMembers.findMany({
        where: {
            DepartmentId: id,
        },
    });
    if (!members) {
        throw new error_1.MyError("Members not found", 404);
    }
    res.status(200).json(members);
}));
awslDepartmentRouter.post("/new", (0, express_async_handler_1.default)(async (req, res) => {
    const creds = req.body;
    if (!creds.Name) {
        throw new error_1.MyError("Name required", 400);
    }
    const department_details = await client_1.default.departments.findFirst({
        where: {
            Name: creds.Name,
        },
    });
    if (department_details) {
        throw new error_1.MyError("Department with this name already exists", 404);
    }
    else {
        const new_department = await client_1.default.departments.create({
            data: {
                Name: creds.Name,
            },
        });
        if (!new_department) {
            throw new error_1.MyError("Error adding department 😞", 500);
        }
        res.status(200).json({ message: "department added successfully 😊 👌" });
    }
}));
awslDepartmentRouter.delete("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        throw new error_1.MyError("Department not found", 404);
    }
    else {
        const deletedEntry = await client_1.default.departments.delete({
            where: {
                DepartmentId: id,
            },
        });
        if (!deletedEntry) {
            throw new error_1.MyError("Error deleting department 😞", 500);
        }
        res.status(200).json({ message: "Department deleted successfully 😊 👌" });
    }
}));
exports.default = awslDepartmentRouter;
