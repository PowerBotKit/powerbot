import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import { IDataPersist, IUserSession } from '.';

export class LowDBDataPersist implements IDataPersist {
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
