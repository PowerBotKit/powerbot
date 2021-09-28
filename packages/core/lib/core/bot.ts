// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { Activity, ConversationReference } from 'botbuilder';

export interface GDWorker {
	workerName: string;
	topic: string;
}

export interface GDUser {
	id?: string;
	email?: string;
	/**
	 * @deprecated please use name
	 */
	username?: string;
	name?: string;
	givenName?: string;
	surname?: string;
}

export enum MessageAction {
	update,
	cancel,
	delete,
	quit
}

export enum MessageType {
	cardAdd,
	textAdd,
	cardEdit,
	textEdit,
	cardDelete,
	textDelete
}

export interface MessageInput {
	type: MessageType;
	action?: MessageAction;
	value: string | any;
	payload?: any;
}

export interface MessageOutput {
	type: MessageType;
	action?: MessageAction;
	value: string | Partial<Activity> | Partial<Activity>[];
}

export enum InitiatorType {
	bot,
	user
}

export interface Event {
	initiator: InitiatorType; // bot or user
	type: MessageType; // card or plantext
	value: string | any; // card name or user input
	timestamp: Date;
	activityId: string;
}

// TODO: need to consider move this part, because we don't want to include botbuilder dependency in core module
export interface GDUserSession {
	id: string;
	user?: GDUser;
	botConversion: Partial<ConversationReference>;
	worker?: GDWorker;
	service?: string;
	step?: number;
	input?: MessageInput;
	output?: MessageOutput;
	history?: Event[];
	replyToId?: string;
}

export class CoreSessionUtil {
	public static addHistory(
		session: GDUserSession,
		initiatorType: InitiatorType,
		messageType: MessageType,
		value: string,
		activityId: string
	) {
		const event: Event = {
			initiator: initiatorType,
			type: messageType,
			value,
			timestamp: new Date(),
			activityId: activityId || ''
		};
		if (session && session.history) {
			session.history.push(event);
		}
	}

	public static cleanHistory(session: GDUserSession) {
		if (session && session.history) {
			session.history.length = 0;
		}
	}
}
