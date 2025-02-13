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
exports.deleteModelFiles = void 0;
const core_1 = require("@janhq/core");
const model_json_1 = require("./model-json");
const deleteModelFiles = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const models = yield (0, model_json_1.scanModelsFolder)();
        const dirPath = (_a = models.find((e) => e.id === id)) === null || _a === void 0 ? void 0 : _a.file_path;
        // remove model folder directory
        if (dirPath)
            yield core_1.fs.rm(yield (0, core_1.dirName)(dirPath));
    }
    catch (err) {
        console.error(err);
    }
});
exports.deleteModelFiles = deleteModelFiles;
