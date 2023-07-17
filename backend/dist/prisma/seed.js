"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(async () => {
    const user1 = await client_1.default.aWSLAdmins.upsert({
        where: { Email: "admin1@admin.com" },
        update: {},
        create: {
            Email: "admin1@admin.com",
            Password: bcrypt_1.default.hashSync("admin1", parseInt(process.env.SALT_ROUNDS) || 3),
            Name: "Admin 1",
        },
    });
    const user2 = await client_1.default.aWSLAdmins.upsert({
        where: { Email: "admin2@admin.com" },
        update: {},
        create: {
            Email: "admin2@admin.com",
            Password: bcrypt_1.default.hashSync("admin2", parseInt(process.env.SALT_ROUNDS) || 3),
            Name: "Admin 1",
        },
    });
    const department = await client_1.default.departments.create({
        data: {
            Name: "Daily Care",
        },
    });
    console.log({ user1, user2 });
})();
