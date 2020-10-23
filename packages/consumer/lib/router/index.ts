import * as path from 'path';

import {
	BotKitLogger,
	GDUserSession,
	Intent,
	IntentYAMLConfig,
	IntentYAMLWildcardConfig,
	WildcardIntent
} from '@powerbotkit/core';

import { InputMiddleware, OutputMiddleware } from '../middleware';
import { readYamlFromFilePath } from '../utils';
import { IBotWorker } from '../worker';

export interface IWorkerRouterHandler {
	// filePath, or object
	setUpIntent(intent: string | object);
	// control message to correspond worker or serivce
	redirect(context: GDUserSession): Promise<GDUserSession>;
	// register('SavingHours/welcomeMessage', dealWithWelcomeMessage)
	register(
		path: string,
		worker: any,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	);
	getWorkerNameByIntent(intent: string): string;
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

export class WorkerRouterHandler implements IWorkerRouterHandler {
	intent: Intent;
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

	setUpIntent(intent: string | object) {
		BotKitLogger.getLogger().info('set up intent file', intent);
		if (typeof intent === 'string') {
			this.setUpIntentFile(intent);
		}
		throw new Error('only support intent file path set');
	}

	getWorkerNameByIntent(intent: string): string {
		const intentStackName = this.intent.process(intent);
		let workerName = this.intentStack[intentStackName];
		if (!workerName) {
			workerName = this.defaultWorker;
		}

		return workerName;
	}

	async redirect(context: GDUserSession): Promise<GDUserSession> {
		BotKitLogger.getLogger().info('redirect');
		if (context.worker && context.worker.workerName === '') {
			context.worker.workerName = this.getWorkerNameByIntent(
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
		filepath: string,
		worker: any,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	) {
		BotKitLogger.getLogger().info('register');
		this.routeStack[filepath] = worker;
		if (middlewareIn) {
			this.inboundMiddlewareStack[filepath] = middlewareIn;
		}
		if (middlewareOut) {
			this.outboundMiddlewareStack[filepath] = middlewareOut;
		}
	}

	private setUpIntentFile(intentFilePath: string) {
		const extname = path.extname(intentFilePath);
		if (extname !== '.yaml') {
			throw new Error('no yml file is unsupported');
		}
		const config = readYamlFromFilePath<IntentYAMLConfig>(intentFilePath);
		if (config.type !== 'wildcard') {
			throw new Error('wildcard yml file is only unsupported');
		}
		const wildCardConfig = config as IntentYAMLWildcardConfig;
		if (wildCardConfig.intents) {
			const map = new Map<string, string[]>();
			wildCardConfig.intents.forEach(intent => {
				map.set(intent.name, intent.wildcards);
			});
			this.intent = new WildcardIntent(map);
		}
	}
}
