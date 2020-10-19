import { BotKitLogger, GDUserSession, IMQ } from '@powerbotkit/core';
import { BotFrameworkAdapter } from 'botbuilder';
import { ICache } from '../../cache';
import { OutboundHandlerBase } from './base-handler';

export class OutBoundHandler extends OutboundHandlerBase {
	constructor(outboundMiddleware?: IMiddlewareOutbound) {
		super(outboundMiddleware);
	}
	public async listen(adapter: BotFrameworkAdapter, cache: ICache, mq: IMQ) {
		mq.onSubscribed(channel => {
			BotKitLogger.getLogger().info('🚗 Subscribed to outbound broker');
		});

		mq.onMessage(async (channel, data) => {
			BotKitLogger.getLogger().info(
				'Subscriber received message in channel: ' + channel
			);
			await this.publish(adapter, cache, channel, data);
		});

		mq.subscribe('outbound');
	}
}

export interface IMiddlewareOutbound {
	process(dialog: GDUserSession): Promise<void>;
}
