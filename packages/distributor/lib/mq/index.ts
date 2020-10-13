/**
 * A interface for PubSub features, you can implement this interface to integrate your Message Queue tool
 */
export interface IMQ {
	client: any;
	init(): Promise<void>;
	publish(channel: string, data: string);
	subscribe(channel: string): void;
	onSubscribed(cb: (channel: string) => void): void;
	onMessage(cb: (channel: string, data: any) => Promise<void>): void;
}
