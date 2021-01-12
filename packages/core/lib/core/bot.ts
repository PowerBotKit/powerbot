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

import { ConversationReference } from 'botbuilder';

export interface GDWorker {
	workerName: string;
	topic: string;
}

export interface GDUser {
	email?: string;
	username?: string;
}

export enum MessageAction {
	update,
	cancel,
	delete
}

export enum MessageType {
	card,
	text
}

export interface MessageInput {
	type: MessageType;
	action?: MessageAction;
	value: string | any;
}

export interface MessageOutput {
	type: MessageType;
	action?: MessageAction;
	value: string | any;
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
}

/**
 * A interface for PubSub features, you can implement this interface to integrate your Message Queue tool
 */
export interface IMQ {
	client: any;
	init(): Promise<void>;
	publish(channel: string, data: string): boolean;
	subscribe(channel: string): void;
	onSubscribed(cb: (channel: string) => void): void;
	onMessage(cb: (channel: string, data: any) => Promise<void>): void;
}

export class CoreSessionUtil {
	public static addHistory(
		session: GDUserSession,
		initiatorType: InitiatorType,
		messageType: MessageType,
		value: string
	) {
		const event: Event = {
			initiator: initiatorType,
			type: messageType,
			value,
			timestamp: new Date()
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
