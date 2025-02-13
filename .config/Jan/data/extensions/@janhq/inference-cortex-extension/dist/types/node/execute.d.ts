import { GpuSetting } from '@janhq/core/node';
export interface CortexExecutableOptions {
    enginePath: string;
    executablePath: string;
    cudaVisibleDevices: string;
    vkVisibleDevices: string;
}
/**
 * The executable options for the cortex.cpp extension.
 */
export declare const executableCortexFile: (gpuSetting?: GpuSetting) => CortexExecutableOptions;
/**
 * Find which variant to run based on the current platform.
 */
export declare const engineVariant: (gpuSetting?: GpuSetting) => Promise<string>;
