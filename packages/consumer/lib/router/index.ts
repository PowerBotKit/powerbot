import { GDUserSession, BotKitLogger } from '@powerbotkit/core';
import { InputMiddleware, OutputMiddleware } from '../middleware';

export interface IWokerRouterHandler {
	// filePath, or object
	setUpIntent(object: string | object);
	// control message to correspond worker or serivce
	redirect(context: GDUserSession): Promise<any>;
	// register('SavingHours/welcomeMessage', dealWithWelcomeMessage)
	register(
		path: string,
		func: Function,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	);
}

export interface RouteStackMeta {
	stack: { path: string; funcStack: Function }[];
}

export class WokerRouterHandler implements IWokerRouterHandler {
	stacks: RouteStackMeta[];
	setUpIntent(object: string | object) {
		BotKitLogger.getLogger().info('set up intent file', object);
	}
	redirect(context: GDUserSession): Promise<any> {
		BotKitLogger.getLogger().info('redirect');

		return;
	}
	register(
		path: string,
		func: Function,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	) {
		BotKitLogger.getLogger().info('register');
	}
}
