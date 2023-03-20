import   { createLogger, format, transports } from "winston";

const { combine, timestamp, label,printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const APPNAME = "Stat APP";
const logConfiguration = {
    format: combine(label({ label: APPNAME }), timestamp(), customFormat),
    'transports': [
        new transports.Console({
            level:"debug",
            colorize:true
        }),
        new transports.File({
            filename: 'logs/access.log'
        }),
        new transports.File({
            level:"error",
            filename: 'logs/error.log'
        })
    ]
};

const logger = createLogger(logConfiguration);
export default logger;