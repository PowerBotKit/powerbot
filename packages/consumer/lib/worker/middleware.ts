export interface WorkerMiddleware {
	// init(input: GDUserSession, ouput: GDUserSession, next: any):
	outputMiddleware: Function;
	inputMiddleware: Function;
}
