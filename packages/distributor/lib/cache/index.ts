/**
 * A interface for cache features, you can implement this interface to integrate your k-v cache system
 */
export interface ICache {
	client: any;
	lockTime: number;
	init(): Promise<void>;
	set(key: string, value: any, expireTime?: number): Promise<void>;
	get(key: string): Promise<any>;
	delete(key: string): Promise<void>;
	lock(key: string, value: any): Promise<any>;
	unlock(key: string, expireTime?: number): Promise<void>;
}

export * from './redis-cache';
