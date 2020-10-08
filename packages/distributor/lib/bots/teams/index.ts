import { BaseBot } from '../base';
import { IMQ } from '../../mq'
import { ICache } from '../../cache';
export class TeamsBot extends BaseBot {
	constructor(cache: ICache, publisher: IMQ) {
		super(cache, publisher);
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
