"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCaseEmail = exports.sendOnboardingEmail = exports.sendEmail = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const sesClient = new client_ses_1.SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const sendEmail = async (email, subject, link) => {
    const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../../templates/magic-template.ejs"), {
        confirm_link: link,
    });
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
    return sesClient.send(new client_ses_1.SendEmailCommand(params));
};
exports.sendEmail = sendEmail;
const sendOnboardingEmail = async (email, subject, name, username, password, link) => {
    const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../../templates/member-email.ejs"), {
        confirm_link: link,
        name: name,
        username: username,
        password: password,
    });
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
    return sesClient.send(new client_ses_1.SendEmailCommand(params));
};
exports.sendOnboardingEmail = sendOnboardingEmail;
const sendCaseEmail = async (email, subject, reporterEmail, location, locationDescription, caseDescription) => {
    const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../../templates/case-update-member.ejs"), {
        reporterEmail,
        location,
        locationDescription,
        caseDescription,
    });
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
    return sesClient.send(new client_ses_1.SendEmailCommand(params));
};
exports.sendCaseEmail = sendCaseEmail;
