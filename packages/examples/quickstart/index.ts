// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { IMQ, MemoryCache } from '@powerbotkit/core';
import { createDistributorServer, IBotServerConfig, IDataPersist, IUserSession, TMiddlewareConfig } from '@powerbotkit/distributor';

const cache = new MemoryCache();

class UserSession implements IDataPersist<any> {
    client: any;
    private _dto: IUserSession;
    init(): Promise<void> {
        console.log('init UserSession')
        return;
    }
    insertUserSession(dto: IUserSession): void {
        console.log('insert UserSession', dto)
        this._dto = dto;
        return;
    }
    findUserSession(where: any): Promise<IUserSession> {
        return Promise.resolve(this._dto);
    }

}

class MemoryMQ implements IMQ<any> {
    client: any;
    init(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    publish(channel: string, data: string): boolean {
        throw new Error('Method not implemented.');
    }
    subscribe(channel: string): void {
        throw new Error('Method not implemented.');
    }
    onSubscribed(cb: (channel: string) => void): void {
        throw new Error('Method not implemented.');
    }
    onMessage(cb: (channel: string, data: any) => Promise<void>): void {
        throw new Error('Method not implemented.');
    }
    
}

(async () => {
    const config: IBotServerConfig = {
        botConfig: {
            appId: '',
            appSecret: ''
        },
        channelConfig: {
            inboundChannel: 'indound',
            outboundChannel: 'outound'
        }
    };

    const userSessionStore = new UserSession();
    const middlewareConfig: TMiddlewareConfig = {
        dataPersistAdaptor: userSessionStore,
        cacheAdaptor: cache,
        listenerAdaptor: listener,
		publisherAdaptor: publisher
    }
    const server = await createDistributorServer(config);
    server.listen();
})();
