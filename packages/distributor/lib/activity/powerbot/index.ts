import { PowerBotActivityHandlerBase } from '../base-handler';
import { IMQ } from '../../mq';
import { IDataPersist } from '../../models';
import { ICache } from '../../cache';
export class PowerBotActivityHandler extends PowerBotActivityHandlerBase {
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
