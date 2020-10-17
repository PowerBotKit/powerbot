import {
	Activity,
	TeamsChannelAccount,
	TeamsInfo,
	TurnContext
} from 'botbuilder';

import {
	GDUserSession,
	MessageType,
	InitiatorType,
	CoreSessionUtil,
	logger
} from '@powerbotkit/core';

export class DialogUtil {
	public static getDialogKey(id: string) {
		return `dialog-${id}`;
	}

	// get user information
	public static async getUserInfo(context: any): Promise<TeamsChannelAccount> {
		logger.info('Query Teams user information');
		let userDetails: TeamsChannelAccount;
		if (process.env.MicrosoftAppId && process.env.MicrosoftAppId === '') {
			userDetails = await TeamsInfo.getMember(
				context,
				context.activity.from.id
			);
		} else {
			// for local bot emulator
			logger.info('Local dev enviroment, set up dummy account...');
			userDetails = {
				id: '@localDev',
				name: 'Local Dev',
				email: 'local@dev.com',
				givenName: 'Local',
				surname: 'Dev',
				tenantId: 'Dev Tenant',
				userRole: 'Dev'
			};
		}

		return userDetails;
	}

	public static async newDialog(context: TurnContext): Promise<GDUserSession> {
		const conversationReference = TurnContext.getConversationReference(
			context.activity
		);
		const userInfo = await this.getUserInfo(context);

		return {
			id: context.activity.recipient.id,
			user: userInfo,
			botConversion: conversationReference,
			worker: {
				workerName: '',
				topic: 'inbound'
			},
			service: '',
			step: 0,
			input: {
				type: MessageType.text,
				value: context.activity.text,
				action: null
			},
			output: { type: MessageType.text, value: '', action: null },
			history: []
		};
	}

	public static updateDialogInput(
		activity: Activity,
		session: GDUserSession
	): GDUserSession {
		if (typeof activity.text === 'string') {
			session.input.type = MessageType.text;
			session.input.value = activity.text;
		} else {
			session.input.type = MessageType.card;
			session.input.value = activity.value;
		}

		this.addHistory(
			session,
			InitiatorType.user,
			MessageType.text,
			activity.text
		);

		return session;
	}

	public static addHistory(
		session: GDUserSession,
		initiatorType: InitiatorType,
		messageType: MessageType,
		value: string
	) {
		return CoreSessionUtil.addHistory(
			session,
			initiatorType,
			messageType,
			value
		);
	}
}
