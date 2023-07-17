"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../prisma/client"));
const error_1 = require("../interfaces/error");
const jwt_1 = require("../functions/jwt");
dotenv_1.default.config();
const adminDashboardRouter = express_1.default.Router();
//login admin
adminDashboardRouter.post("/login", (0, express_async_handler_1.default)(async (req, res) => {
    const creds = req.body;
    if (!creds.email || !creds.password) {
        throw new error_1.MyError("Email and password are required", 400);
    }
    const user = await client_1.default.aWSLAdmins.findFirstOrThrow({
        where: {
            Email: creds.email,
        },
    });
    const valid = await bcrypt_1.default.compare(creds.password, user.Password);
    if (!user) {
        throw new error_1.MyError("User not found", 404);
    }
    else if (!valid) {
        throw new error_1.MyError("Incorrect password", 400);
    }
    else {
        //user verified
        const payload = {
            email: user.Email,
            id: user.AWSLAdminId,
            role: "admin",
        };
        const token = (0, jwt_1.generateToken)(payload);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌", id: user.AWSLAdminId });
    }
}));
//logout admin
adminDashboardRouter.post("/logout", (0, express_async_handler_1.default)(async (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
        .status(200)
        .json({ message: "Logged out successfully 😊 👌 " });
}));
adminDashboardRouter.get("/analysis", (0, express_async_handler_1.default)(async (req, res) => {
    const activeCases = await client_1.default.incidents.count({
        where: {
            ResolvedAt: undefined,
        },
    });
    const resolvedCases = await client_1.default.incidents.count({
        where: {
            ResolvedAt: {
                not: undefined,
            },
        },
    });
    const totalMembers = await client_1.default.aWSLMembers.count();
    const totalDoctors = await client_1.default.doctors.count();
    const totalCats = await client_1.default.cATalogue.count();
    res.status(200).json({
        success: true,
        // data: {
        // 	activeCases,
        // 	resolvedCases,
        // 	totalMembers,
        // 	totalDoctors,
        // 	totalCats,
        // },
        data: [
            {
                title: "Total Members",
                value: totalMembers,
            },
            {
                title: "Total Doctors",
                value: totalDoctors,
            },
            {
                title: "Total Cats",
                value: totalCats,
            },
            {
                title: "Active Cases",
                value: activeCases,
            },
            {
                title: "Resolved Cases",
                value: resolvedCases,
            },
        ],
    });
}));
exports.default = adminDashboardRouter;
