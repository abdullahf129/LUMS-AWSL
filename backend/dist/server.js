"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./functions/errorHandler");
const adminDashboard_route_1 = __importDefault(require("./routes/adminDashboard.route"));
const awslMembers_route_1 = __importDefault(require("./routes/awslMembers.route"));
const adoption_route_1 = __importDefault(require("./routes/adoption.route"));
const doctors_route_1 = __importDefault(require("./routes/doctors.route"));
const CATalogue_route_1 = __importDefault(require("./routes/CATalogue.route"));
const incident_route_1 = __importDefault(require("./routes/incident.route"));
const location_route_1 = __importDefault(require("./routes/location.route"));
const awslDepartments_route_1 = __importDefault(require("./routes/awslDepartments.route"));
const homepage_route_1 = __importDefault(require("./routes/homepage.route"));
//Load environment variables
dotenv_1.default.config();
//Initialize express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "dist")));
//Routers
//all files can be accessed by <URL>/uploads/<filename>
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../public/uploads")));
app.use("/api/admin", adminDashboard_route_1.default);
app.use("/api/members", awslMembers_route_1.default);
app.use("/api/adoptions", adoption_route_1.default);
app.use("/api/doctors", doctors_route_1.default);
app.use("/api/CATalogue", CATalogue_route_1.default);
app.use("/api/incidents", incident_route_1.default);
app.use("/api/locations", location_route_1.default);
app.use("/api/departments", awslDepartments_route_1.default);
app.use("/api/homepage", homepage_route_1.default);
//serves the frontend
app.get("/*", function (req, res) {
    res.sendFile(path_1.default.join(path_1.default.resolve(), "dist", "index.html"));
});
app.use(errorHandler_1.errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`[server] ⚡️ Server is running on port ${process.env.PORT}`);
});
