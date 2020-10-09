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
import { IDataPersist } from 'lib/models';
export class InboundHandlerBase extends ActivityHandler {
	private cache: ICache;
	private publisher: IMQ;
	private dataStore: IDataPersist;
	constructor(cache: ICache, publisher: IMQ, dataStore: IDataPersist) {
		super();
		this.cache = cache;
		this.publisher = publisher;
		this.dataStore = dataStore;
		this.dataStore.init();
	}

	public async publish(context: TurnContext, topic?: string) {
		const { dialogKey, dialog } = await this.setupCustomizedDialog(context);
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
			this.cache.set(dialogKey, updatedDialog, 60 * 60);
		} else {
			// new dialog
			logger.info('new dialog');
			updatedDialog = await DialogUtil.newDialog(context);
			this.cache.set(dialogKey, updatedDialog, 60 * 60);
		}

		return {
			dialogKey,
			dialog: updatedDialog
		};
	}
}
