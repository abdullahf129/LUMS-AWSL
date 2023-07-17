import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { errorHandler } from "./functions/errorHandler";
import adminDashboardRouter from "./routes/adminDashboard.route";
import awslMemberRouter from "./routes/awslMembers.route";
import adoptionRouter from "./routes/adoption.route";
import doctorRouter from "./routes/doctors.route";
import CATalogueRouter from "./routes/CATalogue.route";
import incidentRouter from "./routes/incident.route";
import locationRouter from "./routes/location.route";
import departmentRouter from "./routes/awslDepartments.route";
import homepageRouter from "./routes/homepage.route";
import { sendEmail } from "./functions/sendEmail";

//Load environment variables
dotenv.config();

//Initialize express app
const app: Express = express();

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(path.resolve(), "dist")));

//Routers
//all files can be accessed by <URL>/uploads/<filename>
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use("/api/admin", adminDashboardRouter);
app.use("/api/members", awslMemberRouter);
app.use("/api/adoptions", adoptionRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/CATalogue", CATalogueRouter);
app.use("/api/incidents", incidentRouter);
app.use("/api/locations", locationRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/homepage", homepageRouter);


//serves the frontend
app.get("/*", function (req, res) {
	res.sendFile(path.join(path.resolve(), "dist", "index.html"));
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(`[server] ⚡️ Server is running on port ${process.env.PORT}`);
});
