import { createServer } from './server/server';

(async () => {
	const server = await createServer({});
	server.listen();
})();
