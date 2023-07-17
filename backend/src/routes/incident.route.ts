import express from "express";
import ash from "express-async-handler";
import { MyError } from "../interfaces/error";
import prisma from "../prisma/client";
import { createIncident } from "../interfaces/incidents";
import multer from "multer";
import path from "path";
import { generateToken, verifyReportToken } from "../functions/jwt";
import { sendEmail, sendCaseEmail } from "../functions/sendEmail";
import dotenv from "dotenv";

dotenv.config();

const incidentRouter = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../../public/uploads"));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() +
			"-" +
			Math.round(Math.random() * 1e9) +
			path.extname(file.originalname);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

const upload = multer({ storage: storage });

//send a token to user email to report an incident
incidentRouter.post(
	"/validate",
	ash(async (req, res) => {
		const email = req.body.email;
		const token = generateToken({ email });

		if (!email) {
			throw new MyError("Email is required 😿", 400);
		}

		const sent = await sendEmail(
			req.body.email,
			"Report an incident",
			`${process.env.FRONTEND_URL}/user/add-report?token=${token}`
		);

		if (!sent) {
			throw new MyError("Error sending email", 500);
		}

		res
			.status(200)
			.json({
				success: true,
				message: `Email sent at ${email}, please verify to continue.`,
			});
	})
);

incidentRouter.post(
	"/create",
	verifyReportToken,
	upload.single("incidentImg"),
	ash(async (req: any, res) => {

		const details: createIncident = req.body;
		const email = req.email;
		
		const file = req.file;
		
		if (
			!details.title ||
			!details.locationDescription ||
			!details.description ||
			!details.location
		) {
			throw new MyError("Missing details", 400);
		}

		const incident = await prisma.incidents.create({
			data: {
				Title: details.title,
				LocationDescription: details.locationDescription,
				Description: details.description,
				LocationId: parseInt(details.location as unknown as string),
				Image: file?.filename,
				Email: email,
			},
		});

		//get location name
		const location = await prisma.locations.findUnique({
			where: {
				LocationId: parseInt(details.location as unknown as string),
			},
		});

		//send an email to all AWSL member who are a part of the daily care department, id = 1
		const members = await prisma.aWSLMembers.findMany({
			where: {
				DepartmentId: 1,
			},
		});

		const emails = members.map((member) => member.Email);


		//loop over emails 
		for (const member of emails) {

			const sent = await sendCaseEmail(
				member,
				"New Incident Reported",
				email,
				location?.Name || "Unknown",
				details.locationDescription,
				details.description,
			);

			if (!sent) {
				throw new MyError("Error sending email", 500);
			}
		}

		if (!incident) {
			throw new MyError("Error creating incident", 500);
		}

		res.status(200).json({ success: true, message: "Case Successfully Reported 🐱" });
	})
);

// mark incident as resolved
// takes the member id in body and case id in url
incidentRouter.post(
	"/resolve/:id",
	ash(async (req, res) => {
		const id = req.params.id;
		const memberId = req.body.memberId;

		if (!id) {
			throw new MyError("Missing id", 400);
		}

		//check if the incident has already been resolved
		let incident = await prisma.incidents.findUnique({
			where: {
				IncidentId: parseInt(id),
			},
		});

		if (!incident) {
			throw new MyError("Incident does not exist", 404);
		}

		if (incident.ResolvedAt) {
			res.status(200).json({
				success: true,
				message: "Incident has already been resolved by another member 😸",
			});
		}

		incident = await prisma.incidents.update({
			where: {
				IncidentId: parseInt(id),
			},
			data: {
				ResolvedAt: new Date(Date.now()),
				ResolvedById: parseInt(memberId),
			},
		});

		if (!incident) {
			throw new MyError("Error resolving incident", 500);
		}

		res.status(200).json({ success: true, message: "Incident resolved 🐱" });
	})
);

// get all pending incidents
incidentRouter.get(
	"/pending",
	ash(async (req, res) => {
		const incidents = await prisma.incidents.findMany({
			where: {
				ResolvedAt: undefined,
			},
		});

		if (!incidents) {
			throw new MyError("No incidents found", 404);
		}

		res.status(200).json({ success: true, data: incidents });
	})
);

incidentRouter.get(
	"/",
	ash(async (req, res) => {
		const incidents = await prisma.incidents.findMany();

		if (!incidents) {
			throw new MyError("No incidents found", 404);
		}

		res.status(200).json({ success: true, data: incidents });
	})
);

//gets all unresolved cases from the given time (in days) from/1 means from the last 24 hours
incidentRouter.get(
	"/from/:from",
	ash(async (req, res) => {
		const from = req.params.from;

		const incidents = await prisma.incidents.findMany({
			where: {
				ResolvedAt: undefined,
				CreatedAt: {
					gte: new Date(Date.now() - parseInt(from) * 24 * 60 * 60 * 1000),
				},
			},
		});

		if (!incidents) {
			throw new MyError("No incidents found", 404);
		}

		res.status(200).json({ success: true, data: incidents });
	})
);

incidentRouter.delete(
	"/delete/:id",
	ash(async (req, res) => {
		const incident_details: number = parseInt(req.params.id);

		if (!incident_details) {
			throw new MyError("Id is required", 400);
		}

		const incidents = await prisma.incidents.delete({
			where: {
				IncidentId: incident_details,
			},
		});

		if (!incidents) {
			throw new MyError("Error deleting incident 😞", 500);
		}

		res.status(200).json({ message: "Incident deleted successfully 👍💯" });
	})
);

export default incidentRouter;
