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

	private doProcess(input: string): string {
		let result = null;
		this.maps.forEach((values, key) => {
			for (const value of values) {
				if (wildcard(input, value)) {
					result = key;
				}
			}
		});

		return result;
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
