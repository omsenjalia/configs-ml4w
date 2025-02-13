/**
 * @file This file exports a class that implements the InferenceExtension interface from the @janhq/core package.
 * The class provides methods for initializing and stopping a model, and for making inference requests.
 * It also subscribes to events emitted by the @janhq/core package and handles new message requests.
 * @version 1.0.0
 * @module inference-extension/src/index
 */
import { Model, LocalOAIEngine } from '@janhq/core';
import PQueue from 'p-queue';
export declare enum Settings {
    n_parallel = "n_parallel",
    cont_batching = "cont_batching",
    caching_enabled = "caching_enabled",
    flash_attn = "flash_attn",
    cache_type = "cache_type",
    use_mmap = "use_mmap",
    cpu_threads = "cpu_threads"
}
/**
 * A class that implements the InferenceExtension interface from the @janhq/core package.
 * The class provides methods for initializing and stopping a model, and for making inference requests.
 * It also subscribes to events emitted by the @janhq/core package and handles new message requests.
 */
export default class JanInferenceCortexExtension extends LocalOAIEngine {
    nodeModule: string;
    queue: PQueue<import("p-queue/dist/priority-queue").default, import("p-queue").QueueAddOptions>;
    provider: string;
    shouldReconnect: boolean;
    /** Default Engine model load settings */
    n_parallel: number;
    cont_batching: boolean;
    caching_enabled: boolean;
    flash_attn: boolean;
    use_mmap: boolean;
    cache_type: string;
    cpu_threads?: number;
    /**
     * The URL for making inference requests.
     */
    inferenceUrl: string;
    /**
     * Socket instance of events subscription
     */
    socket?: WebSocket;
    abortControllers: Map<string, AbortController>;
    /**
     * Subscribes to events emitted by the @janhq/core package.
     */
    onLoad(): Promise<void>;
    onUnload(): Promise<void>;
    onSettingUpdate<T>(key: string, value: T): void;
    loadModel(model: Model & {
        file_path?: string;
    }): Promise<void>;
    unloadModel(model: Model): Promise<void>;
    /**
     * Do health check on cortex.cpp
     * @returns
     */
    private healthz;
    /**
     * Set default engine variant on launch
     */
    private setDefaultEngine;
    /**
     * Clean cortex processes
     * @returns
     */
    private clean;
    /**
     * Subscribe to cortex.cpp websocket events
     */
    private subscribeToEvents;
}
