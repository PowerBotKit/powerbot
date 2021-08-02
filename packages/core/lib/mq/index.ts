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

import { createClient, RedisClient } from 'redis';
import { BotKitLogger, IMQ } from '../core';

export class RedisMQ implements IMQ {
	public client: RedisClient;
	public async init(): Promise<void> {
		return new Promise((resolve, reject) => {
			const client = createClient({
				port: process.env.REDISCACHEHOSTNAME
					? parseInt(process.env.REDISCACHEHOSTNAME, 10)
					: 6379,
				host: process.env.REDISCACHEHOSTNAME,
				password: process.env.REDISCACHEKEY,
				tls: null
			});
			client.on('ready', () => {
				this.client = client;
				BotKitLogger.getLogger().info('Redis MQ connection established!');
				resolve();
			});
			client.on('error', err => {
				BotKitLogger.getLogger().error(err);
				reject(err);
			});
		});
	}
	public publish(channel: string, data: string) {
		return this.client.publish(channel, data);
	}

	public subscribe(channel: string) {
		return this.client.subscribe(channel);
	}

	public onSubscribed(callback: (channel: string) => void) {
		this.client.on('subscribe', (channel: string) => {
			return callback(channel);
		});
	}

	public async onMessage(
		callback: (channel: string, data: any) => Promise<void>
	) {
		this.client.on('message', async (channel, data: any): Promise<void> => {
			return callback(channel, data);
		});
	}
}
