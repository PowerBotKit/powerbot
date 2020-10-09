// tslint:disable-next-line: no-console
import { GDUserSession, MessageType } from '@powerbotkit/core';

export class TestWorker {
	public static async listen() {
		const subscriber = require('redis').createClient();
		subscriber.on('message', async (channel, data: string) => {
			const dialog: GDUserSession = JSON.parse(data);
			dialog.output.value = `echo: ${dialog.input.value}`;
			dialog.output.value = MessageType.text;
			this.sendToOutbound(JSON.stringify(dialog));
		});
		subscriber.subscribe('inbound');
	}

	public static sendToOutbound(message: string) {
		const redisCli = require('redis').createClient();
		redisCli.publish('outbound', message);
	}
}

TestWorker.listen();
