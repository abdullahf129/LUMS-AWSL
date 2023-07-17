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
const homepageRouter = express_1.default.Router();
//homepage get all use cases
homepageRouter.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    var _a, _b, _c, _d;
    const catalog = (_a = (await client_1.default.cATalogue.findMany())) === null || _a === void 0 ? void 0 : _a.slice(0, 2);
    const doctors = (_b = (await client_1.default.doctors.findMany())) === null || _b === void 0 ? void 0 : _b.slice(0, 2);
    const incidents = (_c = (await client_1.default.incidents.findMany({
        where: {
            ResolvedAt: undefined,
        },
    }))) === null || _c === void 0 ? void 0 : _c.slice(0, 2);
    const profiles = (_d = (await client_1.default.adoptionProfiles.findMany({
        include: {
            AdoptionPictures: true,
        },
    }))) === null || _d === void 0 ? void 0 : _d.slice(0, 2);
    if (!catalog || !doctors || !incidents || !profiles) {
        throw new error_1.MyError("Error getting data at homepage", 500);
    }
    const ret = [
        {
            caption: "Recent Reports",
            see_all_link: "/user/report",
            items: incidents,
        },
        {
            caption: "Up For Adoption",
            see_all_link: "/user/adoption",
            items: profiles,
        },
        {
            caption: "CATalogue",
            see_all_link: "/user/catalog",
            items: catalog,
        },
    ];
    res.status(200).json({ success: true, data: ret });
}));
exports.default = homepageRouter;
