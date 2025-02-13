"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieval = exports.Retrieval = void 0;
const tslib_1 = require("tslib");
const text_splitter_1 = require("langchain/text_splitter");
const document_1 = require("langchain/util/document");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const time_weighted_1 = require("langchain/retrievers/time_weighted");
const memory_1 = require("langchain/vectorstores/memory");
const hnswlib_1 = require("langchain/vectorstores/hnswlib");
const openai_1 = require("langchain/embeddings/openai");
class Retrieval {
    constructor(chunkSize = 4000, chunkOverlap = 200) {
        this.chunkSize = 100;
        this.chunkOverlap = 0;
        this.embeddingModel = undefined;
        this.ingestAgentKnowledge = (filePath, memoryPath, useTimeWeighted) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loader = new pdf_1.PDFLoader(filePath, {
                splitPages: true,
            });
            if (!this.embeddingModel)
                return Promise.reject();
            const doc = yield loader.load();
            const docs = yield this.textSplitter.splitDocuments(doc);
            const vectorStore = yield hnswlib_1.HNSWLib.fromDocuments(docs, this.embeddingModel);
            // add documents with metadata by using the time-weighted retriever in order to support time-weighted retrieval
            if (useTimeWeighted && this.timeWeightedretriever) {
                yield this.timeWeightedretriever.addDocuments(docs);
            }
            return vectorStore.save(memoryPath);
        });
        this.loadRetrievalAgent = (memoryPath) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.embeddingModel)
                return Promise.reject();
            const vectorStore = yield hnswlib_1.HNSWLib.load(memoryPath, this.embeddingModel);
            this.retriever = vectorStore.asRetriever(2);
            return Promise.resolve();
        });
        this.generateResult = (query, useTimeWeighted) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (useTimeWeighted) {
                if (!this.timeWeightedretriever) {
                    return Promise.resolve(' ');
                }
                // use invoke because getRelevantDocuments is deprecated
                const relevantDocs = yield this.timeWeightedretriever.invoke(query);
                const serializedDoc = (0, document_1.formatDocumentsAsString)(relevantDocs);
                return Promise.resolve(serializedDoc);
            }
            if (!this.retriever) {
                return Promise.resolve(' ');
            }
            // should use invoke(query) because getRelevantDocuments is deprecated
            const relevantDocs = yield this.retriever.getRelevantDocuments(query);
            const serializedDoc = (0, document_1.formatDocumentsAsString)(relevantDocs);
            return Promise.resolve(serializedDoc);
        });
        this.updateTextSplitter(chunkSize, chunkOverlap);
        // declare time-weighted retriever and storage
        this.timeWeightedVectorStore = new memory_1.MemoryVectorStore(new openai_1.OpenAIEmbeddings({ openAIApiKey: 'cortex-embedding' }, { basePath: 'http://127.0.0.1:39291/v1' }));
        this.timeWeightedretriever = new time_weighted_1.TimeWeightedVectorStoreRetriever({
            vectorStore: this.timeWeightedVectorStore,
            memoryStream: [],
            searchKwargs: 2,
        });
    }
    updateTextSplitter(chunkSize, chunkOverlap) {
        this.chunkSize = chunkSize;
        this.chunkOverlap = chunkOverlap;
        this.textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: chunkSize,
            chunkOverlap: chunkOverlap,
        });
    }
    updateEmbeddingEngine(model, engine) {
        this.embeddingModel = new openai_1.OpenAIEmbeddings({ openAIApiKey: 'cortex-embedding', model }, 
        // TODO: Raw settings
        { basePath: 'http://127.0.0.1:39291/v1' });
        // update time-weighted embedding model
        this.timeWeightedVectorStore.embeddings = this.embeddingModel;
    }
}
exports.Retrieval = Retrieval;
exports.retrieval = new Retrieval();
//# sourceMappingURL=retrieval.js.map