import { ICache } from './index';
import { promisify } from 'util';

import { logger } from '@powerbotkit/core';
import { RedisClient, createClient } from 'redis';

export interface IRedisCacheConfig {
	port?: number;
	host?: string;
	password?: string;
}

const defaultRedisCacheConfig: IRedisCacheConfig = {
	port: 6379,
	host: '127.0.0.1'
};

export class RedisCache implements ICache {
	public lockTime: number = 60;

	private config: IRedisCacheConfig;

	public client: RedisClient;

	constructor(config?: IRedisCacheConfig) {
		this.config = { ...config, ...defaultRedisCacheConfig };
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
	}

	public async lock(key: string, value: any) {
		return await this.client.set(key, value, 'EX', this.lockTime, 'NX');
	}

	public async unlock(key: string, expireTime?: number) {
		const value = await this.promisify('get')(key);
		let multiOp;
		if (expireTime) {
			multiOp = [
				['del', key],
				['set', key, value, 'EX', expireTime]
			];
		} else {
			multiOp = [
				['del', key],
				['set', key, value]
			];
		}
		this.client.multi(multiOp).exec((err, _) => {
			if (err) {
				logger.error('redis unlock error: ', err);
			}
		});
	}

	public async set(key: string, value: any, expireTime: number) {
		if (expireTime) {
			return this.promisify('set')(
				key,
				JSON.stringify(value),
				'EX',
				expireTime
			);
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
