import {
	InitiatorType,
	GDUserSession,
	MessageType,
	CoreSessionUtil
} from '@powerbotkit/core';

export abstract class BaseService {
	public addHistory(
		session: GDUserSession,
		initiatorType: InitiatorType,
		messageType: MessageType,
		value: string
	) {
		return CoreSessionUtil.addHistory(
			session,
			initiatorType,
			messageType,
			value
		);
	}
	public cleanHistory(session: GDUserSession) {
		return CoreSessionUtil.cleanHistory(session);
	}
	public abstract async process(session: GDUserSession): Promise<void>;
}
