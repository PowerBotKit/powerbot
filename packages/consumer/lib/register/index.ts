export interface WorkerRegister {
	stack: { path: string; funcStack: Function[] }[];
	// register('SavingHours/welcomeMessage', function)
	register(path: string, service: Function);
}
