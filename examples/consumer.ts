import { ConsumerServer, WokerRouterHandler, TConsumerServerConfig } from '@powerbotkit/consumer';

(async () => {
	const rounterConfig: WokerRouterHandler = new WokerRouterHandler();
	const serverConfig: TConsumerServerConfig = {
		routerHandler: rounterConfig
	}
	const server = new ConsumerServer();
	server.setup(serverConfig);
	server.start();
})();