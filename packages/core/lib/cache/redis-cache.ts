// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-disable no-underscore-dangle,max-classes-per-file,@typescript-eslint/no-unsafe-assignment  */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { promisify } from 'util';
import { RedisClient } from 'redis';

import { BotKitLogger } from '../core/logger';
import { ICache } from './cache';

export interface IRedisCacheSerializer<T = any> {
	serialize(key: T): string;

	deserialize(value: string): T;
}

export class NoopRedisCacheSerializer implements IRedisCacheSerializer<any> {
	serialize(key: any): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return key;
	}

	deserialize(value: any) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return value;
	}
}

export class JsonRedisCacheSerializer implements IRedisCacheSerializer<any> {
	serialize(key: any): string {
		return typeof key === 'string' ? key : JSON.stringify(key);
	}

	deserialize(value: string) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return JSON.parse(value);
		} catch (e) {
			return value;
		}
	}
}

export class RedisCache implements ICache {
	private _keySerializer: IRedisCacheSerializer;

	private _valueSerializer: IRedisCacheSerializer;

	public lockTime = 60;

	public client: RedisClient;

	constructor(client: RedisClient, lockTime = 60) {
		this.client = client;
		this.lockTime = lockTime;
		this._keySerializer = new JsonRedisCacheSerializer();
		this._valueSerializer = new JsonRedisCacheSerializer();
	}

	public set keySerializer(_keySerializer: IRedisCacheSerializer) {
		this._keySerializer = _keySerializer;
	}

	public set valueSerializer(_valueSerializer: IRedisCacheSerializer) {
		this._valueSerializer = _valueSerializer;
	}

	public init(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.client.on('ready', () => {
				BotKitLogger.getLogger().info('Redis Cache connection established!');
				resolve();
			});
			this.client.info(info => {
				BotKitLogger.getLogger().info(
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					`Redis Cache connection established!:\t${info}`
				);
				if (info) {
					reject(info);
				} else {
					resolve();
				}
			});
			this.client.on('error', err => {
				BotKitLogger.getLogger().error(err);
				reject(err);
			});
		});
	}

	public async lock(key: string, value: string) {
		const k = this._keySerializer.serialize(key);
		const v = this._valueSerializer.serialize(value);

		return Promise.resolve(
			this.promisify('set')(k, v, 'NX', 'EX', this.lockTime)
		);
	}

	public async unlock(key: string, expireTime?: number) {
		const k = this._keySerializer.serialize(key);
		const value = await this.promisify('get')(k);
		let multiOp;
		if (expireTime) {
			multiOp = [
				['del', k],
				['set', k, value, 'EX', expireTime]
			];
		} else {
			multiOp = [
				['del', k],
				['set', k, value]
			];
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		this.client.multi(multiOp).exec((err, _) => {
			if (err) {
				BotKitLogger.getLogger().error('redis unlock error: ', err);
			}
		});
	}

	public async set(key: string, value: any, expireTime: number) {
		const k = this._keySerializer.serialize(key);
		const v = this._valueSerializer.serialize(value);

		if (expireTime > 0) {
			return this.promisify('set')(k, v, 'EX', expireTime);
		} else {
			BotKitLogger.getLogger().warn(
				'It is necessary to set the expiration time'
			);

			return this.promisify('set')(k, v);
		}
	}
	public async get(key: string) {
		const k = this._keySerializer.serialize(key);
		const value = await this.promisify('get')(k);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const v = this._valueSerializer.deserialize(value);

		return v;
	}
	public delete(key: string) {
		const k = this._keySerializer.serialize(key);

		return this.promisify('del')(k);
	}

	private promisify(methodName: string) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return promisify(this.client[methodName]).bind(this.client);
	}
}
