import { IMQ } from '@powerbotkit/core';
import { GDUserSession } from '@powerbotkit/core';
import { ICache } from '../../cache';
import { IDataPersist } from '../../models';
import { InboundHandlerBase } from './base-handler';
export class InboundHandler extends InboundHandlerBase {
	constructor(
		cache: ICache,
		publisher: IMQ,
		dataStore: IDataPersist,
		inboundMiddleware?: IMiddlewareInbound
	) {
		super(cache, publisher, dataStore, inboundMiddleware);
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
