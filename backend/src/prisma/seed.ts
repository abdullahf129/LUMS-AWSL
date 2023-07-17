import prisma from "./client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

(async () => {
	
	const user1 = await prisma.aWSLAdmins.upsert({
		where: { Email: "admin1@admin.com" },
		update: {},
		create: {
			Email: "admin1@admin.com",
			Password: bcrypt.hashSync(
				"admin1",
				parseInt(process.env.SALT_ROUNDS as string) || 3
			),
			Name: "Admin 1",
		},
	});
	const user2 = await prisma.aWSLAdmins.upsert({
		where: { Email: "admin2@admin.com" },
		update: {},
		create: {
			Email: "admin2@admin.com",
			Password: bcrypt.hashSync(
				"admin2",
				parseInt(process.env.SALT_ROUNDS as string) || 3
			),
			Name: "Admin 1",
		},
	});

	const department = await prisma.departments.create({
		data: {
			Name: "Daily Care",
		},
	});

	console.log({ user1, user2 });
})();
