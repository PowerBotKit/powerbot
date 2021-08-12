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
	Activity,
	TeamsChannelAccount,
	TeamsInfo,
	TurnContext
} from 'botbuilder';

import {
	BotKitLogger,
	CoreSessionUtil,
	GDUserSession,
	InitiatorType,
	MessageInput,
	MessageType
} from '../core';

export class DialogUtil {
	public static getDialogKey(id: string) {
		return `dialog-${id}`;
	}

	// get user information
	public static async getUserInfo(
		context: TurnContext
	): Promise<TeamsChannelAccount> {
		BotKitLogger.getLogger().info('Query Teams user information');
		let userDetails: TeamsChannelAccount;
		if (process.env.MicrosoftAppId && process.env.MicrosoftAppId !== '') {
			// connect to online teams bot
			userDetails = await TeamsInfo.getMember(
				context,
				context.activity.from.id
			);
		} else {
			// for local bot emulator
			BotKitLogger.getLogger().info(
				'Local dev enviroment, set up dummy account...'
			);
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
		const input = this.getInput(context);

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
			input,
			output: { type: MessageType.textAdd, value: '', action: null },
			history: []
		};
	}

	public static updateDialogInput(
		activity: Activity,
		session: GDUserSession
	): GDUserSession {
		if (typeof activity.text === 'string') {
			session.input.type = MessageType.textAdd;
			session.input.value = activity.text;
		} else {
			session.input.type = MessageType.cardAdd;
			session.input.value = activity.value;
		}

		this.addHistory(
			session,
			InitiatorType.user,
			MessageType.textAdd,
			activity.text,
			activity.id
		);

		return session;
	}

	private static getInput(context: TurnContext): MessageInput | never {
		if (context.activity.text) {
			return {
				type: context.activity.replyToId
					? MessageType.textEdit
					: MessageType.textAdd,
				value: context.activity.text,
				action: null,
				replyToId: context.activity.replyToId
			};
		} else if (context.activity.value) {
			return {
				type: context.activity.replyToId
					? MessageType.cardEdit
					: MessageType.cardAdd,
				value:
					typeof context.activity.value === 'string'
						? context.activity.value
						: JSON.stringify(context.activity.value),
				action: null,
				replyToId: context.activity.replyToId
			};
		}
	}

	public static addHistory(
		session: GDUserSession,
		initiatorType: InitiatorType,
		messageType: MessageType,
		value: string,
		activityId: string
	) {
		return CoreSessionUtil.addHistory(
			session,
			initiatorType,
			messageType,
			value,
			activityId
		);
	}
}
