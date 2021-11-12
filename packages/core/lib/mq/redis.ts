// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { RedisClient } from 'redis';
import { BotKitLogger } from '../core';
import { IMQ } from './mq';

export class RedisMQ implements IMQ<RedisClient> {
	private logger = BotKitLogger.getLogger();

	public client: RedisClient;

	constructor(client: RedisClient) {
		this.client = client;
	}

	public async init(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.client.on('ready', () => {
				BotKitLogger.getLogger().info('Redis MQ connection established!');
				resolve();
			});
			this.client.info(info => {
				BotKitLogger.getLogger().info(
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					`Redis MQ connection established!:\t${info}`
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
	public publish(channel: string, data: string) {
		const result = this.client.publish(channel, data);
		this.logger.debug(
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			`publish ${data} to channel: ${channel}, result is ${result}`
		);

		return result;
	}

	public subscribe(channel: string) {
		return this.client.subscribe(channel);
	}

	public onSubscribed(callback: (channel: string) => void) {
		this.client.on('subscribe', (channel: string) => callback(channel));
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async onMessage(
		callback: (channel: string, data: any) => Promise<void>
	) {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		this.client.on('message', async (channel, data: any): Promise<void> => {
			this.logger.debug(
				`received message channel: ${channel}, data is ${
					typeof data === 'string' ? data : JSON.stringify(data)
				}`
			);

			return callback(channel, data);
		});
	}
}
