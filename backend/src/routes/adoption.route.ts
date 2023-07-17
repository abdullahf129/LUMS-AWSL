import express from "express";
import ash from "express-async-handler";
import prisma from "../prisma/client";
import multer from "multer";
import { MyError } from "../interfaces/error";
import { createProfile, adoptionApplication } from "../interfaces/adoption";
import path from "path";

//store the file into "uploads" folder at the root of the project, accessible by the frontend, preserve extenstions

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
const adoptionRouter = express.Router();

//get all adoption profiles
adoptionRouter.get(
	"/",
	ash(async (req, res) => {
		const profiles = await prisma.adoptionProfiles.findMany({
			include: {
				AdoptionPictures: true,
			},
		});

		if (!profiles) {
			throw new MyError("Error fetching profiles 😞", 500);
		}

		res.status(200).json(profiles);
	})
);

//create a new adoption profile
adoptionRouter.post(
	"/create",
	upload.array("adoptionimgs", 4),
	ash(async (req, res) => {
		const details: createProfile = req.body;

		if (
			!details.age ||
			!details.location ||
			!details.name ||
			!details.shortDescription ||
			!details.type ||
			!details.longDescription
		) {
			throw new MyError("All fields are required", 400);
		}

		const files = req.files as Express.Multer.File[];

		if (!files) {
			throw new MyError("No files uploaded", 400);
		}

		const profileAndPictures = await prisma.adoptionProfiles.create({
			data: {
				Name: details.name,
				Type: details.type,
				Age: parseInt(details.age as unknown as string),
				Location: details.location,
				ShortDescription: details.shortDescription,
				LongDescription: details.longDescription,
				AdoptionPictures: {
					create: files.map((file) => {
						return {
							PhotoName: file.filename,
						};
					}),
				},
			},
		});

		if (!profileAndPictures) {
			throw new MyError("Error creating profile 😿", 500);
		}

		res.status(200).json({ message: "Profile Successfully created 🐱🐾" });
	})
);

//update an adoption profile
adoptionRouter.put(
	"update",
	ash(async (req, res) => {})
);

//delete an adoption profile
adoptionRouter.delete(
	"/delete/:id",
	ash(async (req, res) => {
		const id: number = parseInt(req.params.id);

		const profile = await prisma.adoptionProfiles.findUnique({
			where: {
				AdoptionProfileId: id,
			},
		});

		if (!profile) {
			throw new MyError("Profile not found", 404);
		}

		const deletedProfile = await prisma.adoptionProfiles.delete({
			where: {
				AdoptionProfileId: id,
			},
		});

		if (!deletedProfile) {
			throw new MyError("Error deleting profile 😿", 500);
		}

		res.status(200).json({ message: "Profile Successfully deleted 🐱🐾" });
	})
);

adoptionRouter.post(
	"/applications/apply",
	ash(async (req, res) => {
		const details: adoptionApplication = req.body;

		if (
			!details.profileId ||
			!details.name ||
			!details.address ||
			!details.contact
		) {
			throw new MyError("All fields are required", 400);
		}

		const application = await prisma.adoptionApplications.create({
			data: {
				Name: details.name,
				Address: details.address,
				Contact: details.contact,
				AdoptionProfileId: details.profileId,
			},
		});

		if (!application) {
			throw new MyError("Error creating application 😿", 500);
		}

		res
			.status(200)
			.json({ message: "Application Successfully submitted! 🐱🐾" });
	})
);

//get all pending applications
adoptionRouter.get(
	"/applications/",
	ash(async (req, res) => {
		const applications = await prisma.adoptionApplications.findMany({
			where: {
				Approved: false,
			},
			include: {
				AdoptionProfile: {
					include: {
						AdoptionPictures: true,
					},
				},
			},
		});

		if (!applications) {
			throw new MyError("Error fetching applications 😞", 500);
		}

		res.status(200).json({ success: true, applications });
	})
);

// delete an application
adoptionRouter.delete(
	"/applications/delete/:id",
	ash(async (req, res) => {
		const id: number = parseInt(req.params.id);

		const application = await prisma.adoptionApplications.findUnique({
			where: {
				AdoptionApplicationId: id,
			},
		});

		if (!application) {
			throw new MyError("Application not found", 404);
		}

		const deletedApplication = await prisma.adoptionApplications.delete({
			where: {
				AdoptionApplicationId: id,
			},
		});

		if (!deletedApplication) {
			throw new MyError("Error deleting application 😿", 500);
		}

		res
			.status(200)
			.json({ message: "Application Successfully deleted 🐱🐾" });
	})
);


// 	res.status(200).json(applications);
// }));

//get all approved applications

//get all rejected applications

//approve an application

//reject an application

export default adoptionRouter;
