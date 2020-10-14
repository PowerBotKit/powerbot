import { BotFrameworkAdapter, ActivityHandler } from 'botbuilder';
import { IDataPersist } from '../models';
import { IMQ } from '@powerbotkit/core';
import { ICache } from '../cache';
import { IMiddlewareInbound } from '../../lib/activity/inbound';
import { IMiddlewareOutbound } from '../../lib/activity/outbound';

export type TBotConfig = {
	appId?: string;
	appSecret?: string;
};

export type TMiddlewareConfig = {
	ListenerAdaptor?: IMQ;
	PublisherAdaptor?: IMQ;
	CacheAdaptor?: ICache;
	DataPersistAdaptor?: IDataPersist;
	InboundInterceptor?: IMiddlewareInbound;
	OutboundInterceptor?: IMiddlewareOutbound;
};

export interface BotInstance {
	adapter: BotFrameworkAdapter;
	activityManager: ActivityHandler;
}

export interface IBotServer {
	setUpBotServer(botConfig: TBotConfig, middlewareConfig?: TMiddlewareConfig);
	listen(port?: string | number);
}

export * from './distributor-server';
