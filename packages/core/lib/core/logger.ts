import * as winston from 'winston';

const { createLogger, transports, format } = winston;
const { combine, json } = format;

export class BotKitLogger {
	static logger: winston.Logger;
	static getLogger() {
		if (!this.logger) {
			const transportsOpt = [new transports.Console({ format: json() })];
			const formatOpts = combine(
				format.label({ label: '' }),
				format.timestamp(),
				json()
			);
			this.logger = createLogger({
				level: 'info',
				format: formatOpts,
				transports: transportsOpt
			});
		}

		return this.logger;
	}
}
