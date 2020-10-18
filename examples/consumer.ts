import {
	ConsumerServer,
	WokerRouterHandler,
	TConsumerServerConfig,
	BaseWorker,
	IBotWorker
} from '@powerbotkit/consumer';
import { GDUserSession, MessageOutput, MessageType } from '@powerbotkit/core';

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
	const rounterHandler: WokerRouterHandler = new WokerRouterHandler();
	const echoWorker: IBotWorker = new EchoWorker('echoService');
	rounterHandler.register('EchoWorker', echoWorker);
	const serverConfig: TConsumerServerConfig = {
		routerHandler: rounterHandler
	};
	const server = new ConsumerServer();
	server.setup(serverConfig);
	server.start();
})();
