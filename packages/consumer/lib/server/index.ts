import { IRouterConfig, WokerRouterHandler } from '../router';
import { InputMiddleware, OutputMiddleware } from '../middleware';

// Placeholder interface
export type TConsumerConfig = {};

export type TMiddlewareConfig = {
	routerConfg: IRouterConfig;
	routerHandler: WokerRouterHandler;
	inputMiddleware: InputMiddleware;
	outputMiddleware: OutputMiddleware;
};

export interface IConsumerServer {
	setup(botConfig: TConsumerConfig, middlewareConfig: TMiddlewareConfig);
	start();
}
