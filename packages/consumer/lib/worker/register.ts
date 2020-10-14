import { WorkerMiddleware } from './middleware';

export interface WokerRegister {
	stack: { path: string; funcStack: Function[] }[];
	// register('SavingHours/welcomeMessage', function)
	register(path: string, middleware: WorkerMiddleware, operation: Function);
}
