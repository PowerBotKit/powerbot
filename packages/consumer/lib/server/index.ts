import { IWokerRouterHandler } from '../router';
import { InputMiddleware, OutputMiddleware } from '../middleware';
import { GDUserSession, IMQ, RedisMQ, BotKitLogger } from '@powerbotkit/core';

export interface TConsumerServerConfig {
	routerHandler: IWokerRouterHandler;
	listenerAdaptor?: IMQ;
	publisherAdaptor?: IMQ;
}

export interface TMiddlewareConfig {
	inputMiddleware?: InputMiddleware;
	outputMiddleware?: OutputMiddleware;
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
	private routerHandler: IWokerRouterHandler;
	private listenerAdaptor: IMQ;
	private publisher: IMQ;
	private inputMiddleware: InputMiddleware;
	private outputMiddleware: OutputMiddleware;

	public setup(
		serverConfig: TConsumerServerConfig,
		middlewareConfig?: TMiddlewareConfig
	) {
		this.routerHandler = serverConfig.routerHandler;
		this.listenerAdaptor = serverConfig.listenerAdaptor || new RedisMQ();
		this.publisher = serverConfig.publisherAdaptor || new RedisMQ();
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

		this.listenerAdaptor.onMessage(async (channel: string, data: any) => {
			BotKitLogger.getLogger().info(
				'Con received message in channel: ' + channel + ' value: ' + data
			);
			const dialog: GDUserSession = JSON.parse(data);
			if (this.inputMiddleware) {
				await this.inputMiddleware.process(dialog);
			}
			await this.routerHandler.redirect(data); // process bussiness logic
			if (this.outputMiddleware) {
				await this.outputMiddleware.process(dialog);
			}
			this.sendToOutbound(channel, data);
		});

		this.listenerAdaptor.subscribe('inbound');
	}

	public sendToOutbound(channel: string, data) {
		return this.publisher.publish(channel, data);
	}
}
