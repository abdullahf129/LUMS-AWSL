"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = __importDefault(require("../prisma/client"));
const multer_1 = __importDefault(require("multer"));
const error_1 = require("../interfaces/error");
const path_1 = __importDefault(require("path"));
//store the file into "uploads" folder at the root of the project, accessible by the frontend, preserve extenstions
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../../public/uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const adoptionRouter = express_1.default.Router();
//get all adoption profiles
adoptionRouter.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    const profiles = await client_1.default.adoptionProfiles.findMany({
        include: {
            AdoptionPictures: true,
        },
    });
    if (!profiles) {
        throw new error_1.MyError("Error fetching profiles 😞", 500);
    }
    res.status(200).json(profiles);
}));
//create a new adoption profile
adoptionRouter.post("/create", upload.array("adoptionimgs", 4), (0, express_async_handler_1.default)(async (req, res) => {
    const details = req.body;
    if (!details.age ||
        !details.location ||
        !details.name ||
        !details.shortDescription ||
        !details.type ||
        !details.longDescription) {
        throw new error_1.MyError("All fields are required", 400);
    }
    const files = req.files;
    if (!files) {
        throw new error_1.MyError("No files uploaded", 400);
    }
    const profileAndPictures = await client_1.default.adoptionProfiles.create({
        data: {
            Name: details.name,
            Type: details.type,
            Age: parseInt(details.age),
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
        throw new error_1.MyError("Error creating profile 😿", 500);
    }
    res.status(200).json({ message: "Profile Successfully created 🐱🐾" });
}));
//update an adoption profile
adoptionRouter.put("update", (0, express_async_handler_1.default)(async (req, res) => { }));
//delete an adoption profile
adoptionRouter.delete("/delete/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id);
    const profile = await client_1.default.adoptionProfiles.findUnique({
        where: {
            AdoptionProfileId: id,
        },
    });
    if (!profile) {
        throw new error_1.MyError("Profile not found", 404);
    }
    const deletedProfile = await client_1.default.adoptionProfiles.delete({
        where: {
            AdoptionProfileId: id,
        },
    });
    if (!deletedProfile) {
        throw new error_1.MyError("Error deleting profile 😿", 500);
    }
    res.status(200).json({ message: "Profile Successfully deleted 🐱🐾" });
}));
adoptionRouter.post("/applications/apply", (0, express_async_handler_1.default)(async (req, res) => {
    const details = req.body;
    if (!details.profileId ||
        !details.name ||
        !details.address ||
        !details.contact) {
        throw new error_1.MyError("All fields are required", 400);
    }
    const application = await client_1.default.adoptionApplications.create({
        data: {
            Name: details.name,
            Address: details.address,
            Contact: details.contact,
            AdoptionProfileId: details.profileId,
        },
    });
    if (!application) {
        throw new error_1.MyError("Error creating application 😿", 500);
    }
    res
        .status(200)
        .json({ message: "Application Successfully submitted! 🐱🐾" });
}));
//get all pending applications
adoptionRouter.get("/applications/", (0, express_async_handler_1.default)(async (req, res) => {
    const applications = await client_1.default.adoptionApplications.findMany({
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
        throw new error_1.MyError("Error fetching applications 😞", 500);
    }
    res.status(200).json({ success: true, applications });
}));
// delete an application
adoptionRouter.delete("/applications/delete/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id);
    const application = await client_1.default.adoptionApplications.findUnique({
        where: {
            AdoptionApplicationId: id,
        },
    });
    if (!application) {
        throw new error_1.MyError("Application not found", 404);
    }
    const deletedApplication = await client_1.default.adoptionApplications.delete({
        where: {
            AdoptionApplicationId: id,
        },
    });
    if (!deletedApplication) {
        throw new error_1.MyError("Error deleting application 😿", 500);
    }
    res
        .status(200)
        .json({ message: "Application Successfully deleted 🐱🐾" });
}));
// 	res.status(200).json(applications);
// }));
//get all approved applications
//get all rejected applications
//approve an application
//reject an application
exports.default = adoptionRouter;
