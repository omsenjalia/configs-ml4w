import { AssistantTool, InferenceTool, MessageRequest } from '@janhq/core';
export declare class RetrievalTool extends InferenceTool {
    private _threadDir;
    private retrievalThreadId;
    name: string;
    process(data: MessageRequest, tool?: AssistantTool): Promise<MessageRequest>;
    normalize(request: MessageRequest): MessageRequest;
}
