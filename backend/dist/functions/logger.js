"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json } = winston_1.format;
const fileRotateTransport = new winston_1.transports.DailyRotateFile({
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
    maxFiles: "10d",
});
//add all error logs to the file /logs/error.log
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }), json()),
    transports: [fileRotateTransport],
});
exports.logger = logger;
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.transports.Console({
        format: combine(timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }), json()),
    }));
}
