// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BotKitLogger, ICache, IMQ } from '@powerbotkit/core';
import { BotFrameworkAdapter } from 'botbuilder';
import { OutboundHandlerBase } from './base-handler';
import { IMiddlewareOutbound } from './middleware';

export interface IOutBoundHandlerConfig {
	subscribeChannel: string;
}

const defaultOutBoundHandlerConfig: IOutBoundHandlerConfig = {
	subscribeChannel: 'outbound'
};

export class OutBoundHandler extends OutboundHandlerBase {
	private _outBoundHandlerConfig: IOutBoundHandlerConfig;

	public set outBoundHandlerConfig(
		_outBoundHandlerConfig: IOutBoundHandlerConfig
	) {
		if (this._outBoundHandlerConfig) {
			throw new Error('outBoundHandlerConfig can only be initialized once');
		}
		this._outBoundHandlerConfig = _outBoundHandlerConfig;
	}

	public get outBoundHandlerConfig() {
		return this._outBoundHandlerConfig || defaultOutBoundHandlerConfig;
	}

	constructor(outboundMiddleware?: IMiddlewareOutbound) {
		super(outboundMiddleware);
	}
	// eslint-disable-next-line @typescript-eslint/require-await
	public async listen(adapter: BotFrameworkAdapter, cache: ICache, mq: IMQ) {
		mq.onSubscribed(channel => {
			BotKitLogger.getLogger().info(`🚗 Subscribed to ${channel} broker`);
		});

		mq.onMessage(async (channel, data) => {
			BotKitLogger.getLogger().info(
				`Subscriber received message in channel:\t ${channel}`
			);
			await this.publish(adapter, cache, channel, data as string);
		});

		mq.subscribe(this.outBoundHandlerConfig.subscribeChannel);
	}
}
