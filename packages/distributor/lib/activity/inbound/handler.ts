// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
/* eslint-disable no-underscore-dangle */
import { ICache, IMQ } from '@powerbotkit/core';
import { IDataPersist } from '../../models/data-persist';
import { InboundHandlerBase } from './base-handler';
import {
	OnPostMembersAdded,
	OnPostMessage,
	OnPreMembersAdded,
	OnPreMessage
} from './hook';
import { IMiddlewareInbound } from './middleware';

export interface IInBoundHandlerConfig {
	publlisChannel: string;
}

const defaultInBoundHandlerConfig: IInBoundHandlerConfig = {
	publlisChannel: 'inbound'
};

export class InboundHandler extends InboundHandlerBase {
	private _inBoundHandlerConfig: IInBoundHandlerConfig;

	public set inBoundHandlerConfig(
		_inBoundHandlerConfig: IInBoundHandlerConfig
	) {
		if (this._inBoundHandlerConfig) {
			throw new Error('inBoundHandlerConfig can only be initialized once');
		}
		this._inBoundHandlerConfig = _inBoundHandlerConfig;
	}

	public get inBoundHandlerConfig() {
		return this._inBoundHandlerConfig || defaultInBoundHandlerConfig;
	}

	constructor() {
		super();
		this.onMessage(async (context, next) => {
			if ((this as unknown as OnPreMessage).onPreMessage) {
				await (this as unknown as OnPreMessage).onPreMessage(context);
			}
			await this.publish(context, this.inBoundHandlerConfig?.publlisChannel);
			await next();
			if ((this as unknown as OnPostMessage).onPostMessage) {
				await (this as unknown as OnPostMessage).onPostMessage(context);
			}
		});

		this.onMembersAdded(async (context, next) => {
			if ((this as unknown as OnPreMembersAdded).onPreMembersAdded) {
				await (this as unknown as OnPreMembersAdded).onPreMembersAdded(context);
			}
			await this.handleMemberAdded(context);
			await next();
			if ((this as unknown as OnPostMembersAdded).onPostMembersAdded) {
				await (this as unknown as OnPostMembersAdded).onPostMembersAdded(
					context
				);
			}
		});
	}

	public init(
		cache: ICache,
		publisher: IMQ,
		dataStore: IDataPersist,
		inboundMiddleware?: IMiddlewareInbound
	) {
		super.init(cache, publisher, dataStore, inboundMiddleware);
	}
}
