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
