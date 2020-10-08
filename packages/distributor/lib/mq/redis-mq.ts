import { IMQ } from ".";
import logger from '../utils/logger';

import { RedisClient, createClient } from 'redis';

export class RedisMQ implements IMQ {
    public client: RedisClient;
    public async init(): Promise<void> {
        return new Promise((resolve, reject) => {
			const client = createClient({
				port: 6379,
				host: process.env.REDISCACHEHOSTNAME,
				password: process.env.REDISCACHEKEY,
				tls: null
			});
			client.on('ready', () => {
				this.client = client;
				logger.info('Redis MQ connection established!');
				resolve();
			});
			client.on('error', err => {
				logger.error(err);
				reject(err);
			});
		});
    };
    public publish(channel: string, data: string) {
        return this.client.publish(channel, data);
    };

    public subscribe(channel: string) {
        return this.client.subscribe(channel);
    }

    public onSubscribed(callback: (channel: string) => void) {
        this.client.on('subscribe', (channel: string) => {
            return callback(channel);
		});
    }

    public async onMessage(callback: (channel: string, data: any) => Promise<void>) {
        this.client.on('message', async (channel, data: any):Promise<void> => {
            return callback(channel, data);
		});
    }
}