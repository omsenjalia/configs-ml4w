"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrievalTool = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@janhq/core");
class RetrievalTool extends core_1.InferenceTool {
    constructor() {
        super(...arguments);
        this._threadDir = 'file://threads';
        this.retrievalThreadId = undefined;
        this.name = 'retrieval';
    }
    process(data, tool) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            if (!data.model || !data.messages) {
                return Promise.resolve(data);
            }
            const latestMessage = data.messages[data.messages.length - 1];
            // 1. Ingest the document if needed
            if (latestMessage &&
                latestMessage.content &&
                typeof latestMessage.content !== 'string' &&
                latestMessage.content.length > 1) {
                const docFile = (_b = (_a = latestMessage.content[1]) === null || _a === void 0 ? void 0 : _a.doc_url) === null || _b === void 0 ? void 0 : _b.url;
                if (docFile) {
                    yield (0, core_1.executeOnMain)(NODE, 'toolRetrievalIngestNewDocument', (_c = data.thread) === null || _c === void 0 ? void 0 : _c.id, docFile, (_d = data.model) === null || _d === void 0 ? void 0 : _d.id, (_e = data.model) === null || _e === void 0 ? void 0 : _e.engine, (_f = tool === null || tool === void 0 ? void 0 : tool.useTimeWeightedRetriever) !== null && _f !== void 0 ? _f : false);
                }
                else {
                    return Promise.resolve(data);
                }
            }
            else if (
            // Check whether we need to ingest document or not
            // Otherwise wrong context will be sent
            !(yield core_1.fs.existsSync(yield (0, core_1.joinPath)([this._threadDir, data.threadId, 'memory'])))) {
                // No document ingested, reroute the result to inference engine
                return Promise.resolve(data);
            }
            // 2. Load agent on thread changed
            if (this.retrievalThreadId !== data.threadId) {
                yield (0, core_1.executeOnMain)(NODE, 'toolRetrievalLoadThreadMemory', data.threadId);
                this.retrievalThreadId = data.threadId;
                // Update the text splitter
                yield (0, core_1.executeOnMain)(NODE, 'toolRetrievalUpdateTextSplitter', (_h = (_g = tool === null || tool === void 0 ? void 0 : tool.settings) === null || _g === void 0 ? void 0 : _g.chunk_size) !== null && _h !== void 0 ? _h : 4000, (_k = (_j = tool === null || tool === void 0 ? void 0 : tool.settings) === null || _j === void 0 ? void 0 : _j.chunk_overlap) !== null && _k !== void 0 ? _k : 200);
            }
            // 3. Using the retrieval template with the result and query
            if (latestMessage.content) {
                const prompt = typeof latestMessage.content === 'string'
                    ? latestMessage.content
                    : latestMessage.content[0].text;
                // Retrieve the result
                const retrievalResult = yield (0, core_1.executeOnMain)(NODE, 'toolRetrievalQueryResult', prompt, (_l = tool === null || tool === void 0 ? void 0 : tool.useTimeWeightedRetriever) !== null && _l !== void 0 ? _l : false);
                console.debug('toolRetrievalQueryResult', retrievalResult);
                // Update message content
                if (retrievalResult)
                    data.messages[data.messages.length - 1].content =
                        (_o = (_m = tool === null || tool === void 0 ? void 0 : tool.settings) === null || _m === void 0 ? void 0 : _m.retrieval_template) === null || _o === void 0 ? void 0 : _o.replace('{CONTEXT}', retrievalResult).replace('{QUESTION}', prompt);
            }
            // 4. Reroute the result to inference engine
            return Promise.resolve(this.normalize(data));
        });
    }
    // Filter out all the messages that are not text
    // TODO: Remove it until engines can handle multiple content types
    normalize(request) {
        var _a;
        request.messages = (_a = request.messages) === null || _a === void 0 ? void 0 : _a.map((message) => {
            var _a;
            if (message.content &&
                typeof message.content !== 'string' &&
                ((_a = message.content.length) !== null && _a !== void 0 ? _a : 0) > 0) {
                return Object.assign(Object.assign({}, message), { content: [message.content[0]] });
            }
            return message;
        });
        return request;
    }
}
exports.RetrievalTool = RetrievalTool;
//# sourceMappingURL=retrieval.js.map