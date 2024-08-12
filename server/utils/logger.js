const { format, transports, createLogger } = require("winston");
const { prettyPrint, combine, timestamp } = format;

const logger = createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [new transports.Console()],
});

module.exports = logger;