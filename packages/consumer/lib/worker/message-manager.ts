import { GDUserSession } from '@powerbotkit/core';
import { WorkerMiddleware } from './middleware';

export interface WokerRouterHandler {
	stack: { path: string; funcStack: Function[] }[];

	// filePath, or object
	setUpIntent(object: string | object);
	// control message to correspond worker or serivce
	redirect(context: GDUserSession): Promise<any>;
	// register('SavingHours/welcomeMessage', dealWithWelcomeMessage)
	register(path: string, func: Function, middleware?: WorkerMiddleware);
	getServiceByPath(path: string): Function;
}
