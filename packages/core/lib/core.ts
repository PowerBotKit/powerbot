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
