// jest mock must be the beginning
const mLogger = {
	info: jest.fn(),
	debug: jest.fn()
};

jest.mock('winston', () => ({
	format: {
		colorize: jest.fn(),
		combine: jest.fn(),
		label: jest.fn(),
		timestamp: jest.fn(),
		printf: jest.fn(),
		json: jest.fn()
	},
	createLogger: jest.fn().mockReturnValue(mLogger),
	transports: {
		Console: jest.fn()
	}
}));

import { BotKitLogger } from '../../lib/core/logger';

describe('core logger unit test', () => {
	test('get logger', () => {
		const logger = BotKitLogger.getLogger();
		expect(logger).toBeTruthy();
		logger.info('power bot kit info test');
		expect(mLogger.info).toHaveBeenCalled();
	});
});
