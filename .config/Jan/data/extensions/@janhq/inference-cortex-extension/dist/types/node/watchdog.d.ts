import { EventEmitter } from 'events';
interface WatchdogOptions {
    cwd?: string;
    restartDelay?: number;
    maxRestarts?: number;
    env?: NodeJS.ProcessEnv;
}
export declare class ProcessWatchdog extends EventEmitter {
    private command;
    private args;
    private options;
    private process;
    private restartDelay;
    private maxRestarts;
    private restartCount;
    private isTerminating;
    constructor(command: string, args: string[], options?: WatchdogOptions);
    start(): void;
    private spawnProcess;
    private restartProcess;
    terminate(): void;
}
export {};
