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

import { JSONFile, Low } from 'lowdb';
import { IDataPersist, IUserSession } from '.';

export class LowDBDataPersist implements IDataPersist {
	public client: Low<any>;
	public async init() {
		const adapter = new JSONFile('db.json');
		this.client = new Low(adapter);
		// TODO: identify db.json is empty
		this.client.data ||= { usersSession: [] };
		await this.client.write();
	}

	public async insertUserSession(dto: IUserSession) {
		await this.client.read();
		const { usersSession } = this.client.data;
		usersSession.push(dto);
		await this.client.write();
	}

	public async findUserSession(where: any): Promise<IUserSession> {
		await this.client.read();
		const { usersSession } = this.client.data;

		return (usersSession as any[]).find(where);
	}
}
