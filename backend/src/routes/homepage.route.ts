import express, {Request, Response, Router} from "express";
import ash from "express-async-handler";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";
import {AWSLAdminLogin, tokenPayload} from "../interfaces/adminAuth";
import {MyError} from "../interfaces/error";
import {generateToken} from "../functions/jwt";
import { profile } from "console";

dotenv.config();

const homepageRouter = express.Router();

//homepage get all use cases
homepageRouter.get(
	"/",
	ash(async (req, res) => {
		const catalog: any[] = (await prisma.cATalogue.findMany())?.slice(0, 2);
		const doctors: any[] = (await prisma.doctors.findMany())?.slice(0, 2);
		const incidents: any[] = (
			await prisma.incidents.findMany({
				where: {
					ResolvedAt: undefined,
				},
			})
		)?.slice(0, 2);

		const profiles: any[] = (
			await prisma.adoptionProfiles.findMany({
				include: {
					AdoptionPictures: true,
				},
			})
		)?.slice(0, 2);

		if (!catalog || !doctors || !incidents || !profiles) {
			throw new MyError("Error getting data at homepage", 500);
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

		res.status(200).json({success: true, data: ret});
	})
);

export default homepageRouter;
