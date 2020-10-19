import { BotKitLogger, GDUserSession } from '@powerbotkit/core';
import { InputMiddleware, OutputMiddleware } from '../middleware';
import { IBotWorker } from '../worker';

export interface IWokerRouterHandler {
	// filePath, or object
	setUpIntent(object: string | object);
	// control message to correspond worker or serivce
	redirect(context: GDUserSession): Promise<GDUserSession>;
	// register('SavingHours/welcomeMessage', dealWithWelcomeMessage)
	register(
		path: string,
		worker: any,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	);
	getWokerNameByIntent(intent: string): string;
}

export interface RouteStackMeta {
	[workerName: string]: IBotWorker;
}

export interface IntentStackMeta {
	[intentName: string]: any;
}

export interface InboundMiddlewareStackMeta {
	[workerName: string]: InputMiddleware;
}

export interface OutboundMiddlewareStackMeta {
	[workerName: string]: OutputMiddleware;
}

export class WokerRouterHandler implements IWokerRouterHandler {
	routeStack: RouteStackMeta;
	intentStack: IntentStackMeta;
	inboundMiddlewareStack: InboundMiddlewareStackMeta;
	outboundMiddlewareStack: OutboundMiddlewareStackMeta;
	defaultWorker: string;

	constructor(defaultWorker: string) {
		this.routeStack = {};
		this.intentStack = {};
		this.inboundMiddlewareStack = {};
		this.outboundMiddlewareStack = {};
		this.defaultWorker = defaultWorker;
	}

	setUpIntent(object: string | object) {
		BotKitLogger.getLogger().info('set up intent file', object);
	}

	getWokerNameByIntent(intent: string): string {
		let workerName = this.intentStack[intent];
		if (!workerName) {
			workerName = this.defaultWorker;
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

		if (this.inboundMiddlewareStack[workerName]) {
			const inMDW: InputMiddleware = this.inboundMiddlewareStack[workerName];
			await inMDW.process(context);
		}

		const workerClass: IBotWorker = this.routeStack[workerName];
		await workerClass.process(context);

		if (this.outboundMiddlewareStack[workerName]) {
			const outMDW: OutputMiddleware = this.outboundMiddlewareStack[workerName];
			await outMDW.process(context);
		}

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
		if (middlewareIn) {
			this.inboundMiddlewareStack[path] = middlewareIn;
		}
		if (middlewareOut) {
			this.outboundMiddlewareStack[path] = middlewareOut;
		}
	}
}
