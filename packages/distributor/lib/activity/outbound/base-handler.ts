// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { BotKitLogger, GDUserSession, MessageType } from '@powerbotkit/core';
import {
	Activity,
	Attachment,
	BotFrameworkAdapter,
	CardFactory,
	MessageFactory
} from 'botbuilder';
import * as fs from 'fs';
import * as path from 'path';
import { IMiddlewareOutbound } from '.';
import { ICache } from '../../cache';

export class OutboundHandlerBase {
	private outboundMiddleware: IMiddlewareOutbound;
	constructor(outboundMiddleware: IMiddlewareOutbound) {
		this.outboundMiddleware = outboundMiddleware;
	}
	public async publish(
		adapter: BotFrameworkAdapter,
		cache: ICache,
		channel: string,
		data: string
	) {
		const dialog: GDUserSession = JSON.parse(data);
		if (this.outboundMiddleware) {
			await this.outboundMiddleware.process(dialog);
		}
		await adapter.continueConversation(
			dialog.botConversion,
			async turnContext => {
				if (dialog.output.type === MessageType.card) {
					const cardFile = JSON.parse(
						fs
							.readFileSync(
								path.join(
									__dirname,
									'../cards/' + dialog.output.value + '.json'
								)
							)
							.toString()
					);
					const card: Attachment = CardFactory.adaptiveCard(cardFile);
					// tslint:disable-next-line: no-shadowed-variable
					const message: Partial<Activity> = MessageFactory.attachment(card);
					await turnContext.sendActivity(message);
				} else if (dialog.output.type === MessageType.text) {
					await turnContext.sendActivity(dialog.output.value);
				} else {
					BotKitLogger.getLogger().error('Can not identify message type');
				}
				await cache.unlock(dialog.id);
			}
		);
	}
}
