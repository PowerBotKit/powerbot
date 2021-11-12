// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {
	BaseWorker,
	ConsumerServer,
	IBotWorker,
	IWorkerRouterHandler,
	TConsumerServerConfig,
	TMiddlewareConfig,
	WorkerRouterHandler
} from '@powerbotkit/consumer';

import { GDUserSession, MessageOutput, MessageType } from '@powerbotkit/core';
import {
	InputMiddleware4Worker,
	InputMiddlewareGlobal,
	OutputMiddleware4Worker,
	OutputMiddlewareGlobal
} from './middleware';

class EchoWorker extends BaseWorker {
	constructor(defaultService: string) {
		super(defaultService);
	}
	async process(dialog: GDUserSession): Promise<GDUserSession> {
		return super.process(dialog);
	}

	echoService(dialog: GDUserSession): MessageOutput {
		const userInput = super.getUserInput(dialog);
		const card = {
			type: 'AdaptiveCard',
			version: '1.0',
			body: [
				{
					type: 'TextBlock',
					text: 'Echo ${value}!',
					size: 'large'
				}
			],
			actions: [
				{
					type: 'Action.OpenUrl',
					url: 'http://adaptivecards.io',
					title: 'Learn More'
				}
			]
		};
		const result = super.getRenderCard(card, userInput);
		const outputMessage: MessageOutput = {
			type: MessageType.cardAdd,
			value: result
		};

		return outputMessage;
	}
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises,@typescript-eslint/require-await
(async () => {
	const routerHandler: IWorkerRouterHandler = new WorkerRouterHandler(
		'EchoWorker'
	);
	const echoWorker: IBotWorker = new EchoWorker('echoService');

	const inputMiddlewareGlobal = new InputMiddlewareGlobal();
	const outputMiddlewareGlobal = new OutputMiddlewareGlobal();

	const inputMiddleware4Worker = new InputMiddleware4Worker();
	const outputMiddleware4Worker = new OutputMiddleware4Worker();

	routerHandler.register(
		'EchoWorker',
		echoWorker,
		inputMiddleware4Worker,
		outputMiddleware4Worker
	);
	const serverConfig: TConsumerServerConfig = {
		routerHandler
	};
	const middlewareConfig: TMiddlewareConfig = {
		inputMiddleware: inputMiddlewareGlobal,
		outputMiddleware: outputMiddlewareGlobal
	};
	const server = new ConsumerServer();
	server.setup(serverConfig, middlewareConfig);
	await server.start();
})();
