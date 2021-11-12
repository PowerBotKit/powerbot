// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as path from 'path';

import {
	BotKitLogger,
	GDUserSession,
	Intent,
	IntentYAMLConfig,
	JsonIntent,
	MessageAction,
	WildcardIntent
} from '@powerbotkit/core';

import { InputMiddleware, OutputMiddleware } from '../middleware';
import { isPromise, readYamlFromFilePath } from '../utils';
import { IBotWorker } from '../worker';
import {
	InboundMiddlewareStackMeta,
	IntentStackMeta,
	OutboundMiddlewareStackMeta,
	RouteStackMeta
} from './meta';

export interface IWorkerRouterHandler {
	// filePath, or object
	setUpIntent(intent: string | object);
	// control message to correspond worker or serivce
	redirect(context: GDUserSession): Promise<GDUserSession>;
	// register('SavingHours/welcomeMessage', dealWithWelcomeMessage)
	register(
		// eslint-disable-next-line no-shadow
		path: string,
		worker: any,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	);
	getWorkerNameByIntent(intent: string): string | Promise<string>;
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

	setUpIntent(intent: string | Intent) {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		BotKitLogger.getLogger().info('set up intent file', intent);
		if (typeof intent === 'string') {
			this.setUpIntentFile(intent);
		} else {
			this.intent = intent;
		}
	}

	async getWorkerNameByIntent(intentInput: string): Promise<string> {
		let workerName = null as string;
		if (this.intent) {
			let intentStackName = '';
			const intentStackNameP = this.intent.process(intentInput);
			if (isPromise(intentStackNameP)) {
				intentStackName = await intentStackNameP;
			} else {
				intentStackName = intentStackNameP;
			}
			workerName = (this.intentStack[intentStackName] ||
				intentStackName) as string;
		}
		if (!workerName) {
			workerName = this.defaultWorker;
		}

		return workerName;
	}

	async redirect(context: GDUserSession): Promise<GDUserSession> {
		BotKitLogger.getLogger().info('redirect');
		if (context.worker && context.worker.workerName === '') {
			context.worker.workerName = await this.getWorkerNameByIntent(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				context.input.value
			);
		}
		const workerName = context.worker.workerName;

		if (this.inboundMiddlewareStack[workerName]) {
			const inMDW: InputMiddleware = this.inboundMiddlewareStack[workerName];
			await inMDW.process(context);
		}

		if (this.routeStack[workerName]) {
			const workerClass: IBotWorker = this.routeStack[workerName];
			await workerClass.process(context);
		}

		if (this.outboundMiddlewareStack[workerName]) {
			const outMDW: OutputMiddleware = this.outboundMiddlewareStack[workerName];
			await outMDW.process(context);
		}

		if (context.output?.action === MessageAction.quit) {
			context.worker.workerName = '';
			context.history = [];
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return context;
	}

	register(
		workerName: string,
		worker: any,
		middlewareIn?: InputMiddleware,
		middlewareOut?: OutputMiddleware
	) {
		BotKitLogger.getLogger().info('register');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.routeStack[workerName] = worker;
		if (middlewareIn) {
			this.inboundMiddlewareStack[workerName] = middlewareIn;
		}
		if (middlewareOut) {
			this.outboundMiddlewareStack[workerName] = middlewareOut;
		}
	}

	private setUpIntentFile(intentFilePath: string) {
		const extname = path.extname(intentFilePath);
		if (extname === '.yaml') {
			const config = readYamlFromFilePath<IntentYAMLConfig>(intentFilePath);
			if (config.type !== 'wildcard') {
				throw new Error('wildcard yml file is only unsupported');
			}
			const wildCardConfig = config;
			if (wildCardConfig.intents) {
				const map = new Map<string, string[]>();
				wildCardConfig.intents.forEach(intent => {
					map.set(intent.name, intent.wildcards);
				});
				this.intent = new WildcardIntent(map);
			}
		} else if (extname === '.json') {
			this.intent = new JsonIntent(intentFilePath);
		}
	}
}
