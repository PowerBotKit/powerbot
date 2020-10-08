import { ConversationReference } from 'botbuilder';

/**
 * An object relating to maintain the relationship of user email and bot's ConversationReference
 */
export interface IUserSession {
	email: string;
	conversion: ConversationReference;
}

/**
 * A interface for data persist, you can implment this interface to integrate your data storage system
 */
export interface IDataPersist {
	client: any;
	init(): Promise<void>;
	insertUserSession(dto: IUserSession): void;
	findUserSession(where: any): Promise<IUserSession>;
}


