import { BotFrameworkAdapter, ActivityHandler } from 'botbuilder';
import { IDataPersist } from '../models';
import { IMQ } from '../mq';
import { ICache } from '../cache';

export interface IBotConfig {
	appId?: string;
	appSecret?: string;
}

export interface IMiddlewareConfig {
	ListenerAdaptor?: IMQ;
	PublisherAdaptor?: IMQ;
	CacheAdaptor?: ICache;
	DataPersistAdaptor?: IDataPersist;
	InboundInterceptor?: any;
	OutboundInterceptor?: any;
}

export interface BotInstance {
	adapter: BotFrameworkAdapter;
	activityManager: ActivityHandler;
}

export interface IBotServer {
	setUpBotServer(botConfig: IBotConfig, middlewareConfig?: IMiddlewareConfig);
	listen(port?: string | number);

}