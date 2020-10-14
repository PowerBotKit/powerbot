import { GDUserSession } from '@powerbotkit/core';
import { InputMiddleware, OutputMiddleware } from '../middleware';

export interface WokerRouterHandler {
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
	getServiceByPath(path: string): Function;
}

export interface IRouterConfig {
	stack: { path: string; funcStack: Function[] }[];
}
