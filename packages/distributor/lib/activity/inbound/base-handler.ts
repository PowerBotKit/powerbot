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

import { BotKitLogger, GDUserSession, GDWorker, IMQ } from '@powerbotkit/core';
import {
	ActivityHandler,
	MessageFactory,
	TeamsChannelAccount,
	TurnContext
} from 'botbuilder';
import { IMiddlewareInbound } from '.';
import { ICache } from '../../cache';
import { IDataPersist } from '../../models';
import { DialogUtil } from '../../utils/dialog-util';

export class InboundHandlerBase extends ActivityHandler {
	private cache: ICache;
	private publisher: IMQ;
	private dataStore: IDataPersist;
	private inboundMiddleware: IMiddlewareInbound;

	constructor(
		cache: ICache,
		publisher: IMQ,
		dataStore: IDataPersist,
		inboundMiddleware?: IMiddlewareInbound
	) {
		super();
		this.cache = cache;
		this.publisher = publisher;
		this.dataStore = dataStore;
		this.inboundMiddleware = inboundMiddleware;
		this.dataStore.init();
	}

	public async publish(context: TurnContext, topic?: string) {
		const { dialogKey, dialog } = await this.setupCustomizedDialog(context);
		if (this.inboundMiddleware) {
			await this.inboundMiddleware.process(dialog);
		}
		this.publisher.publish(
			dialog.worker.topic || 'inbound',
			JSON.stringify(dialog)
		);
	}

	public async handleMemberAdded(context: TurnContext) {
		const membersAdded = context.activity.membersAdded;
		const welcomeText = 'Hello and welcome!';
		for (const member of membersAdded) {
			if (member.id !== context.activity.recipient.id) {
				const dialogKey = DialogUtil.getDialogKey(
					context.activity.recipient.id
				);
				await this.cache.delete(dialogKey);
				const userInfo: TeamsChannelAccount = await DialogUtil.getUserInfo(
					context
				);
				this.dataStore.insertUserSession({
					Email: userInfo.email,
					ConversationReference: TurnContext.getConversationReference(
						context.activity
					)
				});
				await context.sendActivity(
					MessageFactory.text(welcomeText, welcomeText)
				);
			}
		}
	}

	private async setupCustomizedDialog(
		context: TurnContext,
		worker?: GDWorker
	): Promise<{ dialogKey: string; dialog: GDUserSession }> {
		const dialogKey = DialogUtil.getDialogKey(context.activity.recipient.id);
		const dialogInCache: GDUserSession = await this.cache.get(dialogKey);
		let updatedDialog: GDUserSession;
		if (dialogInCache) {
			// update dialog
			BotKitLogger.getLogger().info('found dialog');
			updatedDialog = DialogUtil.updateDialogInput(
				context.activity,
				dialogInCache
			);
			// lock redis
			await this.cache.lock(dialogKey, JSON.stringify(updatedDialog));
		} else {
			// new dialog
			BotKitLogger.getLogger().info('new dialog');
			updatedDialog = await DialogUtil.newDialog(context);
			// lock redis
			await this.cache.lock(dialogKey, JSON.stringify(updatedDialog));
		}

		return {
			dialogKey,
			dialog: updatedDialog
		};
	}
}
