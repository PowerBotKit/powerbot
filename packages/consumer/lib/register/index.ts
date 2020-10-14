export interface WokerRegister {
	stack: { path: string; funcStack: Function[] }[];
	// register('SavingHours/welcomeMessage', function)
	register(path: string, service: Function);
}
