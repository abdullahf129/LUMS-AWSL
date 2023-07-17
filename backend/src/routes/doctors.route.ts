import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import prisma from "../prisma/client";
import { doctorsInfo } from "../interfaces/doctors";
import { MyError } from "../interfaces/error";

dotenv.config();

const doctorsRouter = express.Router();

doctorsRouter.get(
	"/",
	asyncHandler(async (req: Request, res: Response) => {
		const all_doctors = await prisma.doctors.findMany();

		if (!all_doctors) {
			throw new MyError("No doctors in the database 😞", 500);
		} else {
			res.status(200).json(all_doctors);
		}
	})
);

doctorsRouter.post(
	"/create",
	asyncHandler(async (req: Request, res: Response) => {
		const creds: doctorsInfo = req.body;

		if (!creds.Name || !creds.Address || !creds.Contact || !creds.Type) {
			throw new MyError("One or more than one attributes are missing", 400);
		}

		// const doctor = await prisma.doctors.findFirstOrThrow({
		// 	where: {
		// 		Name: creds.Name,
		// 	},
		// });

		// if (doctor) {
		// 	throw new MyError("Doctor with this name already exists", 404);
		// } else {
			const newEntry = await prisma.doctors.create({
				data: {
					Name: creds.Name,
					Address: creds.Address,
					Contact: creds.Contact,
					Type: creds.Type,
				},
			});

			if (!newEntry) {
				throw new MyError("Error adding doctor 😞", 500);
			}

			res.status(200).json({ message: "Doctor added successfully 😊 👌" });
		// }
	})
);

doctorsRouter.delete(
	"/:id",
	asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);

		if (!id) {
			throw new MyError("Doctor not found", 404);
		} else {
			const deletedEntry = await prisma.doctors.delete({
				where: {
					DoctorId: id,
				},
			});

			if (!deletedEntry) {
				throw new MyError("Error deleting doctor 😞", 500);
			}

			res.status(200).json({ message: "Doctor deleted successfully 😊 👌" });
		}
	})
);

export default doctorsRouter;
