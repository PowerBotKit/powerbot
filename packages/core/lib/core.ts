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
