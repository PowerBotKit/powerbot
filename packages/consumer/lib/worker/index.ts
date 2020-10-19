import {
	BotKitLogger,
	Event,
	GDUserSession,
	InitiatorType,
	MessageInput,
	MessageOutput,
	MessageType
} from '@powerbotkit/core';

export interface IBotWorker {
	process(dialog: GDUserSession): Promise<GDUserSession>;
	redirect(dialog: GDUserSession): Promise<void>;
}

export class BaseWorker implements IBotWorker {
	defaultService: string;
	constructor(defaultService: string) {
		BotKitLogger.getLogger().info('Init the Base Worker');
		this.defaultService = defaultService || 'dummyService';
	}
	async process(dialog: GDUserSession): Promise<GDUserSession> {
		BotKitLogger.getLogger().info('Start Base Bot Worker');
		await this.redirect(dialog);

		return dialog;
	}

	getUserInput(dialog: GDUserSession): MessageInput {
		return dialog.input;
	}

	setService(serviceName: string, dialog: GDUserSession) {
		dialog.service = serviceName;
	}

	setDefaultService(serviceName: string) {
		this.defaultService = serviceName;
	}

	async redirect(dialog: GDUserSession) {
		const func: Function = this[dialog.service || this.defaultService];
		const output: MessageOutput = await func(dialog);
		this.setBotOutput(output, dialog);
	}

	dummyService(dialog: GDUserSession): MessageOutput {
		BotKitLogger.getLogger().info('Start dummy service:' + dialog.input.value);

		return {
			type: MessageType.text,
			value: 'dummy message for test'
		};
	}

	setBotOutput(output: MessageOutput, dialog: GDUserSession): void {
		dialog.output = output;
		const event: Event = {
			initiator: InitiatorType.bot,
			type: output.type,
			value: output.value,
			timestamp: new Date()
		};
		dialog.history.push(event);
	}
}
