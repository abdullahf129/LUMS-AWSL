import { format, createLogger, transports } from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, json } = format;

const fileRotateTransport = new transports.DailyRotateFile({
	filename: "logs/error-%DATE%.log",
	datePattern: "YYYY-MM-DD-HH",
	maxFiles: "10d",
});

//add all error logs to the file /logs/error.log
const logger = createLogger({
	level: "info",
	format: combine(timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }), json()),
	transports: [fileRotateTransport],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new transports.Console({
			format: combine(timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }), json()),
		})
	);
}

export { logger };