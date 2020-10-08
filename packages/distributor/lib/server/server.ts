import * as restify from 'restify';
import { BotFrameworkAdapter } from 'botbuilder';
import logger from '../utils/logger';
import { IDataPersist } from '../models';
import { LowDBDataPersist } from '../models/low-db-model';
import { TeamsBot } from '../bots/index';
import { OutBound } from '../entrance/outbound';
import { IMQ } from '../mq'
import { ICache } from '../cache'
import { RedisMQ } from '../mq/redis-mq'
import { RedisCache } from '../cache/redis-cache'
import { BotInstance, IBotConfig, IMiddlewareConfig, IBotServer} from '.'



export class BotServer {
	// operation conversion saving
	public db?: IDataPersist;
	public cache?: ICache; // types define
	public listener?: IMQ;
	public publisher?: IMQ;
	public app?: restify.Server;
	public botInstance: BotInstance;

	public async setUpBotServer(botConfig: IBotConfig, middlewareConfig?: IMiddlewareConfig) {
		// below 3 steps need be configurable
		if(middlewareConfig && middlewareConfig.DataPersistAdaptor) {
			this.db = middlewareConfig.DataPersistAdaptor;
		} else {
			await this.setupDB();
		}

		if(middlewareConfig && middlewareConfig.CacheAdaptor) {
			this.cache = middlewareConfig.CacheAdaptor;
		} else {
			await this.setupCache();
		}
		if(middlewareConfig && middlewareConfig.ListenerAdaptor) {
			this.listener = middlewareConfig.ListenerAdaptor;
		} else {
			await this.setupListener();
		}

		if(middlewareConfig && middlewareConfig.PublisherAdaptor) {
		    this.publisher = middlewareConfig.PublisherAdaptor;
		} else {
			await this.setupPublisher();
		}

		await this.setupApp();
		await this.setupBot(botConfig);
	}

	private async setupDB() {
		this.db = new LowDBDataPersist();
		await this.db.init();
	}

	private async setupCache() {
		this.cache = new RedisCache();
		await this.cache.init();
	}

	private async setupListener() {
		this.listener = new RedisMQ();
		await this.listener.init();
	}
	private async setupPublisher() {
		this.publisher = new RedisMQ();
		await this.publisher.init();
	}

	private async setupApp() {
		this.app = restify.createServer();
		this.app.use(restify.plugins.queryParser());
	}

	private async setupBot(config: IBotConfig) {
		const adapter = new BotFrameworkAdapter({
			appId: config.appId || process.env.MicrosoftAppId,
			appPassword: config.appSecret || process.env.MicrosoftAppPassword
		});
		const activityManager = new TeamsBot(this.cache, this.publisher);
		OutBound.listen(adapter, this.cache, this.listener);
		this.app.post('/api/messages', (req, res) => {
			adapter.processActivity(req, res, async context => {
				// Route to main dialog.
				await activityManager.run(context);
			});
		});
	}

	public async listen(port?: string | number) {
		const por = port ? port : 3978;
		this.app.listen(por, '0.0.0.0', () => {
			logger.info(`✈️  Bot Server listening to ${por}`);
		});
	}
}

export const createServer = async (
	config?: IBotConfig
): Promise<IBotServer> => {
	const botServer = new BotServer();
	await botServer.setUpBotServer(config);
	return botServer;
};
