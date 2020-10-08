import {
	ActivityHandler,
	TurnContext,
	MessageFactory
} from 'botbuilder';
import { DialogUtil } from '../utils/dialog-util';
import { GDWorker, GDUserSession } from '@powerbotkit/core';
import logger from '../utils/logger';
import { IMQ } from '../mq';
import { ICache } from '../cache';
export class BaseBot extends ActivityHandler {
	private cache: ICache;
	private publisher: IMQ;
	constructor(cache: ICache, publisher: IMQ) {
		super();
		this.cache = cache;
		this.publisher = publisher;
	}
	public async publish(context: TurnContext, topic?: string) {
		const { dialogKey, dialog } = await this.setupCustomizedDialog(context);
		this.publisher.publish(dialog.worker.topic || 'inbound', dialogKey);
	}

	public async handleMemberAdded(context: TurnContext) {
		const membersAdded = context.activity.membersAdded;
		const welcomeText = 'Hello and welcome!';
		for (const member of membersAdded) {
			if (member.id !== context.activity.recipient.id) {
				await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
			}
		}
	}


	private async setupCustomizedDialog(context: TurnContext, worker?: GDWorker): Promise<{ dialogKey: string, dialog: GDUserSession }> {
		const dialogKey = DialogUtil.getDialogKey(context.activity.recipient.id);
		const dialogInCache: GDUserSession = await this.cache.get(dialogKey);
		let updatedDialog: GDUserSession;
		if (dialogInCache) {
			// update dialog
			logger.info('found dialog');
			updatedDialog = DialogUtil.updateDialogInput(context.activity, dialogInCache);
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
