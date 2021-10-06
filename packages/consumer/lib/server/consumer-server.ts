// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {
	getDefaultChanneConfig,
	BotKitLogger,
	DialogUtil,
	GDUserSession,
	ICache,
	IChanneConfig,
	IMQ
} from '@powerbotkit/core';
import {
	InputMiddleware,
	OutputMiddleware,
	TMiddlewareConfig
} from './../middleware';
import { IWorkerRouterHandler } from './../router';

export interface TConsumerServerConfig {
	routerHandler: IWorkerRouterHandler;
	listenerAdaptor?: IMQ;
	publisherAdaptor?: IMQ;
	channeConfig?: IChanneConfig;
	cache?: ICache;
}

export interface IConsumerServer {
	setup(
		serverConfig: TConsumerServerConfig,
		middlewareConfig?: TMiddlewareConfig
	);
	start();
	sendToOutbound(channel: string, data: string);
}

export class ConsumerServer implements IConsumerServer {
	private channeConfig: IChanneConfig;
	private routerHandler: IWorkerRouterHandler;
	private listenerAdaptor: IMQ;
	private publisher: IMQ;
	private cache: ICache;
	private inputMiddleware: InputMiddleware;
	private outputMiddleware: OutputMiddleware;

	public setup(
		serverConfig: TConsumerServerConfig,
		middlewareConfig?: TMiddlewareConfig
	) {
		this.routerHandler = serverConfig.routerHandler;
		this.listenerAdaptor = serverConfig.listenerAdaptor;
		this.publisher = serverConfig.publisherAdaptor;
		this.channeConfig = serverConfig.channeConfig || getDefaultChanneConfig();
		this.cache = serverConfig.cache;
		if (middlewareConfig && middlewareConfig.inputMiddleware) {
			this.inputMiddleware = middlewareConfig.inputMiddleware;
		}
		if (middlewareConfig && middlewareConfig.outputMiddleware) {
			this.outputMiddleware = middlewareConfig.outputMiddleware;
		}
	}

	public async start() {
		await this.listenerAdaptor.init();
		await this.publisher.init();
		this.listenerAdaptor.onSubscribed(channel => {
			BotKitLogger.getLogger().info(`🚗 Consumer listen to ${channel} broker`);
		});

		this.listenerAdaptor.onMessage(async (channel: string, data: any) => {
			BotKitLogger.getLogger().info(
				'Consumer received message in channel: ' + channel
			);
			const dialog: GDUserSession = JSON.parse(data);
			const dialogKey = 'consumer-' + DialogUtil.getDialogKey(dialog.id);
			const dialogIncache = this.cache?.get(dialogKey);
			if (dialogIncache) {
				BotKitLogger.getLogger().info(
					`dialog ${dialogKey} had been processed in the other worker`
				);

				return;
			} else {
				BotKitLogger.getLogger().info(
					`dialog ${dialogKey} is never processed in the other worker`
				);
				await this.cache?.set(dialogKey, data);
			}
			if (this.inputMiddleware) {
				await this.inputMiddleware.process(dialog);
			}
			const updatedDialog = await this.routerHandler.redirect(dialog); // process bussiness logic
			if (this.outputMiddleware) {
				await this.outputMiddleware.process(updatedDialog);
			}
			this.sendToOutbound(
				this.channeConfig.outboundChannel,
				JSON.stringify(updatedDialog)
			);

			await this.cache?.delete(dialogKey);
		});

		this.listenerAdaptor.subscribe(this.channeConfig.inboundChannel);
	}

	public sendToOutbound(channel: string, data: string) {
		return this.publisher.publish(channel, data);
	}
}
