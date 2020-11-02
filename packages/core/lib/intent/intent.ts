export interface Intent {
	process(input: string): string;

	processAsync(input: string): Promise<string>;
}

export interface IntentYAMLBaseConfig {
	version: string | number;
	locale?: string;
	language?: string;
}

export interface IntentYAMLWildcardConfig {
	type: 'wildcard';
	intents: {
		[key: string]: [string];
	};
}

export type IntentYAMLConfig = IntentYAMLBaseConfig & IntentYAMLWildcardConfig;
