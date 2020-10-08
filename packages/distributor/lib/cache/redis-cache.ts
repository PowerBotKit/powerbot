import { ICache } from "./index";
import { promisify } from 'util';

import logger from '../utils/logger';
import { RedisClient, createClient } from 'redis';

export interface IRedisCacheConfig {
	port?: number;
	host?: string;
	password?: string;
}

const defaultRedisCacheConfig: IRedisCacheConfig = {
	port: 6379,
	host: '127.0.0.1',
}

export class RedisCache implements ICache {

		private config: IRedisCacheConfig;

		public client: RedisClient;

		constructor(config?: IRedisCacheConfig) {
				this.config = { ...config, ...defaultRedisCacheConfig }
		}

    public async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const client = createClient(this.config);
            client.on('ready', () => {
                this.client = client;
                logger.info('Redis Cache connection established!');
                resolve();
            });
            client.on('error', err => {
                logger.error(err);
                reject(err);
            });
        });
    };

    public async set(key: string, value: any, expireTime: number) {
        if (expireTime) {
            return this.promisify('set')(key, JSON.stringify(value), 'EX', expireTime);
        } else {
            return this.promisify('set')(key, JSON.stringify(value));
        }
    }
    public async get(key: string) {
        const result = await this.promisify('get')(key);
        return JSON.parse(result);
    }
    public delete(key: string) {
        return this.promisify('del')(key);
    }

    private promisify(methodName: string) {
        return promisify(this.client[methodName]).bind(this.client);
    }

}
