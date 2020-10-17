import {
	Activity,
	Attachment,
	BotFrameworkAdapter,
	CardFactory,
	MessageFactory
} from 'botbuilder';
import { GDUserSession, MessageType, logger } from '@powerbotkit/core';
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
					logger.error('Can not identify message type');
				}
				await cache.unlock(dialog.id);
			}
		);
	}
}
