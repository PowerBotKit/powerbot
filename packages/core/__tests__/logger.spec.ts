// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Console: jest.fn()
	}
}));

import { BotKitLogger } from '../lib/core/logger';

describe('core logger unit test', () => {
	test('get logger', () => {
		const logger = BotKitLogger.getLogger();
		expect(logger).toBeTruthy();
		logger.info('power bot kit info test');
		expect(mLogger.info).toHaveBeenCalled();
	});
});
