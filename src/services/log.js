const log4js = require("log4js")

log4js.configure({
    appenders: { express: { type: "file", filename: "./src/logs/express.log" } },
    categories: { default: { appenders: ["express"], level: "error" } },
    levels: {
        express: {
            type: "logLevelFilter",
            appender: "express",
            level: "error",
            colour: "red",
            value: 1
        }
    }
});

const logger = log4js.getLogger("express");

module.exports = logger;