"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CortexAPI = void 0;
const p_queue_1 = __importDefault(require("p-queue"));
const ky_1 = __importDefault(require("ky"));
const core_1 = require("@janhq/core");
const core_2 = require("@janhq/core");
class CortexAPI {
    constructor() {
        this.queue = new p_queue_1.default({ concurrency: 1 });
        this.queue.add(() => this.healthz());
    }
    /**
     * Fetches a model detail from cortex.cpp
     * @param model
     * @returns
     */
    getModel(model) {
        return this.queue.add(() => ky_1.default
            .get(`${API_URL}/v1/models/${model}`)
            .json()
            .then((e) => this.transformModel(e)));
    }
    /**
     * Fetches models list from cortex.cpp
     * @param model
     * @returns
     */
    getModels() {
        return this.queue
            .add(() => ky_1.default.get(`${API_URL}/v1/models?limit=-1`).json())
            .then((e) => typeof e === 'object' ? e.data.map((e) => this.transformModel(e)) : []);
    }
    /**
     * Pulls a model from HuggingFace via cortex.cpp
     * @param model
     * @returns
     */
    pullModel(model, id, name) {
        return this.queue.add(() => ky_1.default
            .post(`${API_URL}/v1/models/pull`, { json: { model, id, name } })
            .json()
            .catch((e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            throw (_b = (yield ((_a = e.response) === null || _a === void 0 ? void 0 : _a.json()))) !== null && _b !== void 0 ? _b : e;
        }))
            .then());
    }
    /**
     * Imports a model from a local path via cortex.cpp
     * @param model
     * @returns
     */
    importModel(model, modelPath, name, option) {
        return this.queue.add(() => ky_1.default
            .post(`${API_URL}/v1/models/import`, {
            json: { model, modelPath, name, option },
        })
            .json()
            .catch((e) => console.debug(e)) // Ignore error
            .then());
    }
    /**
     * Deletes a model from cortex.cpp
     * @param model
     * @returns
     */
    deleteModel(model) {
        return this.queue.add(() => ky_1.default.delete(`${API_URL}/v1/models/${model}`).json().then());
    }
    /**
     * Update a model in cortex.cpp
     * @param model
     * @returns
     */
    updateModel(model) {
        return this.queue.add(() => ky_1.default
            .patch(`${API_URL}/v1/models/${model.id}`, { json: Object.assign({}, model) })
            .json()
            .then());
    }
    /**
     * Cancel model pull in cortex.cpp
     * @param model
     * @returns
     */
    cancelModelPull(model) {
        return this.queue.add(() => ky_1.default
            .delete(`${API_URL}/v1/models/pull`, { json: { taskId: model } })
            .json()
            .then());
    }
    /**
     * Check model status
     * @param model
     */
    getModelStatus(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queue
                .add(() => ky_1.default.get(`${API_URL}/v1/models/status/${model}`))
                .then((e) => true)
                .catch(() => false);
        });
    }
    /**
     * Do health check on cortex.cpp
     * @returns
     */
    healthz() {
        return ky_1.default
            .get(`${API_URL}/healthz`, {
            retry: {
                limit: 20,
                delay: () => 500,
                methods: ['get'],
            },
        })
            .then(() => { });
    }
    /**
     * Configure model pull options
     * @param body
     */
    configs(body) {
        return this.queue.add(() => ky_1.default.patch(`${API_URL}/v1/configs`, { json: body }).then(() => { }));
    }
    /**
     * TRansform model to the expected format (e.g. parameters, settings, metadata)
     * @param model
     * @returns
     */
    transformModel(model) {
        var _a, _b, _c, _d;
        model.parameters = Object.assign(Object.assign({}, (0, core_2.extractInferenceParams)(model)), model.parameters);
        model.settings = Object.assign(Object.assign({}, (0, core_1.extractModelLoadParams)(model)), model.settings);
        model.metadata = (_a = model.metadata) !== null && _a !== void 0 ? _a : {
            tags: [],
            size: (_d = (_b = model.size) !== null && _b !== void 0 ? _b : (_c = model.metadata) === null || _c === void 0 ? void 0 : _c.size) !== null && _d !== void 0 ? _d : 0,
        };
        return model;
    }
}
exports.CortexAPI = CortexAPI;
