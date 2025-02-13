"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const node_1 = require("@janhq/core/node");
const execute_1 = require("./execute");
const watchdog_1 = require("./watchdog");
// The HOST address to use for the Nitro subprocess
const LOCAL_PORT = '39291';
let watchdog = undefined;
/**
 * Spawns a Nitro subprocess.
 * @returns A promise that resolves when the Nitro subprocess is started.
 */
function run(systemInfo) {
    (0, node_1.log)(`[CORTEX]:: Spawning cortex subprocess...`);
    return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a;
        let executableOptions = (0, execute_1.executableCortexFile)(
        // If ngl is not set or equal to 0, run on CPU with correct instructions
        (systemInfo === null || systemInfo === void 0 ? void 0 : systemInfo.gpuSetting)
            ? Object.assign(Object.assign({}, systemInfo.gpuSetting), { run_mode: systemInfo.gpuSetting.run_mode }) : undefined);
        // Execute the binary
        (0, node_1.log)(`[CORTEX]:: Spawn cortex at path: ${executableOptions.executablePath}`);
        (0, node_1.log)(`[CORTEX]:: Cortex engine path: ${executableOptions.enginePath}`);
        addEnvPaths(executableOptions.enginePath);
        const dataFolderPath = (0, node_1.getJanDataFolderPath)();
        if (watchdog) {
            watchdog.terminate();
        }
        watchdog = new watchdog_1.ProcessWatchdog(executableOptions.executablePath, [
            '--start-server',
            '--port',
            LOCAL_PORT.toString(),
            '--config_file_path',
            `${path_1.default.join(dataFolderPath, '.janrc')}`,
            '--data_folder_path',
            dataFolderPath,
        ], {
            cwd: executableOptions.enginePath,
            env: Object.assign(Object.assign(Object.assign({}, process.env), { ENGINE_PATH: executableOptions.enginePath, CUDA_VISIBLE_DEVICES: executableOptions.cudaVisibleDevices }), (((_a = executableOptions.vkVisibleDevices) === null || _a === void 0 ? void 0 : _a.length) > 0 && {
                GGML_VULKAN_DEVICE: executableOptions.vkVisibleDevices[0],
            })),
        });
        watchdog.start();
        resolve();
    }));
}
/**
 * Every module should have a dispose function
 * This will be called when the extension is unloaded and should clean up any resources
 * Also called when app is closed
 */
function dispose() {
    watchdog === null || watchdog === void 0 ? void 0 : watchdog.terminate();
}
function addEnvPaths(dest) {
    // Add engine path to the PATH and LD_LIBRARY_PATH
    if (process.platform === 'win32') {
        process.env.PATH = (process.env.PATH || '').concat(path_1.default.delimiter, dest);
    }
    else {
        process.env.LD_LIBRARY_PATH = (process.env.LD_LIBRARY_PATH || '').concat(path_1.default.delimiter, dest);
    }
}
exports.default = {
    run,
    dispose,
    engineVariant: execute_1.engineVariant,
};
//# sourceMappingURL=index.js.map