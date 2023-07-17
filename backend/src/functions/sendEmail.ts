import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";

dotenv.config();

const sesClient = new SESClient({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
	},
});

export const sendEmail = async (
	email: string,
	subject: string,
	link: string
) => {
	const html = await ejs.renderFile(
		path.join(__dirname, "../../templates/magic-template.ejs"),
		{
			confirm_link: link,
		}
	);

	const params = {
		Source: "lumsaws@gmail.com",
		Destination: {
			ToAddresses: [email],
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: html,
				},
				Text: {
					Data: `Hey there! Please click on this link to report the case: ${link}`,
				},
			},
			Subject: {
				Data: subject,
			},
		},
	};

	return sesClient.send(new SendEmailCommand(params));
};

export const sendOnboardingEmail = async (
	email: string,
	subject: string,
	name: string,
	username: string,
	password: string,
	link: string
) => {
	const html = await ejs.renderFile(
		path.join(__dirname, "../../templates/member-email.ejs"),
		{
			confirm_link: link,
			name: name,
			username: username,
			password: password,
		}
	);

	const params = {
		Source: "lumsaws@gmail.com",
		Destination: {
			ToAddresses: [email],
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: html,
				},
				Text: {
					Data: `Hey there! Welcome to AWSL. Please click on this link to confirm your email: ${link}. Here are your credentials: Username: ${username}, Password: ${password}`,
				},
			},
			Subject: {
				Data: subject,
			},
		},
	};

	return sesClient.send(new SendEmailCommand(params));
};

export const sendCaseEmail = async (
		email: string,
		subject: string,
		reporterEmail: string,
		location: string,
		locationDescription: string, 
		caseDescription: string,
	) => {
		const html = await ejs.renderFile(
			path.join(__dirname, "../../templates/case-update-member.ejs"),
			{
				reporterEmail,
				location,
				locationDescription,
				caseDescription,
			}
		);
	
		const params = {
			Source: "lumsaws@gmail.com",
			Destination: {
				ToAddresses: [email],
			},
			Message: {
				Body: {
					Html: {
						Charset: "UTF-8",
						Data: html,
					},
					Text: {
						Data: `Hey there! Welcome to AWSL. A new case has been reported. Here are the details,
						Reporter Email: ${reporterEmail},
						Location: ${location},
						Location Description: ${locationDescription},
						Case Description: ${caseDescription}
						`,
					},
				},
				Subject: {
					Data: subject,
				},
			},
		};
	
		return sesClient.send(new SendEmailCommand(params));
	};	
