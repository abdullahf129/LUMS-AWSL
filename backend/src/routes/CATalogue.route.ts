import express from "express";
import ash from "express-async-handler";
import { createCATalog } from "../interfaces/CATalog";
import { MyError } from "../interfaces/error";
import prisma from "../prisma/client";
import multer, { Multer } from "multer";
import path from "path";

const CATalogRouter = express.Router();

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

// get all catalog entries
CATalogRouter.get(
	"/",
	ash(async (req, res) => {
		const allEntries = await prisma.cATalogue.findMany();

		if (!allEntries) {
			throw new MyError("Error getting entries", 500);
		}

		res.status(200).json({ success: true, data: allEntries });
	})
);

// get catalog entry by id
CATalogRouter.get(
	"/:id",
	ash(async (req, res) => {
		const id = req.params.id;

		const entry = await prisma.cATalogue.findUnique({
			where: {
				CATalogueId: parseInt(id),
			},
		});

		if (!entry) {
			throw new MyError("Cat does not exist 😿", 404);
		}

		res.status(200).json({ success: true, data: entry });
	})
);

//create catalog entry
CATalogRouter.post(
	"/create",
	upload.single("CATalogueimg"),
	ash(async (req, res) => {
		const details: createCATalog = req.body;

		const file = req.file as Express.Multer.File;

		console.log(req.body);

		const filename = file.filename;

		if (
			!details.name ||
			!details.sex ||
			!details.age ||
			!details.longDescription ||
			!details.shortDescription
		) {
			throw new MyError("One or more than one attributes are missing", 400);
		}

		const newEntry = await prisma.cATalogue.create({
			data: {
				Name: details.name,
				Age: parseInt(details.age as unknown as string),
				Sex: details.sex,
				LongDescription: details.longDescription,
				ShortDescription: details.shortDescription,
				Image: filename,
			},
		});

		if (!newEntry) {
			throw new MyError("Error creating entry", 500);
		}

		res.status(200).json({ success: true, message: "New cat added 😸" });
	})
);

//update catalog entry //TODO
CATalogRouter.put(
	"/update/:id",
	ash(async (req, res) => {
		res.status(400).json({ message: "Not implemented yet" });
	})
);

//delete catalog entry
CATalogRouter.delete(
	"/delete/:id",
	ash(async (req, res) => {
		const id = req.params.id;

		const deletedEntry = await prisma.cATalogue.delete({
			where: {
				CATalogueId: parseInt(id),
			},
		});

		if (!deletedEntry) {
			throw new MyError("Error deleting entry", 500);
		}

		res.status(200).json({ success: true, message: "Cat deleted 😿" });
	})
);

export default CATalogRouter;
