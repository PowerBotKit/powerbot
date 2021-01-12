// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { promisify } from 'util';
import { ICache } from './index';

import { BotKitLogger } from '@powerbotkit/core';
import { createClient, RedisClient } from 'redis';

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
				BotKitLogger.getLogger().info('Redis Cache connection established!');
				resolve();
			});
			client.on('error', err => {
				BotKitLogger.getLogger().error(err);
				reject(err);
			});
		});
	}

	public async lock(key: string, value: string) {
		return this.client.set(key, value, 'EX', this.lockTime, 'NX');
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
				BotKitLogger.getLogger().error('redis unlock error: ', err);
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
