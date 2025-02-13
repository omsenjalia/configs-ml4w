/**
 * @module tensorrt-llm-extension/src/index
 */
import { Compatibility, InstallationState, LocalOAIEngine, MessageRequest, SystemInformation, Model } from '@janhq/core';
/**
 * TensorRTLLMExtension - Implementation of LocalOAIEngine
 * @extends BaseOAILocalInferenceProvider
 * Provide pre-populated models for TensorRTLLM
 */
export default class TensorRTLLMExtension extends LocalOAIEngine {
    /**
     * Override custom function name for loading and unloading model
     * Which are implemented from node module
     */
    provider: string;
    inferenceUrl: string;
    nodeModule: string;
    private supportedGpuArch;
    compatibility(): Compatibility;
    onLoad(): Promise<void>;
    install(): Promise<void>;
    private removePopulatedModels;
    loadModel(model: Model): Promise<void>;
    installationState(): Promise<InstallationState>;
    stopInference(): Promise<void> | undefined;
    inference(data: MessageRequest): Promise<void>;
    isCompatible(info: SystemInformation): info is Required<SystemInformation> & {
        gpuSetting: {
            gpus: {
                arch: string;
            }[];
        };
    };
}
