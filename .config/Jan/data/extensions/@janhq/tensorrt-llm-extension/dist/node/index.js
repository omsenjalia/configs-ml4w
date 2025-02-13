"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const child_process_1 = require("child_process");
const tcp_port_used_1 = require("tcp-port-used");
const fetch_retry_1 = require("fetch-retry");
const node_1 = require("@janhq/core/node");
const decompress_1 = require("decompress");
const terminate_1 = require("terminate");
// Polyfill fetch with retry
const fetchRetry = (0, fetch_retry_1.default)(fetch);
const supportedPlatform = () => ['win32', 'linux'];
const supportedGpuArch = () => ['ampere', 'ada'];
const PORT_CHECK_INTERVAL = 100;
// The subprocess instance for Engine
let subprocess = undefined;
/**
 * Initializes a engine subprocess to load a machine learning model.
 * @param params - The model load settings.
 */
function loadModel(params, systemInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        // modelFolder is the absolute path to the running model folder
        // e.g. ~/jan/models/llama-2
        let modelFolder = params.modelFolder;
        if ((_a = params.model.settings) === null || _a === void 0 ? void 0 : _a.prompt_template) {
            const promptTemplate = params.model.settings.prompt_template;
            const prompt = promptTemplateConverter(promptTemplate);
            if (prompt === null || prompt === void 0 ? void 0 : prompt.error) {
                return Promise.reject(prompt.error);
            }
            params.model.settings.system_prompt = prompt.system_prompt;
            params.model.settings.user_prompt = prompt.user_prompt;
            params.model.settings.ai_prompt = prompt.ai_prompt;
        }
        const settings = Object.assign({ engine_path: modelFolder, ctx_len: (_b = params.model.settings.ctx_len) !== null && _b !== void 0 ? _b : 2048 }, params.model.settings);
        if (!systemInfo) {
            throw new Error('Cannot get system info. Unable to start nitro x tensorrt.');
        }
        return runEngineAndLoadModel(settings, systemInfo);
    });
}
/**
 * Stops a Engine subprocess.
 */
function unloadModel() {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);
    debugLog(`Request to kill engine`);
    const killRequest = () => {
        return fetch(TERMINATE_ENGINE_URL, {
            method: 'DELETE',
            signal: controller.signal,
        })
            .then(() => {
            subprocess = undefined;
        })
            .catch(() => { }) // Do nothing with this attempt
            .then(() => tcp_port_used_1.default.waitUntilFree(parseInt(ENGINE_PORT), PORT_CHECK_INTERVAL, 5000)) // Wait for port available
            .then(() => debugLog(`Engine process is terminated`))
            .catch((err) => {
            debugLog(`Could not kill running process on port ${ENGINE_PORT}. Might be another process running on the same port? ${err}`);
            throw 'PORT_NOT_AVAILABLE';
        });
    };
    if (subprocess === null || subprocess === void 0 ? void 0 : subprocess.pid) {
        (0, node_1.log)(`[CORTEX]:: Killing PID ${subprocess.pid}`);
        const pid = subprocess.pid;
        return new Promise((resolve, reject) => {
            (0, terminate_1.default)(pid, function (err) {
                if (err) {
                    return killRequest();
                }
                else {
                    return tcp_port_used_1.default
                        .waitUntilFree(parseInt(ENGINE_PORT), PORT_CHECK_INTERVAL, 5000)
                        .then(() => resolve())
                        .then(() => (0, node_1.log)(`[CORTEX]:: cortex process is terminated`))
                        .catch(() => {
                        killRequest();
                    });
                }
            });
        });
    }
    else {
        return killRequest();
    }
}
/**
 * 1. Spawn engine process
 * 2. Load model into engine subprocess
 * @returns
 */
function runEngineAndLoadModel(settings, systemInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return unloadModel()
            .then(() => runEngine(systemInfo))
            .then(() => loadModelRequest(settings))
            .catch((err) => {
            // TODO: Broadcast error so app could display proper error message
            debugLog(`${err}`, 'Error');
            return { error: err };
        });
    });
}
/**
 * Loads a LLM model into the Engine subprocess by sending a HTTP POST request.
 */
function loadModelRequest(settings) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debugLog(`Loading model with params ${JSON.stringify(settings)}`);
        return fetchRetry(LOAD_MODEL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
            retries: 3,
            retryDelay: 500,
        })
            .then((res) => {
            debugLog(`Load model success with response ${JSON.stringify(res)}`);
            return Promise.resolve({ error: undefined });
        })
            .catch((err) => {
            debugLog(`Load model failed with error ${err}`, 'Error');
            return Promise.resolve({ error: err });
        });
    });
}
/**
 * Spawns engine subprocess.
 */
function runEngine(systemInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        debugLog(`Spawning engine subprocess...`);
        if (systemInfo.gpuSetting == null) {
            return Promise.reject('No GPU information found. Please check your GPU setting.');
        }
        if (((_a = systemInfo.gpuSetting) === null || _a === void 0 ? void 0 : _a.gpus.length) === 0) {
            return Promise.reject('No GPU found. Please check your GPU setting.');
        }
        if (systemInfo.osInfo == null) {
            return Promise.reject('No OS information found. Please check your OS setting.');
        }
        const platform = systemInfo.osInfo.platform;
        if (platform == null || supportedPlatform().includes(platform) === false) {
            return Promise.reject('No OS architecture found. Please check your OS setting.');
        }
        const gpu = (_b = systemInfo.gpuSetting) === null || _b === void 0 ? void 0 : _b.gpus[0];
        if (gpu.name.toLowerCase().includes('nvidia') === false) {
            return Promise.reject('No Nvidia GPU found. Please check your GPU setting.');
        }
        const gpuArch = gpu.arch;
        if (gpuArch == null || supportedGpuArch().includes(gpuArch) === false) {
            return Promise.reject(`Your GPU: ${gpu.name} is not supported. Only ${supportedGpuArch().join(', ')} series are supported.`);
        }
        const janDataFolderPath = yield (0, node_1.getJanDataFolderPath)();
        const tensorRtVersion = TENSORRT_VERSION;
        const provider = PROVIDER;
        return new Promise((resolve, reject) => {
            // Current directory by default
            const executableFolderPath = path_1.default.join(janDataFolderPath, 'engines', provider, tensorRtVersion, gpuArch);
            const nitroExecutablePath = path_1.default.join(executableFolderPath, platform === 'win32' ? 'nitro.exe' : 'nitro');
            const args = ['1', ENGINE_HOST, ENGINE_PORT];
            // Execute the binary
            debugLog(`Spawn nitro at path: ${nitroExecutablePath}, and args: ${args}`);
            subprocess = (0, child_process_1.spawn)(nitroExecutablePath, args, {
                cwd: executableFolderPath,
                env: Object.assign({}, process.env),
            });
            // Handle subprocess output
            subprocess.stdout.on('data', (data) => {
                debugLog(`${data}`);
            });
            subprocess.stderr.on('data', (data) => {
                debugLog(`${data}`);
            });
            subprocess.on('close', (code) => {
                debugLog(`Engine exited with code: ${code}`);
                subprocess = undefined;
                reject(`child process exited with code ${code}`);
            });
            tcp_port_used_1.default
                .waitUntilUsed(parseInt(ENGINE_PORT), PORT_CHECK_INTERVAL, 30000)
                .then(() => {
                debugLog(`Engine is ready`);
                resolve();
            });
        });
    });
}
function debugLog(message, level = 'Debug') {
    (0, node_1.log)(`[TENSORRT_LLM_NITRO]::${level}:${message}`);
}
const decompressRunner = (zipPath, output) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.debug(`Decompressing ${zipPath} to ${output}...`);
    try {
        const files = yield (0, decompress_1.default)(zipPath, output);
        console.debug('Decompress finished!', files);
    }
    catch (err) {
        console.error(`Decompress ${zipPath} failed: ${err}`);
    }
});
/**
 * Parse prompt template into agrs settings
 * @param promptTemplate Template as string
 * @returns
 */
function promptTemplateConverter(promptTemplate) {
    // Split the string using the markers
    const systemMarker = '{system_message}';
    const promptMarker = '{prompt}';
    if (promptTemplate.includes(systemMarker) &&
        promptTemplate.includes(promptMarker)) {
        // Find the indices of the markers
        const systemIndex = promptTemplate.indexOf(systemMarker);
        const promptIndex = promptTemplate.indexOf(promptMarker);
        // Extract the parts of the string
        const system_prompt = promptTemplate.substring(0, systemIndex);
        const user_prompt = promptTemplate.substring(systemIndex + systemMarker.length, promptIndex);
        const ai_prompt = promptTemplate.substring(promptIndex + promptMarker.length);
        // Return the split parts
        return { system_prompt, user_prompt, ai_prompt };
    }
    else if (promptTemplate.includes(promptMarker)) {
        // Extract the parts of the string for the case where only promptMarker is present
        const promptIndex = promptTemplate.indexOf(promptMarker);
        const user_prompt = promptTemplate.substring(0, promptIndex);
        const ai_prompt = promptTemplate.substring(promptIndex + promptMarker.length);
        // Return the split parts
        return { user_prompt, ai_prompt };
    }
    // Return an error if none of the conditions are met
    return { error: 'Cannot split prompt template' };
}
exports.default = {
    supportedPlatform,
    supportedGpuArch,
    decompressRunner,
    loadModel,
    unloadModel,
    dispose: unloadModel,
};
//# sourceMappingURL=index.js.map