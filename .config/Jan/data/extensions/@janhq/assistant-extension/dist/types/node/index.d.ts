export declare function toolRetrievalUpdateTextSplitter(chunkSize: number, chunkOverlap: number): void;
export declare function toolRetrievalIngestNewDocument(thread: string, file: string, model: string, engine: string, useTimeWeighted: boolean): Promise<any>;
export declare function toolRetrievalLoadThreadMemory(threadId: string): Promise<void>;
export declare function toolRetrievalQueryResult(query: string, useTimeWeighted?: boolean): Promise<string | void>;
