import {
	BaseWorker,
	ConsumerServer,
	IBotWorker,
	IWorkerRouterHandler,
	TConsumerServerConfig,
	TMiddlewareConfig,
	WorkerRouterHandler
} from '@powerbotkit/consumer';

import { GDUserSession, MessageOutput } from '@powerbotkit/core';
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
		const outputMessage: MessageOutput = {
			type: userInput.type,
			value: `Echo ${userInput.value}`
		};

		return outputMessage;
	}
}

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
	routerHandler.setUpIntent('./intent.yaml');
	const serverConfig: TConsumerServerConfig = {
		routerHandler
	};
	const middlewareConfig: TMiddlewareConfig = {
		inputMiddleware: inputMiddlewareGlobal,
		outputMiddleware: outputMiddlewareGlobal
	};
	const server = new ConsumerServer();
	server.setup(serverConfig, middlewareConfig);
	server.start();
})();
