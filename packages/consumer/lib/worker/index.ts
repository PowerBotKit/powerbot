interface Worker {
	createWorker(): Worker;
	use(middleware: Function);
}
