import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function readYamlFromFilePath<T>(
	path: string,
	charset: BufferEncoding = 'utf-8'
): T {
	const fileContents = fs.readFileSync(path, charset);

	return yaml.safeLoad(fileContents) as T;
}
