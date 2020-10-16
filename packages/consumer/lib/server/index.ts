import { IRouterConfig, WokerRouterHandler } from '../router';
import { InputMiddleware, OutputMiddleware } from '../middleware';
import { IMQ } from '@powerbotkit/core';

export interface TConsumerConfig {
	routerConfg: IRouterConfig;
	routerHandler?: WokerRouterHandler;
	listenerAdaptor?: IMQ;
	publisherAdaptor?: IMQ;
}

export interface TMiddlewareConfig {
	inputMiddleware?: InputMiddleware;
	outputMiddleware?: OutputMiddleware;
}

export interface IConsumerServer {
	setup(botConfig: TConsumerConfig, middlewareConfig?: TMiddlewareConfig);
	start();
}

export class ConsumerServer implements IConsumerServer {
	public routerConfg: IRouterConfig;
	public listenerAdaptor: IMQ;

	public setup(
		botConfig: TConsumerConfig,
		middlewareConfig?: TMiddlewareConfig
	) {
		this.listenerAdaptor = botConfig.listenerAdaptor;
		this.routerConfg = botConfig.routerConfg;
	}
	public start() {
		this.listenerAdaptor.init();
		this.listenerAdaptor.subscribe('inbound');
	}
}
