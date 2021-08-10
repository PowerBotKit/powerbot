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

import { ICache } from '@powerbotkit/distributor';

export class MemoryCache implements ICache {
	client: Map<string, any>;
	lockTime: number;
	init(): Promise<void> {
		this.client = new Map<string, any>();
		this.lockTime = 20;

		return Promise.resolve();
	}
	set(key: string, value: any, expireTime?: number): Promise<void> {
		return new Promise(resolve => {
			this.client.set(key, value);
			if (expireTime) {
				setTimeout(() => {
					this.client.delete(key);
				}, expireTime);
			} else {
				resolve();
			}
		});
	}
	get(key: string): Promise<any> {
		const value = this.client.get(key);

		return Promise.resolve(value);
	}
	delete(key: string): Promise<void> {
		this.client.delete(key);

		return Promise.resolve();
	}
	lock(key: string, value: any): Promise<any> {
		return Promise.resolve(true);
	}
	unlock(key: string, expireTime?: number): Promise<void> {
		return Promise.resolve();
	}
}
