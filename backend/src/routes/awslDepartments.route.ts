import express, { Request, Response } from "express";
import ash from "express-async-handler";
import prisma from "../prisma/client";
import { MyError } from "../interfaces/error";
import { awslDepartment } from "../interfaces/awslDepartment";


const awslDepartmentRouter = express.Router();
//get all departments
awslDepartmentRouter.get(
	"/",
	ash(async (req: Request, res: Response) => {
		const department = await prisma.departments.findMany();

		if (!department) {
			throw new MyError("Error fetching departments 😞", 500);
		}else
          {
               res.status(200).json(department);
          }

		
	})
);

awslDepartmentRouter.get(
	"/:id",
	ash(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);

		const department_val = await prisma.departments.findUnique({
			where: {
				DepartmentId: id,
			}
		});


		if (!department_val) {
			throw new MyError("Department not found", 404);
		}

		res.status(200).json(department_val);
	})
);

awslDepartmentRouter.get(
	"/:id/:members",
	ash(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);

          const members = await prisma.aWSLMembers.findMany({
			where: {
			  DepartmentId: id,
			},
		});
		if (!members) {
			throw new MyError("Members not found", 404);
		}

		res.status(200).json(members);
	})
);

awslDepartmentRouter.post(
	"/new",
	ash(async (req: Request, res: Response) => {
		const creds: awslDepartment = req.body;

		if (!creds.Name ) {
			throw new MyError("Name required", 400);
		}

		const department_details = await prisma.departments.findFirst({
			where: {
				Name: creds.Name,
			},
		});

		if (department_details) {
			throw new MyError("Department with this name already exists", 404);
		} else {
			const new_department = await prisma.departments.create({
				data: {
					Name: creds.Name,
				},
			});

			if (!new_department) {
				throw new MyError("Error adding department 😞", 500);
			}

			res.status(200).json({ message: "department added successfully 😊 👌" });
		}
	})
);

awslDepartmentRouter.delete(
	"/:id",
	ash(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);

		if (!id) {
			throw new MyError("Department not found", 404);
		} 
		else {
			const deletedEntry = await prisma.departments.delete({
				where: {
					DepartmentId: id,
				},
			});

			if (!deletedEntry) {
				throw new MyError("Error deleting department 😞", 500);
			}
			
			res.status(200).json({ message: "Department deleted successfully 😊 👌" });
		}
	})
);

export default awslDepartmentRouter;