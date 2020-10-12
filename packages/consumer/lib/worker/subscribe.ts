
interface WorkerSubscribe {
    subscribe(topic: string): Promise<void>
}