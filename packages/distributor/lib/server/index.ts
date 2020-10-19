import { IMQ } from '@powerbotkit/core';
import { ActivityHandler, BotFrameworkAdapter } from 'botbuilder';
import { IMiddlewareInbound } from '../../lib/activity/inbound';
import { IMiddlewareOutbound } from '../../lib/activity/outbound';
import { ICache } from '../cache';
import { IDataPersist } from '../models';

export interface TBotConfig {
	appId?: string;
	appSecret?: string;
}

export interface TMiddlewareConfig {
	ListenerAdaptor?: IMQ;
	PublisherAdaptor?: IMQ;
	CacheAdaptor?: ICache;
	DataPersistAdaptor?: IDataPersist;
	InboundInterceptor?: IMiddlewareInbound;
	OutboundInterceptor?: IMiddlewareOutbound;
}

export interface BotInstance {
	adapter: BotFrameworkAdapter;
	activityManager: ActivityHandler;
}

export interface IBotServer {
	setUpBotServer(botConfig: TBotConfig, middlewareConfig?: TMiddlewareConfig);
	listen(port?: string | number);
}

export * from './distributor-server';
