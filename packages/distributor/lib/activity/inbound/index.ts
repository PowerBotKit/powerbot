import { InboundHandlerBase } from './base-handler';
import { IMQ } from '../../mq';
import { IDataPersist } from '../../models';
import { ICache } from '../../cache';
import { GDUserSession } from '@powerbotkit/core';
export class InboundHandler extends InboundHandlerBase {
	constructor(cache: ICache, publisher: IMQ, dataStore: IDataPersist) {
		super(cache, publisher, dataStore);
		this.onMessage(async (context, next) => {
			await this.publish(context);
			await next();
		});

		this.onMembersAdded(async (context, next) => {
			await this.handleMemberAdded(context);
			await next();
		});
	}
}

export interface IMiddlewareInbound {
	process(dialog: GDUserSession): Promise<void>;
}
