export declare class Retrieval {
    chunkSize: number;
    chunkOverlap?: number;
    private retriever;
    private embeddingModel?;
    private textSplitter?;
    private timeWeightedVectorStore;
    private timeWeightedretriever;
    constructor(chunkSize?: number, chunkOverlap?: number);
    updateTextSplitter(chunkSize: number, chunkOverlap: number): void;
    updateEmbeddingEngine(model: string, engine: string): void;
    ingestAgentKnowledge: (filePath: string, memoryPath: string, useTimeWeighted: boolean) => Promise<any>;
    loadRetrievalAgent: (memoryPath: string) => Promise<void>;
    generateResult: (query: string, useTimeWeighted: boolean) => Promise<string>;
}
export declare const retrieval: Retrieval;
