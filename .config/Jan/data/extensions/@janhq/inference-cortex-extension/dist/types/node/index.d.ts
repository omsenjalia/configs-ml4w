import { SystemInformation } from '@janhq/core/node';
/**
 * Spawns a Nitro subprocess.
 * @returns A promise that resolves when the Nitro subprocess is started.
 */
declare function run(systemInfo?: SystemInformation): Promise<any>;
/**
 * Every module should have a dispose function
 * This will be called when the extension is unloaded and should clean up any resources
 * Also called when app is closed
 */
declare function dispose(): void;
/**
 * Cortex process info
 */
export interface CortexProcessInfo {
    isRunning: boolean;
}
declare const _default: {
    run: typeof run;
    dispose: typeof dispose;
    engineVariant: (gpuSetting?: import("@janhq/core/node").GpuSetting) => Promise<string>;
};
export default _default;
