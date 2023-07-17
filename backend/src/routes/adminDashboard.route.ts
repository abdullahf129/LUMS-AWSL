import express, {Request, Response, Router} from "express";
import ash from "express-async-handler";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";
import {AWSLAdminLogin, tokenPayload} from "../interfaces/adminAuth";
import {MyError} from "../interfaces/error";
import {generateToken} from "../functions/jwt";

dotenv.config();

const adminDashboardRouter = express.Router();

//login admin
adminDashboardRouter.post(
	"/login",
	ash(async (req: Request, res: Response) => {
		const creds: AWSLAdminLogin = req.body;

		if (!creds.email || !creds.password) {
			throw new MyError("Email and password are required", 400);
		}

		const user = await prisma.aWSLAdmins.findFirstOrThrow({
			where: {
				Email: creds.email,
			},
		});

		const valid = await bcrypt.compare(creds.password, user.Password);

		if (!user) {
			throw new MyError("User not found", 404);
		} else if (!valid) {
			throw new MyError("Incorrect password", 400);
		} else {
			//user verified
			const payload: tokenPayload = {
				email: user.Email,
				id: user.AWSLAdminId,
				role: "admin",
			};

			const token = generateToken(payload);

			res.cookie("access_token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
			})
				.status(200)
				.json({message: "Logged in successfully 😊 👌", id: user.AWSLAdminId});
		}
	})
);

//logout admin
adminDashboardRouter.post(
	"/logout",
	ash(async (req, res) => {
		res.clearCookie("access_token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		})
			.status(200)
			.json({message: "Logged out successfully 😊 👌 "});
	})
);

adminDashboardRouter.get(
	"/analysis",
	ash(async (req, res) => {
		const activeCases = await prisma.incidents.count({
			where: {
				ResolvedAt: undefined,
			},
		});

		const resolvedCases = await prisma.incidents.count({
			where: {
				ResolvedAt: {
					not: undefined,
				},
			},
		});

		const totalMembers = await prisma.aWSLMembers.count();
		const totalDoctors = await prisma.doctors.count();
		const totalCats = await prisma.cATalogue.count();

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
	})
);

export default adminDashboardRouter;
