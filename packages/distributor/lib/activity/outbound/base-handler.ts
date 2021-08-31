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

import {
	BotKitLogger,
	DialogUtil,
	GDUserSession,
	MessageType
} from '@powerbotkit/core';
import { BotFrameworkAdapter } from 'botbuilder';
import { ICache } from '../../cache';
import { OnPostrReceiveMessage } from './hook';
import { IMiddlewareOutbound } from './middleware';

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
				const response = {} as { id: string } & { ids: string[] };
				if (
					dialog.output.type === MessageType.cardAdd ||
					dialog.output.type === MessageType.textAdd
				) {
					const message = dialog.output.value;
					if (Array.isArray(message)) {
						const ress = await turnContext.sendActivities(message);
						response.ids = ress.map(r => r.id);
					} else {
						const { id } = await turnContext.sendActivity(message);
						response.id = id;
					}
				} else if (
					dialog.output.type === MessageType.cardEdit ||
					dialog.output.type === MessageType.textEdit
				) {
					// https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/update-and-delete-bot-messages?tabs=typescript#updating-messages
					const message = dialog.output.value;
					if (Array.isArray(message)) {
						BotKitLogger.getLogger().error(
							'Batch update card is non supported'
						);
					} else if (typeof message === 'string') {
						BotKitLogger.getLogger().error(
							'update text message is non supported'
						);
					} else {
						await turnContext.updateActivity(message);
						response.id = message.id;
					}
				} else if (
					dialog.output.type === MessageType.textDelete ||
					dialog.output.type === MessageType.cardDelete
				) {
					const message = dialog.output.value;
					if (Array.isArray(message)) {
						BotKitLogger.getLogger().error(
							'Batch delete activity is non supported'
						);
					} else if (typeof message === 'string') {
						turnContext.deleteActivity(message);
					}
				} else {
					BotKitLogger.getLogger().error('Can not identify message type');
				}
				if ((this as unknown as OnPostrReceiveMessage).onPostReceiveMessage) {
					if (response.id) {
						await (
							this as unknown as OnPostrReceiveMessage
						).onPostReceiveMessage(turnContext, {
							dialog,
							response
						});
					} else if (response.ids && response.ids.length > 0) {
						await Promise.all(
							response.ids.map(async id => {
								return (
									this as unknown as OnPostrReceiveMessage
								).onPostReceiveMessage(turnContext, {
									dialog,
									response: { id }
								});
							})
						);
					}
				}
				const dialogKey = DialogUtil.getDialogKey(dialog.id);
				await cache.set(dialogKey, dialog, 60 * 60 * 24);
				await cache.unlock(dialog.id);
			}
		);
	}
}
