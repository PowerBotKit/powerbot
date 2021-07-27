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

import { IMQ } from '@powerbotkit/core';
import { GDUserSession } from '@powerbotkit/core';
import { ICache } from '../../cache';
import { IDataPersist } from '../../models';
import { InboundHandlerBase } from './base-handler';
export class InboundHandler extends InboundHandlerBase {
	constructor() {
		super();
		this.onMessage(async (context, next) => {
			await this.publish(context);
			await next();
		});

		this.onMembersAdded(async (context, next) => {
			await this.handleMemberAdded(context);
			await next();
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

export interface IMiddlewareInbound {
	process(dialog: GDUserSession): Promise<void>;
}

export * from './base-handler';
