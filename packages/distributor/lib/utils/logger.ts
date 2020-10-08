import * as winston from 'winston';

const { createLogger, transports, format } = winston;
const { combine, printf, json } = format;

const newLogger = (logLabel = '') => {
	// const customFormat = printf((msg) => {
	//   const { timestamp, label, level, message, ...logObject } = msg;

	//   return `[${msg.timestamp}] ${msg.label} ${msg.level}: ${message} ${
	//     logObject ? JSON.stringify(logObject, null, 2) : ''
	//   }`;
	// });

	const transportsOpt = [new transports.Console({ format: json() })];
	const formatOpts = combine(
		format.label({ label: logLabel }),
		format.timestamp(),
		json()
	);

	return createLogger({
		level: 'info',
		format: formatOpts,
		transports: transportsOpt
	});
};

export default newLogger('Power-Bot-Log');
