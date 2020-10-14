export interface WorkerView {
	// filePath, data
	render(template: string, data: any);
}
