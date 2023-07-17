import express, { Request, Response } from "express";
import ash from "express-async-handler";
import prisma from "../prisma/client";
import uniqueString from "unique-string";
import { MyError } from "../interfaces/error";
import {
	createMember,
	updateMember,
	loginMember
} from "../interfaces/awslMember";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sendOnboardingEmail } from "../functions/sendEmail";
import {generateToken} from "../functions/jwt";


dotenv.config();

const awslMemberRouter = express.Router();

awslMemberRouter.post(
	"/login",
	ash(async (req: Request, res: Response) => {
		const creds: loginMember = req.body;

		console.log(creds);
		

		if (!creds.email || !creds.password) {
			throw new MyError("Email and password are required", 400);
		}
		
		const user = await prisma.aWSLMembers.findFirstOrThrow({
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
			const payload = {
				email: user.Email,
				id: user.AWSLMemberId,
				role: "member",
			};

			const token = generateToken(payload);

			res.cookie("access_token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
			})
				.status(200)
				.json({message: "Logged in successfully 😊 👌", id: user.AWSLMemberId});
		}
	})
);


//get all members
awslMemberRouter.get(
	"/",
	ash(async (req: Request, res: Response) => {
		const members = await prisma.aWSLMembers.findMany({
			include: {
				Department: true,
			},
		});

		if (!members) {
			throw new MyError("Error fetching members 😞", 500);
		}

		res.status(200).json(members);
	})
);

//get member by ID
awslMemberRouter.get(
	"/:id",
	ash(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);

		const member = await prisma.aWSLMembers.findUnique({
			where: {
				AWSLMemberId: id,
			},
			include: {
				Department: true,
			},
		});

		if (!member) {
			throw new MyError("Member not found", 404);
		}

		res.status(200).json(member);
	})
);

//create a new member
awslMemberRouter.post(
	"/create",
	ash(async (req: Request, res: Response) => {
		const member_details: createMember = req.body;

		if (
			!member_details.name ||
			!member_details.email ||
			!member_details.departmentId
		) {
			throw new MyError("Email and department are required", 400);
		}

		//only first six characters
		const pwd = (uniqueString()).slice(0, 6);

		const hash = await bcrypt.hash(pwd, parseInt(process.env.SALT_ROUNDS as string) || 3);
		

		const member = await prisma.aWSLMembers.create({
			data: {
				Name: member_details.name,
				Email: member_details.email,
				Password: hash,
				DepartmentId: member_details.departmentId,
			},
		});

		const email = await sendOnboardingEmail(
			member_details.email,
			"Member Onboarding",
			member_details.name,
			member_details.email,
			pwd,
			`${process.env.FRONTEND_URL}/awsl-member/login`
		);

		if (!member) {
			throw new MyError("Error creating new member 😞", 500);
		}

		res
			.status(200)
			.json({ message: "Member created successfully 👍💯", pwd: pwd });
	})
);

//delete an existing member
awslMemberRouter.delete(
	"/delete/:id",
	ash(async (req: Request, res: Response) => {
		const member_details: number = parseInt(req.params.id);

		if (!member_details) {
			throw new MyError("Id is required", 400);
		}

		const member = await prisma.aWSLMembers.delete({
			where: {
				AWSLMemberId: member_details,
			},
		});

		if (!member) {
			throw new MyError("Error deleting member 😞", 500);
		}

		res.status(200).json({ message: "Member deleted successfully 👍💯" });
	})
);

//update an existing member
awslMemberRouter.put(
	"/update",
	ash(async (req: Request, res: Response) => {
		const member_details: updateMember = req.body;

		if (
			!member_details.name ||
			!member_details.id ||
			!member_details.email ||
			!member_details.departmentId
		) {
			throw new MyError("Id, email and department are required", 400);
		}

		const member = await prisma.aWSLMembers.update({
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
			throw new MyError("Error updating member 😞", 500);
		}

		res.status(200).json({ message: "Member updated successfully 👍💯" });
	})
);

export default awslMemberRouter;
