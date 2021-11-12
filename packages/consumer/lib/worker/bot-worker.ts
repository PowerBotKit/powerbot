// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	BotKitLogger,
	Event,
	GDUserSession,
	InitiatorType,
	MessageInput,
	MessageOutput,
	MessageType
} from '@powerbotkit/core';

import * as ACData from 'adaptivecards-templating';
import { Activity, Attachment, CardFactory, MessageFactory } from 'botbuilder';

export interface IBotWorker {
	process(dialog: GDUserSession): Promise<GDUserSession>;
	redirect(dialog: GDUserSession): Promise<void>;
}

export class BaseWorker implements IBotWorker {
	defaultService: string;
	constructor(defaultService: string) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		BotKitLogger.getLogger().info('Init the Base Worker');
		this.defaultService = defaultService || 'dummyService';
	}
	async process(dialog: GDUserSession): Promise<GDUserSession> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		BotKitLogger.getLogger().info('Start Base Bot Worker');
		await this.redirect(dialog);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return dialog;
	}

	getUserInput(dialog: GDUserSession): MessageInput {
		return dialog.input;
	}

	setService(serviceName: string, dialog: GDUserSession) {
		dialog.service = serviceName;
	}

	setDefaultService(serviceName: string) {
		this.defaultService = serviceName;
	}

	async redirect(dialog: GDUserSession) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const func: Function = this[dialog.service || this.defaultService];
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const output: MessageOutput = await func.call(this, dialog);
		this.setBotOutput(output, dialog);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		BotKitLogger.getLogger().debug(
			`woker: ${this.constructor?.name || BaseWorker.name}, service: ${
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				dialog.service || this.defaultService
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			}, output: ${output.type} ->${output.value}`
		);
	}

	dummyService(dialog: GDUserSession): MessageOutput {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		BotKitLogger.getLogger().info(`Start dummy service: ${dialog.input.value}`);

		return {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			type: MessageType.textAdd,
			value: 'dummy message for test'
		};
	}

	setBotOutput(output: MessageOutput, dialog: GDUserSession): void {
		dialog.output = output;
		const event: Event = {
			initiator: InitiatorType.bot,
			type: output.type,
			value: output.value,
			timestamp: new Date(),
			activityId: ''
		};
		dialog.history.push(event);
	}

	getRenderCard(cardTemplate: object, data: object): Partial<Activity> {
		const template: ACData.Template = new ACData.Template(cardTemplate);
		const context: ACData.IEvaluationContext = {
			$root: {}
		};
		context.$root = data;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const content: object = template.expand(context);
		const card: Attachment = CardFactory.adaptiveCard(content);

		return MessageFactory.attachment(card);
	}
}
