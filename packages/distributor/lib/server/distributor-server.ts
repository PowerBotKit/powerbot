// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { BotFrameworkAdapter } from 'botbuilder';
import * as restify from 'restify';

import { BotKitLogger, IMQ, RedisMQ } from '@powerbotkit/core';

import { BotInstance, IBotServer, TBotConfig, TMiddlewareConfig } from '.';
import { InboundHandler, IMiddlewareInbound } from '../activity/inbound';
import { IMiddlewareOutbound, OutBoundHandler } from '../activity/outbound';
import { ICache } from '../cache';
import { RedisCache } from '../cache/redis-cache';
import { IDataPersist } from '../models';
import { LowDBDataPersist } from '../models/low-db-model';

export class DistributorServer implements IBotServer {
	// operation conversion saving
	public db?: IDataPersist;
	public cache?: ICache; // types define
	public listener?: IMQ;
	public publisher?: IMQ;
	public app?: restify.Server;
	public botInstance: BotInstance;
	public middlewareInbound: IMiddlewareInbound;
	public middlewareOutbound: IMiddlewareOutbound;

	public async setUpBotServer(
		botConfig: TBotConfig,
		middlewareConfig?: TMiddlewareConfig
	) {
		// below 3 steps need be configurable
		if (middlewareConfig && middlewareConfig.DataPersistAdaptor) {
			this.db = middlewareConfig.DataPersistAdaptor;
			await this.db.init();
		} else {
			await this.setupDB();
		}

		if (middlewareConfig && middlewareConfig.CacheAdaptor) {
			this.cache = middlewareConfig.CacheAdaptor;
			await this.cache.init();
		} else {
			await this.setupCache();
		}
		if (middlewareConfig && middlewareConfig.ListenerAdaptor) {
			this.listener = middlewareConfig.ListenerAdaptor;
			await this.listener.init();
		} else {
			await this.setupListener();
		}

		if (middlewareConfig && middlewareConfig.PublisherAdaptor) {
			this.publisher = middlewareConfig.PublisherAdaptor;
			await this.publisher.init();
		} else {
			await this.setupPublisher();
		}

		await this.setupApp();
		await this.setupBot(botConfig);
	}

	private async setupDB() {
		this.db = new LowDBDataPersist();
		await this.db.init();
	}

	private async setupCache() {
		this.cache = new RedisCache();
		await this.cache.init();
	}

	private async setupListener() {
		this.listener = new RedisMQ();
		await this.listener.init();
	}
	private async setupPublisher() {
		this.publisher = new RedisMQ();
		await this.publisher.init();
	}

	private async setupApp() {
		this.app = restify.createServer();
		this.app.use(restify.plugins.queryParser());
	}

	private async setupBot(config: TBotConfig) {
		const adapter = new BotFrameworkAdapter({
			appId: config.appId || process.env.MicrosoftAppId,
			appPassword: config.appSecret || process.env.MicrosoftAppPassword
		});
		const inboundHandler = new InboundHandler(
			this.cache,
			this.publisher,
			this.db,
			this.middlewareInbound
		);
		const outboundHandler = new OutBoundHandler(this.middlewareOutbound);
		outboundHandler.listen(adapter, this.cache, this.listener);
		this.app.post('/api/messages', (req, res) => {
			adapter.processActivity(req, res, async context => {
				// Route to main dialog.
				await inboundHandler.run(context);
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
	botConfig?: TBotConfig,
	middlewareConfig?: TMiddlewareConfig
): Promise<IBotServer> => {
	const server = new DistributorServer();
	await server.setUpBotServer(botConfig, middlewareConfig);

	return server;
};
