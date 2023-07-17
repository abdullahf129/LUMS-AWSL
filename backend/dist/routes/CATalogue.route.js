"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const error_1 = require("../interfaces/error");
const client_1 = __importDefault(require("../prisma/client"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const CATalogRouter = express_1.default.Router();
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
// get all catalog entries
CATalogRouter.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    const allEntries = await client_1.default.cATalogue.findMany();
    if (!allEntries) {
        throw new error_1.MyError("Error getting entries", 500);
    }
    res.status(200).json({ success: true, data: allEntries });
}));
// get catalog entry by id
CATalogRouter.get("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    const entry = await client_1.default.cATalogue.findUnique({
        where: {
            CATalogueId: parseInt(id),
        },
    });
    if (!entry) {
        throw new error_1.MyError("Cat does not exist 😿", 404);
    }
    res.status(200).json({ success: true, data: entry });
}));
//create catalog entry
CATalogRouter.post("/create", upload.single("CATalogueimg"), (0, express_async_handler_1.default)(async (req, res) => {
    const details = req.body;
    const file = req.file;
    console.log(req.body);
    const filename = file.filename;
    if (!details.name ||
        !details.sex ||
        !details.age ||
        !details.longDescription ||
        !details.shortDescription) {
        throw new error_1.MyError("One or more than one attributes are missing", 400);
    }
    const newEntry = await client_1.default.cATalogue.create({
        data: {
            Name: details.name,
            Age: parseInt(details.age),
            Sex: details.sex,
            LongDescription: details.longDescription,
            ShortDescription: details.shortDescription,
            Image: filename,
        },
    });
    if (!newEntry) {
        throw new error_1.MyError("Error creating entry", 500);
    }
    res.status(200).json({ success: true, message: "New cat added 😸" });
}));
//update catalog entry //TODO
CATalogRouter.put("/update/:id", (0, express_async_handler_1.default)(async (req, res) => {
    res.status(400).json({ message: "Not implemented yet" });
}));
//delete catalog entry
CATalogRouter.delete("/delete/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    const deletedEntry = await client_1.default.cATalogue.delete({
        where: {
            CATalogueId: parseInt(id),
        },
    });
    if (!deletedEntry) {
        throw new error_1.MyError("Error deleting entry", 500);
    }
    res.status(200).json({ success: true, message: "Cat deleted 😿" });
}));
exports.default = CATalogRouter;
