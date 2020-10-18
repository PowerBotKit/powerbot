import {
	ConsumerServer,
	WokerRouterHandler,
	TConsumerServerConfig,
	BaseWorker,
	IBotWorker,
	IWokerRouterHandler,
	TMiddlewareConfig
} from '@powerbotkit/consumer';

import { GDUserSession, MessageOutput } from '@powerbotkit/core';
import {
	InputMiddlewareGlobal,
	OutputMiddlewareGlobal,
	InputMiddleware4Worker,
	OutputMiddleware4Worker
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
		const outputMessage: MessageOutput = {
			type: userInput.type,
			value: `Echo ${userInput.value}`
		};

		return outputMessage;
	}
}

(async () => {
	const rounterHandler: IWokerRouterHandler = new WokerRouterHandler(
		'EchoWorker'
	);
	const echoWorker: IBotWorker = new EchoWorker('echoService');

	const inputMiddlewareGlobal = new InputMiddlewareGlobal();
	const outputMiddlewareGlobal = new OutputMiddlewareGlobal();

	const inputMiddleware4Worker = new InputMiddleware4Worker();
	const outputMiddleware4Worker = new OutputMiddleware4Worker();

	rounterHandler.register(
		'EchoWorker',
		echoWorker,
		inputMiddleware4Worker,
		outputMiddleware4Worker
	);
	const serverConfig: TConsumerServerConfig = {
		routerHandler: rounterHandler
	};
	const middlewareConfig: TMiddlewareConfig = {
		inputMiddleware: inputMiddlewareGlobal,
		outputMiddleware: outputMiddlewareGlobal
	};
	const server = new ConsumerServer();
	server.setup(serverConfig, middlewareConfig);
	server.start();
})();
