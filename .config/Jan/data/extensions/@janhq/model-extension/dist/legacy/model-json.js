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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelJsonPath = exports.scanModelsFolder = void 0;
const core_1 = require("@janhq/core");
//// LEGACY MODEL FOLDER ////
const LocalEngines = [
    core_1.InferenceEngine.cortex,
    core_1.InferenceEngine.cortex_llamacpp,
    core_1.InferenceEngine.cortex_tensorrtllm,
    core_1.InferenceEngine.cortex_onnx,
    core_1.InferenceEngine.nitro_tensorrt_llm,
    core_1.InferenceEngine.nitro,
];
/**
 * Scan through models folder and return downloaded models
 * @returns
 */
const scanModelsFolder = () => __awaiter(void 0, void 0, void 0, function* () {
    const _homeDir = 'file://models';
    try {
        if (!(yield core_1.fs.existsSync(_homeDir))) {
            console.debug('Model folder not found');
            return [];
        }
        const files = yield core_1.fs.readdirSync(_homeDir);
        const allDirectories = [];
        for (const modelFolder of files) {
            const fullModelFolderPath = yield (0, core_1.joinPath)([_homeDir, modelFolder]);
            if (!(yield core_1.fs.fileStat(fullModelFolderPath)).isDirectory)
                continue;
            allDirectories.push(modelFolder);
        }
        const readJsonPromises = allDirectories.map((dirName) => __awaiter(void 0, void 0, void 0, function* () {
            // filter out directories that don't match the selector
            // read model.json
            const folderFullPath = yield (0, core_1.joinPath)([_homeDir, dirName]);
            const jsonPath = yield (0, exports.getModelJsonPath)(folderFullPath);
            if (jsonPath && (yield core_1.fs.existsSync(jsonPath))) {
                // if we have the model.json file, read it
                let model = yield core_1.fs.readFileSync(jsonPath, 'utf-8');
                model = typeof model === 'object' ? model : JSON.parse(model);
                // This to ensure backward compatibility with `model.json` with `source_url`
                if (model['source_url'] != null) {
                    model['sources'] = [
                        {
                            filename: model.id,
                            url: model['source_url'],
                        },
                    ];
                }
                model.file_path = jsonPath;
                model.file_name = 'model.json';
                // Check model file exist
                // model binaries (sources) are absolute path & exist (symlinked)
                const existFiles = yield Promise.all(model.sources.map((source) => 
                // Supposed to be a local file url
                !source.url.startsWith(`http://`) &&
                    !source.url.startsWith(`https://`)));
                if (!LocalEngines.includes(model.engine) ||
                    existFiles.every((exist) => exist))
                    return model;
                const result = yield core_1.fs
                    .readdirSync(yield (0, core_1.joinPath)([_homeDir, dirName]))
                    .then((files) => {
                    var _a, _b, _c;
                    // Model binary exists in the directory
                    // Model binary name can match model ID or be a .gguf file and not be an incompleted model file
                    return (files.includes(dirName) || // Legacy model GGUF without extension
                        ((_a = files.filter((file) => {
                            return (file.toLowerCase().endsWith('.gguf') || // GGUF
                                file.toLowerCase().endsWith('.engine') // Tensort-LLM
                            );
                        })) === null || _a === void 0 ? void 0 : _a.length) >=
                            (model.engine === core_1.InferenceEngine.nitro_tensorrt_llm
                                ? 1
                                : ((_c = (_b = model.sources) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 1)));
                });
                if (result)
                    return model;
                else
                    return undefined;
            }
        }));
        const results = yield Promise.allSettled(readJsonPromises);
        const modelData = results
            .map((result) => {
            if (result.status === 'fulfilled' && result.value) {
                try {
                    const model = typeof result.value === 'object'
                        ? result.value
                        : JSON.parse(result.value);
                    return model;
                }
                catch (_a) {
                    console.debug(`Unable to parse model metadata: ${result.value}`);
                }
            }
            return undefined;
        })
            .filter((e) => !!e);
        return modelData;
    }
    catch (err) {
        console.error(err);
        return [];
    }
});
exports.scanModelsFolder = scanModelsFolder;
/**
 * Retrieve the model.json path from a folder
 * @param folderFullPath
 * @returns
 */
const getModelJsonPath = (folderFullPath) => __awaiter(void 0, void 0, void 0, function* () {
    // try to find model.json recursively inside each folder
    if (!(yield core_1.fs.existsSync(folderFullPath)))
        return undefined;
    const files = yield core_1.fs.readdirSync(folderFullPath);
    if (files.length === 0)
        return undefined;
    if (files.includes('model.json')) {
        return (0, core_1.joinPath)([folderFullPath, 'model.json']);
    }
    // continue recursive
    for (const file of files) {
        const path = yield (0, core_1.joinPath)([folderFullPath, file]);
        const fileStats = yield core_1.fs.fileStat(path);
        if (fileStats.isDirectory) {
            const result = yield (0, exports.getModelJsonPath)(path);
            if (result)
                return result;
        }
    }
});
exports.getModelJsonPath = getModelJsonPath;
//// END LEGACY MODEL FOLDER ////
