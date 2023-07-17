import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { MyError } from "../interfaces/error";
import ash from "express-async-handler";
import { tokenPayload } from "../interfaces/adminAuth";

dotenv.config();

export const generateToken = (payload: any) => {
	return jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: "1h",
	});
};

export const checkAdminAuthenticated = ash(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies.access_token;

		if (!token) {
			throw new MyError("Unauthorized", 401);
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

		const { role } = decoded as tokenPayload;

		if (!decoded || role !== "admin") {
			throw new MyError("Unauthorized", 401);
		} else {
			req.body.user = decoded;
			next();
		}
	}
);

export const verifyReportToken = ash(
	async (req: any, res: Response, next: NextFunction) => {

		const token = req.headers?.authorization?.split(" ")[1];		

		if (!token) {
			throw new MyError("Unauthorized", 401);
		}

		const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

		if (!decoded) {
			throw new MyError("Unauthorized", 401);
		} else {
			req.email = decoded.email;
			next();
		}
	}
);
