import { BotFrameworkAdapter } from 'botbuilder';
import { OutboundHandlerBase } from './base-handler';
import { ICache } from '../../cache';
import { IMQ } from '../../mq';
import logger from '../../utils/logger';
import { GDUserSession } from '@powerbotkit/core';

export class OutBoundHandler extends OutboundHandlerBase {
	constructor(outboundMiddleware?: IMiddlewareOutbound) {
		super(outboundMiddleware);
	}
	public async listen(adapter: BotFrameworkAdapter, cache: ICache, mq: IMQ) {
		mq.onSubscribed(channel => {
			logger.info('🚗 Subscribed to outbound broker');
		});

		mq.onMessage(async (channel, data) => {
			logger.info('Subscriber received message in channel: ' + channel);
			await this.publish(adapter, cache, channel, data);
		});

		mq.subscribe('outbound');
	}
}

export interface IMiddlewareOutbound {
	process(dialog: GDUserSession): Promise<void>;
}
