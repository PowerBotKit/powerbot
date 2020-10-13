import {
	ActivityHandler,
	TurnContext,
	MessageFactory,
	TeamsChannelAccount
} from 'botbuilder';
import { DialogUtil } from '../../utils/dialog-util';
import { GDWorker, GDUserSession } from '@powerbotkit/core';
import logger from '../../utils/logger';
import { IMQ } from '../../mq';
import { ICache } from '../../cache';
import { IDataPersist } from '../../models';
import { IMiddlewareInbound } from '.';
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
			logger.info('found dialog');
			updatedDialog = DialogUtil.updateDialogInput(
				context.activity,
				dialogInCache
			);
			// lock redis
			await this.cache.lock(dialogKey, updatedDialog);
		} else {
			// new dialog
			logger.info('new dialog');
			updatedDialog = await DialogUtil.newDialog(context);
			// lock redis
			await this.cache.lock(dialogKey, updatedDialog);
		}

		return {
			dialogKey,
			dialog: updatedDialog
		};
	}
}
