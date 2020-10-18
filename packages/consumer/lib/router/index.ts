import { GDUserSession, BotKitLogger } from '@powerbotkit/core';
import { BaseWorker, IBotWorker } from '../worker';
import { InputMiddleware, OutputMiddleware } from '../middleware';

export interface IWokerRouterHandler {
	// filePath, or object
	setUpIntent(object: string | object);
	// control message to correspond worker or serivce
	redirect(context: GDUserSession): Promise<GDUserSession>;
	// register('SavingHours/welcomeMessage', dealWithWelcomeMessage)
	register(
		path: string,
		func: Function,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	);
	getWokerNameByIntent(intent: string): string;
}

export interface RouteStackMeta {
	[details: string]: any;
}

export interface IntentStackMeta {
	[details: string]: any;
}

export class WokerRouterHandler implements IWokerRouterHandler {
	routeStack: RouteStackMeta;
	intentStack: IntentStackMeta;

	constructor() {
		this.routeStack = {};
		this.intentStack = {};
	}

	setUpIntent(object: string | object) {
		BotKitLogger.getLogger().info('set up intent file', object);
	}

	getWokerNameByIntent(intent: string): string {
		let workerName = this.intentStack[intent];
		if (!workerName) {
			workerName = 'EchoWorker';
		}

		return workerName;
	}

	async redirect(context: GDUserSession): Promise<GDUserSession> {
		BotKitLogger.getLogger().info('redirect');
		if (context.worker && context.worker.workerName === '') {
			context.worker.workerName = this.getWokerNameByIntent(
				context.input.value
			);
		}
		const workerName = context.worker.workerName;
		const workerClass: IBotWorker = this.routeStack[workerName];
		await workerClass.process(context);

		return context;
	}
	register(
		path: string,
		worker: any,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	) {
		BotKitLogger.getLogger().info('register');
		this.routeStack[path] = worker;
	}
}
