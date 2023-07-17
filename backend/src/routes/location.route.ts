import express from "express";
import ash from "express-async-handler";
import { MyError } from "../interfaces/error";
import prisma from "../prisma/client";

const locationRouter = express.Router();

// get all locations

locationRouter.get(
    "/",
    ash(async (req, res) => {
        const allLocations = await prisma.locations.findMany();
        
        if (!allLocations) {
            throw new MyError("Error getting locations", 500);
        }

        res.status(200).json({ success: true, data: allLocations });
    }
    )
);

//create a location
locationRouter.post(
    "/create",
    ash(async (req, res) => {
        const details = req.body;

        if (!details.name) {
            throw new MyError("Missing details", 400);
        }

        const location = await prisma.locations.create({
            data: {
                Name: details.name,
            },
        });

        if (!location) {
            throw new MyError("Error creating location", 500);
        }

        res.status(200).json({ success: true, data: location });
    }
    )
);

//delete a location
locationRouter.delete(
    "/delete/:id",
    ash(async (req, res) => {
        const id = req.params.id;
        
        const location = await prisma.locations.delete({
            where: {
                LocationId: parseInt(id),
            },
        });

        if (!location) {
            throw new MyError("Error deleting location", 500);
        }

        res.status(200).json({ success: true, message: "Location deleted"});
    }
    )
);

export default locationRouter;


