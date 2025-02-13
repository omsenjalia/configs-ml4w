import { SystemInformation } from '@janhq/core/node';
/**
 * Initializes a engine subprocess to load a machine learning model.
 * @param params - The model load settings.
 */
declare function loadModel(params: any, systemInfo?: SystemInformation): Promise<{
    error: Error | undefined;
}>;
/**
 * Stops a Engine subprocess.
 */
declare function unloadModel(): Promise<void>;
declare const _default: {
    supportedPlatform: () => string[];
    supportedGpuArch: () => string[];
    decompressRunner: (zipPath: string, output: string) => Promise<void>;
    loadModel: typeof loadModel;
    unloadModel: typeof unloadModel;
    dispose: typeof unloadModel;
};
export default _default;
