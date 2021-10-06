// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { BotFrameworkAdapter } from 'botbuilder';
import * as restify from 'restify';

import { BotKitLogger, ICache, IMQ } from '@powerbotkit/core';

import {
	InboundHandler,
	InboundHandlerBase,
	IMiddlewareInbound
} from '../activity/inbound';
import { IMiddlewareOutbound, OutBoundHandler } from '../activity/outbound';
import { IDataPersist } from '../models/data-persist';
import { BotInstance, IBotServer } from './server';
import {
	IBotServerConfig,
	TBotConfig,
	TMiddlewareConfig
} from './server-config';

export class DistributorServer implements IBotServer {
	// operation conversion saving
	private db: IDataPersist;
	private cache: ICache;
	private listener: IMQ;
	private publisher: IMQ;
	protected app: restify.Server;
	private botInstance: BotInstance;
	private middlewareInbound: IMiddlewareInbound;
	private middlewareOutbound: IMiddlewareOutbound;
	private inboundHandler: InboundHandlerBase;

	public async setUpBotServer(
		botServerConfig: IBotServerConfig,
		middlewareConfig?: TMiddlewareConfig,
		inboundHandler?: InboundHandlerBase
	) {
		if (middlewareConfig) {
			const middlewareConfigQ = [];
			if (middlewareConfig.dataPersistAdaptor) {
				middlewareConfigQ.push(
					this.setupDB(middlewareConfig.dataPersistAdaptor)
				);
			}
			if (middlewareConfig.cacheAdaptor) {
				middlewareConfigQ.push(this.setupCache(middlewareConfig.cacheAdaptor));
			}
			if (middlewareConfig.listenerAdaptor) {
				middlewareConfigQ.push(
					this.setupListener(middlewareConfig.listenerAdaptor)
				);
			}
			if (middlewareConfig.publisherAdaptor) {
				middlewareConfigQ.push(
					this.setupPublisher(middlewareConfig.publisherAdaptor)
				);
			}
			if (middlewareConfig.inboundInterceptor) {
				this.addInboundMiddleware(middlewareConfig.inboundInterceptor);
			}
			if (middlewareConfig.outboundInterceptor) {
				this.addOutboundMiddleware(middlewareConfig.outboundInterceptor);
			}

			if (middlewareConfigQ.length > 0) {
				await Promise.all(middlewareConfigQ);
			}
		}

		this.inboundHandler =
			inboundHandler || (new InboundHandler() as InboundHandlerBase);
		this.inboundHandler.init(
			this.cache,
			this.publisher,
			this.db,
			this.middlewareInbound
		);

		await this.setupApp();
		await this.setupBot(botServerConfig);
	}

	public async setupDB(db: IDataPersist) {
		this.db = db;
		await this.db.init();
	}

	public async setupCache(cache: ICache) {
		this.cache = cache;
		await this.cache.init();
	}

	public async setupListener(listener: IMQ) {
		this.listener = listener;
		await this.listener.init();
	}
	public async setupPublisher(publisher: IMQ) {
		this.publisher = publisher;
		await this.publisher.init();
	}

	public async setupApp() {
		this.app = restify.createServer();
		this.app.use(restify.plugins.queryParser());
	}

	public async setupBot(config: IBotServerConfig) {
		const botConfig = config.botConfig;
		const adapter = new BotFrameworkAdapter({
			appId: botConfig.appId,
			appPassword: botConfig.appSecret
		});
		const outboundHandler = new OutBoundHandler(this.middlewareOutbound);
		if (config.channelConfig) {
			outboundHandler.outBoundHandlerConfig = {
				subscribeChannel: config.channelConfig.outboundChannel
			};
			(this.inboundHandler as InboundHandler).inBoundHandlerConfig = {
				publlisChannel: config.channelConfig.inboundChannel
			};
		}
		outboundHandler.listen(adapter, this.cache, this.listener);
		this.app.post('/api/messages', (req, res) => {
			adapter.processActivity(req, res, async context => {
				// Route to main dialog.
				await this.inboundHandler.run(context);
			});
		});
	}

	public async listen(port?: string | number) {
		const por = port ? port : 3978;
		this.app.listen(por, '0.0.0.0', () => {
			BotKitLogger.getLogger().info(`✈️  Bot Server listening to ${por}`);
		});
	}

	public addInboundMiddleware(mwi: IMiddlewareInbound) {
		this.middlewareInbound = mwi;
	}

	public addOutboundMiddleware(mwo: IMiddlewareOutbound) {
		this.middlewareOutbound = mwo;
	}
}

export const createDistributorServer = async (
	botServerConfig?: IBotServerConfig,
	middlewareConfig?: TMiddlewareConfig,
	inboundHandler?: InboundHandlerBase
): Promise<IBotServer> => {
	const server = new DistributorServer();
	await server.setUpBotServer(
		botServerConfig,
		middlewareConfig,
		inboundHandler
	);

	return server;
};

/**
 * This is an experimental class and may be deleted.
 */
/* tslint:disable-next-line:max-classes-per-file */
class RestifyDistributorServer extends DistributorServer {
	constructor(private distributorServer: DistributorServer) {
		super();
	}

	public get AppServer(): restify.Server {
		return (this.distributorServer as unknown as { app: restify.Server }).app;
	}

	public setUpBotServer(
		botServerConfig: IBotServerConfig,
		middlewareConfig?: TMiddlewareConfig,
		inboundHandler?: InboundHandlerBase
	): Promise<void> {
		return this.distributorServer.setUpBotServer(
			botServerConfig,
			middlewareConfig,
			inboundHandler
		);
	}
	public setupDB(db: IDataPersist<any>): Promise<void> {
		return this.distributorServer.setupDB(db);
	}
	public setupCache(cache: ICache): Promise<void> {
		return this.distributorServer.setupCache(cache);
	}
	public setupListener(listener: IMQ): Promise<void> {
		return this.distributorServer.setupListener(listener);
	}
	public setupPublisher(publisher: IMQ): Promise<void> {
		return this.distributorServer.setupPublisher(publisher);
	}
	public setupApp(): Promise<void> {
		return this.distributorServer.setupApp();
	}
	public setupBot(botServerConfig: IBotServerConfig): Promise<void> {
		return this.distributorServer.setupBot(botServerConfig);
	}
	public listen(port?: string | number): Promise<void> {
		return this.distributorServer.listen(port);
	}
	public addInboundMiddleware(mwi: IMiddlewareInbound): void {
		this.distributorServer.addInboundMiddleware(mwi);
	}
	public addOutboundMiddleware(mwo: IMiddlewareOutbound): void {
		this.distributorServer.addOutboundMiddleware(mwo);
	}
}

/**
 * This is an experimental method and may be deleted.
 * @param server DistributorServer
 */
export const getRestifyDistributorServer = (
	server: DistributorServer,
	plugins?: restify.RequestHandler[]
): RestifyDistributorServer => {
	const restifyDistributorServer = new RestifyDistributorServer(server);
	if (plugins && plugins.length > 0) {
		restifyDistributorServer.AppServer.use(...plugins);
	}

	return restifyDistributorServer;
};
