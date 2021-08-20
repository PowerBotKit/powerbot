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

import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

import { IUserSession } from './user-session';

/**
 * a store interface user session
 */
export interface IDataPersist<T = any> {
	client: T;
	init(): Promise<void>;
	insertUserSession(dto: IUserSession): void;
	findUserSession(where: any): Promise<IUserSession>;
}

/**
 * a store class user session based on db file async
 */
export class LowDBFileAsyncDataPersist
	implements IDataPersist<lowdb.LowdbAsync>
{
	public client: lowdb.LowdbAsync<any>;
	public async init() {
		const adapter = new FileAsync('db.json');
		this.client = await lowdb(adapter);
		// TODO: identify db.json is empty
		this.client.defaults({ usersSession: [] }).write();
	}

	public async insertUserSession(dto: IUserSession) {
		return (this.client.get('usersSession') as any).push(dto).write();
	}

	public async findUserSession(where: any): Promise<IUserSession> {
		return (this.client.get('usersSession') as any).find(where).value();
	}
}
