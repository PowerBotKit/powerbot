import { createServer, IBotServer } from "..";

describe('server', () => {
	let server: IBotServer;
	beforeAll(async() => {
		server = await createServer();
	})
	it('should create', () => {
		expect(server).toBeTruthy();
	});
});
