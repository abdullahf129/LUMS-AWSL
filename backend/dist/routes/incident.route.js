"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const error_1 = require("../interfaces/error");
const client_1 = __importDefault(require("../prisma/client"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const jwt_1 = require("../functions/jwt");
const sendEmail_1 = require("../functions/sendEmail");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const incidentRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../../public/uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
//send a token to user email to report an incident
incidentRouter.post("/validate", (0, express_async_handler_1.default)(async (req, res) => {
    const email = req.body.email;
    const token = (0, jwt_1.generateToken)({ email });
    if (!email) {
        throw new error_1.MyError("Email is required 😿", 400);
    }
    const sent = await (0, sendEmail_1.sendEmail)(req.body.email, "Report an incident", `${process.env.FRONTEND_URL}/user/add-report?token=${token}`);
    if (!sent) {
        throw new error_1.MyError("Error sending email", 500);
    }
    res
        .status(200)
        .json({
        success: true,
        message: `Email sent at ${email}, please verify to continue.`,
    });
}));
incidentRouter.post("/create", jwt_1.verifyReportToken, upload.single("incidentImg"), (0, express_async_handler_1.default)(async (req, res) => {
    const details = req.body;
    const email = req.email;
    const file = req.file;
    if (!details.title ||
        !details.locationDescription ||
        !details.description ||
        !details.location) {
        throw new error_1.MyError("Missing details", 400);
    }
    const incident = await client_1.default.incidents.create({
        data: {
            Title: details.title,
            LocationDescription: details.locationDescription,
            Description: details.description,
            LocationId: parseInt(details.location),
            Image: file === null || file === void 0 ? void 0 : file.filename,
            Email: email,
        },
    });
    //get location name
    const location = await client_1.default.locations.findUnique({
        where: {
            LocationId: parseInt(details.location),
        },
    });
    //send an email to all AWSL member who are a part of the daily care department, id = 1
    const members = await client_1.default.aWSLMembers.findMany({
        where: {
            DepartmentId: 1,
        },
    });
    const emails = members.map((member) => member.Email);
    //loop over emails 
    for (const member of emails) {
        const sent = await (0, sendEmail_1.sendCaseEmail)(member, "New Incident Reported", email, (location === null || location === void 0 ? void 0 : location.Name) || "Unknown", details.locationDescription, details.description);
        if (!sent) {
            throw new error_1.MyError("Error sending email", 500);
        }
    }
    if (!incident) {
        throw new error_1.MyError("Error creating incident", 500);
    }
    res.status(200).json({ success: true, message: "Case Successfully Reported 🐱" });
}));
// mark incident as resolved
// takes the member id in body and case id in url
incidentRouter.post("/resolve/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    const memberId = req.body.memberId;
    if (!id) {
        throw new error_1.MyError("Missing id", 400);
    }
    //check if the incident has already been resolved
    let incident = await client_1.default.incidents.findUnique({
        where: {
            IncidentId: parseInt(id),
        },
    });
    if (!incident) {
        throw new error_1.MyError("Incident does not exist", 404);
    }
    if (incident.ResolvedAt) {
        res.status(200).json({
            success: true,
            message: "Incident has already been resolved by another member 😸",
        });
    }
    incident = await client_1.default.incidents.update({
        where: {
            IncidentId: parseInt(id),
        },
        data: {
            ResolvedAt: new Date(Date.now()),
            ResolvedById: parseInt(memberId),
        },
    });
    if (!incident) {
        throw new error_1.MyError("Error resolving incident", 500);
    }
    res.status(200).json({ success: true, message: "Incident resolved 🐱" });
}));
// get all pending incidents
incidentRouter.get("/pending", (0, express_async_handler_1.default)(async (req, res) => {
    const incidents = await client_1.default.incidents.findMany({
        where: {
            ResolvedAt: undefined,
        },
    });
    if (!incidents) {
        throw new error_1.MyError("No incidents found", 404);
    }
    res.status(200).json({ success: true, data: incidents });
}));
incidentRouter.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    const incidents = await client_1.default.incidents.findMany();
    if (!incidents) {
        throw new error_1.MyError("No incidents found", 404);
    }
    res.status(200).json({ success: true, data: incidents });
}));
//gets all unresolved cases from the given time (in days) from/1 means from the last 24 hours
incidentRouter.get("/from/:from", (0, express_async_handler_1.default)(async (req, res) => {
    const from = req.params.from;
    const incidents = await client_1.default.incidents.findMany({
        where: {
            ResolvedAt: undefined,
            CreatedAt: {
                gte: new Date(Date.now() - parseInt(from) * 24 * 60 * 60 * 1000),
            },
        },
    });
    if (!incidents) {
        throw new error_1.MyError("No incidents found", 404);
    }
    res.status(200).json({ success: true, data: incidents });
}));
incidentRouter.delete("/delete/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const incident_details = parseInt(req.params.id);
    if (!incident_details) {
        throw new error_1.MyError("Id is required", 400);
    }
    const incidents = await client_1.default.incidents.delete({
        where: {
            IncidentId: incident_details,
        },
    });
    if (!incidents) {
        throw new error_1.MyError("Error deleting incident 😞", 500);
    }
    res.status(200).json({ message: "Incident deleted successfully 👍💯" });
}));
exports.default = incidentRouter;
