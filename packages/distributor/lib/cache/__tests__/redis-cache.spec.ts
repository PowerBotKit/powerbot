// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {
	IRedisCacheSerializer,
	NoopRedisCacheSerializer
} from './../redis-cache';

describe('Redis Cache Unit Test', () => {
	describe('RedisCacheSerializer Unit Test', () => {
		describe('NoopRedisCacheSerializer Unit Test', () => {
			let serializer: IRedisCacheSerializer;
			beforeEach(() => {
				serializer = new NoopRedisCacheSerializer();
			});
			it('NoopRedisCacheSerializer serialize result', () => {
				expect(serializer.serialize(true)).toBe(true);
				expect(serializer.serialize('1')).toBe('1');
				expect(serializer.serialize(1)).toBe(1);
				expect(serializer.serialize({ a: 1 })).toEqual({ a: 1 });
			});
			it('NoopRedisCacheSerializer deserialize result', () => {
				expect((serializer as NoopRedisCacheSerializer).deserialize(true)).toBe(
					true
				);
				expect((serializer as NoopRedisCacheSerializer).deserialize('1')).toBe(
					'1'
				);
				expect((serializer as NoopRedisCacheSerializer).deserialize(1)).toBe(1);
				expect(
					(serializer as NoopRedisCacheSerializer).deserialize({ a: 1 })
				).toEqual({ a: 1 });
			});
		});
	});
});
