import { Intent, WildcardIntent } from '../../lib/intent';

describe('core wildcard intent unit test', () => {
	let intent: Intent;
	beforeAll(() => {
		const maps = new Map<string, string[]>();
		const testdata = ['a.b.c', 'a.b', 'a', 'a.b.d'];
		maps.set('testA', [...testdata]);
		intent = new WildcardIntent(maps);
	});
	test('should created', () => {
		expect(intent).toBeTruthy();
	});
	test('process', () => {
		const input = 'a.b.*';
		expect(intent.process(input)).toEqual('testA');
	});
});
