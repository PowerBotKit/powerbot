import {
	Activity,
	Attachment,
	BotFrameworkAdapter,
	CardFactory,
	MessageFactory
} from 'botbuilder';
import { GDUserSession, MessageType } from '@powerbotkit/core';
import logger from '../../utils/logger';
import * as fs from 'fs';
import * as path from 'path';

export class OutboundHandlerBase {
	public async publish(
		adapter: BotFrameworkAdapter,
		channel: string,
		data: string
	) {
		const dialog: GDUserSession = JSON.parse(data);
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
			}
		);
	}
}
