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
exports.downloadModel = void 0;
const core_1 = require("@janhq/core");
const downloadModel = (model, gpuSettings, network) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const homedir = 'file://models';
    const supportedGpuArch = ['ampere', 'ada'];
    // Create corresponding directory
    const modelDirPath = yield (0, core_1.joinPath)([homedir, model.id]);
    if (!(yield core_1.fs.existsSync(modelDirPath)))
        yield core_1.fs.mkdir(modelDirPath);
    const jsonFilePath = yield (0, core_1.joinPath)([modelDirPath, 'model.json']);
    // Write model.json on download
    if (!(yield core_1.fs.existsSync(jsonFilePath)))
        yield core_1.fs.writeFileSync(jsonFilePath, JSON.stringify(model, null, 2));
    if (model.engine === core_1.InferenceEngine.nitro_tensorrt_llm) {
        if (!gpuSettings || gpuSettings.gpus.length === 0) {
            console.error('No GPU found. Please check your GPU setting.');
            return;
        }
        const firstGpu = gpuSettings.gpus[0];
        if (!firstGpu.name.toLowerCase().includes('nvidia')) {
            console.error('No Nvidia GPU found. Please check your GPU setting.');
            return;
        }
        const gpuArch = firstGpu.arch;
        if (gpuArch === undefined) {
            console.error('No GPU architecture found. Please check your GPU setting.');
            return;
        }
        if (!supportedGpuArch.includes(gpuArch)) {
            console.debug(`Your GPU: ${JSON.stringify(firstGpu)} is not supported. Only 30xx, 40xx series are supported.`);
            return;
        }
        const os = 'windows'; // TODO: remove this hard coded value
        const newSources = model.sources.map((source) => {
            const newSource = Object.assign({}, source);
            newSource.url = newSource.url
                .replace(/<os>/g, os)
                .replace(/<gpuarch>/g, gpuArch);
            return newSource;
        });
        model.sources = newSources;
    }
    console.debug(`Download sources: ${JSON.stringify(model.sources)}`);
    if (model.sources.length > 1) {
        // path to model binaries
        for (const source of model.sources) {
            let path = extractFileName(source.url, '.gguf');
            if (source.filename) {
                path = yield (0, core_1.joinPath)([modelDirPath, source.filename]);
            }
            const downloadRequest = {
                url: source.url,
                localPath: path,
                modelId: model.id,
            };
            (0, core_1.downloadFile)(downloadRequest, network);
        }
    }
    else {
        const fileName = extractFileName((_a = model.sources[0]) === null || _a === void 0 ? void 0 : _a.url, '.gguf');
        const path = yield (0, core_1.joinPath)([modelDirPath, fileName]);
        const downloadRequest = {
            url: (_b = model.sources[0]) === null || _b === void 0 ? void 0 : _b.url,
            localPath: path,
            modelId: model.id,
        };
        (0, core_1.downloadFile)(downloadRequest, network);
    }
});
exports.downloadModel = downloadModel;
/**
 *  try to retrieve the download file name from the source url
 */
function extractFileName(url, fileExtension) {
    if (!url)
        return fileExtension;
    const extractedFileName = url.split('/').pop();
    const fileName = extractedFileName.toLowerCase().endsWith(fileExtension)
        ? extractedFileName
        : extractedFileName + fileExtension;
    return fileName;
}
