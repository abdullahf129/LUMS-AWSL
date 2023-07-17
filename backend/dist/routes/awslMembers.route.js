"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = __importDefault(require("../prisma/client"));
const unique_string_1 = __importDefault(require("unique-string"));
const error_1 = require("../interfaces/error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const sendEmail_1 = require("../functions/sendEmail");
const jwt_1 = require("../functions/jwt");
dotenv_1.default.config();
const awslMemberRouter = express_1.default.Router();
awslMemberRouter.post("/login", (0, express_async_handler_1.default)(async (req, res) => {
    const creds = req.body;
    console.log(creds);
    if (!creds.email || !creds.password) {
        throw new error_1.MyError("Email and password are required", 400);
    }
    const user = await client_1.default.aWSLMembers.findFirstOrThrow({
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
            id: user.AWSLMemberId,
            role: "member",
        };
        const token = (0, jwt_1.generateToken)(payload);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌", id: user.AWSLMemberId });
    }
}));
//get all members
awslMemberRouter.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    const members = await client_1.default.aWSLMembers.findMany({
        include: {
            Department: true,
        },
    });
    if (!members) {
        throw new error_1.MyError("Error fetching members 😞", 500);
    }
    res.status(200).json(members);
}));
//get member by ID
awslMemberRouter.get("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id);
    const member = await client_1.default.aWSLMembers.findUnique({
        where: {
            AWSLMemberId: id,
        },
        include: {
            Department: true,
        },
    });
    if (!member) {
        throw new error_1.MyError("Member not found", 404);
    }
    res.status(200).json(member);
}));
//create a new member
awslMemberRouter.post("/create", (0, express_async_handler_1.default)(async (req, res) => {
    const member_details = req.body;
    if (!member_details.name ||
        !member_details.email ||
        !member_details.departmentId) {
        throw new error_1.MyError("Email and department are required", 400);
    }
    //only first six characters
    const pwd = ((0, unique_string_1.default)()).slice(0, 6);
    const hash = await bcrypt_1.default.hash(pwd, parseInt(process.env.SALT_ROUNDS) || 3);
    const member = await client_1.default.aWSLMembers.create({
        data: {
            Name: member_details.name,
            Email: member_details.email,
            Password: hash,
            DepartmentId: member_details.departmentId,
        },
    });
    const email = await (0, sendEmail_1.sendOnboardingEmail)(member_details.email, "Member Onboarding", member_details.name, member_details.email, pwd, `${process.env.FRONTEND_URL}/awsl-member/login`);
    if (!member) {
        throw new error_1.MyError("Error creating new member 😞", 500);
    }
    res
        .status(200)
        .json({ message: "Member created successfully 👍💯", pwd: pwd });
}));
//delete an existing member
awslMemberRouter.delete("/delete/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const member_details = parseInt(req.params.id);
    if (!member_details) {
        throw new error_1.MyError("Id is required", 400);
    }
    const member = await client_1.default.aWSLMembers.delete({
        where: {
            AWSLMemberId: member_details,
        },
    });
    if (!member) {
        throw new error_1.MyError("Error deleting member 😞", 500);
    }
    res.status(200).json({ message: "Member deleted successfully 👍💯" });
}));
//update an existing member
awslMemberRouter.put("/update", (0, express_async_handler_1.default)(async (req, res) => {
    const member_details = req.body;
    if (!member_details.name ||
        !member_details.id ||
        !member_details.email ||
        !member_details.departmentId) {
        throw new error_1.MyError("Id, email and department are required", 400);
    }
    const member = await client_1.default.aWSLMembers.update({
        where: {
            AWSLMemberId: member_details.id,
        },
        data: {
            Name: member_details.name,
            Email: member_details.email,
            DepartmentId: member_details.departmentId,
        },
    });
    if (!member) {
        throw new error_1.MyError("Error updating member 😞", 500);
    }
    res.status(200).json({ message: "Member updated successfully 👍💯" });
}));
exports.default = awslMemberRouter;
