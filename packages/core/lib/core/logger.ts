import * as winston from 'winston';

const { createLogger, transports, format } = winston;
const { combine, json } = format;

let logger: winston.Logger;

export const BotKitLogger = {
	getLogger: () => {
		if (!logger) {
			const transportsOpt = [new transports.Console({ format: json() })];
			const formatOpts = combine(
				format.label({ label: '' }),
				format.timestamp(),
				json()
			);
			logger = createLogger({
				level: 'info',
				format: formatOpts,
				transports: transportsOpt
			});
		}

		return logger;
	}
};
