import { Assistant, AssistantExtension } from '@janhq/core';
export default class JanAssistantExtension extends AssistantExtension {
    private static readonly _homeDir;
    onLoad(): Promise<void>;
    /**
     * Called when the extension is unloaded.
     */
    onUnload(): void;
    createAssistant(assistant: Assistant): Promise<void>;
    getAssistants(): Promise<Assistant[]>;
    deleteAssistant(assistant: Assistant): Promise<void>;
    private createJanAssistant;
    private defaultAssistant;
}
