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

import { BotKitLogger } from '@powerbotkit/core';
import * as fs from 'fs';
import { Intent } from './intent';

export interface IJsonIntentConfig {
	type: 'json';
	intents: {
		name: string;
		service: string;
	}[];
}

export class JsonIntent implements Intent {
	private maps: Map<string, string>;

	constructor(filePath: string) {
		this.readJson(filePath);
	}

	process(input: string): string {
		return this.maps.get(input);
	}

	processAsync(input: string): Promise<string> {
		return Promise.resolve(this.maps.get(input));
	}

	readJson(filePath: string) {
		if (this.maps === null || this.maps === undefined) {
			this.maps = new Map<string, string>();
		}
		const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
		try {
			const data = JSON.parse(fileContent) as IJsonIntentConfig;
			if (data?.intents?.length > 0) {
				data.intents.forEach(intent => {
					this.maps.set(intent.name, intent.service);
				});
			}
		} catch (e) {
			BotKitLogger.getLogger().error(e);
		}
	}
}
