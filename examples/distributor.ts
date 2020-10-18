import { createDistributorServer, TBotConfig } from '@powerbotkit/distributor';

(async () => {
	const config: TBotConfig = {
		appId: '',
		appSecret: ''
	};
	const server = await createDistributorServer(config);
	server.listen();
})();
