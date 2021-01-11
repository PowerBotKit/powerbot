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

import * as wildcard from 'wildcard';
import { Intent } from './intent';

export class WildcardIntent implements Intent {
	private maps: Map<string, string[]>;

	constructor(maps: Map<string, string[]>) {
		this.maps = maps;
	}

	public process(input: string): string {
		return this.doProcess(input);
	}

	public doProcess(input: string): string {
		const keys = this.maps.keys();
		for (const key of keys) {
			const values: string[] = this.maps[key];
			for (const value of values) {
				if (wildcard(value, input)) {
					return key;
				}
			}
		}

		return null;
	}

	public processAsync(input: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const result = this.doProcess(input);
			if (result) {
				return resolve(result);
			} else {
				reject(null);
			}
		});
	}
}
