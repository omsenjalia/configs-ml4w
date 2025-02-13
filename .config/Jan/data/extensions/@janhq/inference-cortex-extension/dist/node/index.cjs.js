'use strict';

var path = require('path');
var node = require('@janhq/core/node');
var child_process = require('child_process');
var events = require('events');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * The GPU runMode that will be set - either 'vulkan', 'cuda', or empty for cpu.
 * @param settings
 * @returns
 */
const gpuRunMode = (settings) => {
    if (process.platform === 'darwin')
        // MacOS now has universal binaries
        return '';
    if (!settings)
        return '';
    return settings.vulkan === true || settings.run_mode === 'cpu' ? '' : 'cuda';
};
/**
 * The OS & architecture that the current process is running on.
 * @returns win, mac-x64, mac-arm64, or linux
 */
const os = () => {
    return process.platform === 'win32'
        ? 'windows-amd64'
        : process.platform === 'darwin'
            ? process.arch === 'arm64'
                ? 'mac-arm64'
                : 'mac-amd64'
            : 'linux-amd64';
};
/**
 * The cortex.cpp extension based on the current platform.
 * @returns .exe if on Windows, otherwise an empty string.
 */
const extension = () => {
    return process.platform === 'win32' ? '.exe' : '';
};
/**
 * The CUDA version that will be set - either '11-7' or '12-0'.
 * @param settings
 * @returns
 */
const cudaVersion = (settings) => {
    var _a;
    const isUsingCuda = (settings === null || settings === void 0 ? void 0 : settings.vulkan) !== true &&
        (settings === null || settings === void 0 ? void 0 : settings.run_mode) === 'gpu' &&
        !os().includes('mac');
    if (!isUsingCuda)
        return undefined;
    return ((_a = settings === null || settings === void 0 ? void 0 : settings.cuda) === null || _a === void 0 ? void 0 : _a.version) === '11' ? '11-7' : '12-0';
};
/**
 * The CPU instructions that will be set - either 'avx512', 'avx2', 'avx', or 'noavx'.
 * @returns
 */
const cpuInstructions = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.platform === 'darwin')
        return '';
    const child = child_process.fork(path__namespace.join(__dirname, './cpuInfo.js')); // Path to the child process file
    return new Promise((resolve, reject) => {
        child.on('message', (cpuInfo) => {
            resolve(cpuInfo !== null && cpuInfo !== void 0 ? cpuInfo : 'noavx');
            child.kill(); // Kill the child process after receiving the result
        });
        child.on('error', (err) => {
            resolve('noavx');
            child.kill();
        });
        child.on('exit', (code) => {
            if (code !== 0) {
                resolve('noavx');
                child.kill();
            }
        });
    });
});
/**
 * The executable options for the cortex.cpp extension.
 */
const executableCortexFile = (gpuSetting) => {
    var _a, _b;
    let cudaVisibleDevices = (_a = gpuSetting === null || gpuSetting === void 0 ? void 0 : gpuSetting.gpus_in_use.join(',')) !== null && _a !== void 0 ? _a : '';
    let vkVisibleDevices = (_b = gpuSetting === null || gpuSetting === void 0 ? void 0 : gpuSetting.gpus_in_use.join(',')) !== null && _b !== void 0 ? _b : '';
    let binaryName = `cortex-server${extension()}`;
    const binPath = path__namespace.join(__dirname, '..', 'bin');
    return {
        enginePath: path__namespace.join(node.appResourcePath(), 'shared'),
        executablePath: path__namespace.join(binPath, binaryName),
        cudaVisibleDevices,
        vkVisibleDevices,
    };
};
/**
 * Find which variant to run based on the current platform.
 */
const engineVariant = (gpuSetting) => __awaiter(void 0, void 0, void 0, function* () {
    const cpuInstruction = yield cpuInstructions();
    node.log(`[CORTEX]: CPU instruction: ${cpuInstruction}`);
    let engineVariant = [
        os(),
        (gpuSetting === null || gpuSetting === void 0 ? void 0 : gpuSetting.vulkan)
            ? 'vulkan'
            : gpuRunMode(gpuSetting) !== 'cuda'
                ? // CPU mode - support all variants
                    cpuInstruction
                : // GPU mode - packaged CUDA variants of avx2 and noavx
                    cpuInstruction === 'avx2' || cpuInstruction === 'avx512'
                        ? 'avx2'
                        : 'noavx',
        gpuRunMode(gpuSetting),
        cudaVersion(gpuSetting),
    ]
        .filter((e) => !!e)
        .join('-');
    node.log(`[CORTEX]: Engine variant: ${engineVariant}`);
    return engineVariant;
});

class ProcessWatchdog extends events.EventEmitter {
    constructor(command, args, options = {}) {
        super();
        this.command = command;
        this.args = args;
        this.options = options;
        this.process = null;
        this.restartDelay = options.restartDelay || 5000;
        this.maxRestarts = options.maxRestarts || 5;
        this.restartCount = 0;
        this.isTerminating = false;
    }
    start() {
        this.spawnProcess();
    }
    spawnProcess() {
        var _a, _b;
        if (this.isTerminating)
            return;
        node.log(`Starting process: ${this.command} ${this.args.join(' ')}`);
        this.process = child_process.spawn(this.command, this.args, this.options);
        (_a = this.process.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            node.log(`Process output: ${data}`);
            this.emit('output', data.toString());
        });
        (_b = this.process.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            node.log(`Process error: ${data}`);
            this.emit('error', data.toString());
        });
        this.process.on('close', (code) => {
            node.log(`Process exited with code ${code}`);
            this.emit('close', code);
            if (!this.isTerminating) {
                this.restartProcess();
            }
        });
    }
    restartProcess() {
        if (this.restartCount < this.maxRestarts) {
            this.restartCount++;
            node.log(`Restarting process in ${this.restartDelay}ms (Attempt ${this.restartCount}/${this.maxRestarts})`);
            setTimeout(() => this.spawnProcess(), this.restartDelay);
        }
        else {
            node.log('Max restart attempts reached. Exiting watchdog.');
            this.emit('maxRestartsReached');
        }
    }
    terminate() {
        this.isTerminating = true;
        if (this.process) {
            node.log('Terminating watched process...');
            this.process.kill();
        }
        this.emit('terminated');
    }
}

// The HOST address to use for the Nitro subprocess
const LOCAL_PORT = '39291';
let watchdog = undefined;
/**
 * Spawns a Nitro subprocess.
 * @returns A promise that resolves when the Nitro subprocess is started.
 */
function run(systemInfo) {
    node.log(`[CORTEX]:: Spawning cortex subprocess...`);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        let executableOptions = executableCortexFile(
        // If ngl is not set or equal to 0, run on CPU with correct instructions
        (systemInfo === null || systemInfo === void 0 ? void 0 : systemInfo.gpuSetting)
            ? Object.assign(Object.assign({}, systemInfo.gpuSetting), { run_mode: systemInfo.gpuSetting.run_mode }) : undefined);
        // Execute the binary
        node.log(`[CORTEX]:: Spawn cortex at path: ${executableOptions.executablePath}`);
        node.log(`[CORTEX]:: Cortex engine path: ${executableOptions.enginePath}`);
        addEnvPaths(executableOptions.enginePath);
        const dataFolderPath = node.getJanDataFolderPath();
        if (watchdog) {
            watchdog.terminate();
        }
        watchdog = new ProcessWatchdog(executableOptions.executablePath, [
            '--start-server',
            '--port',
            LOCAL_PORT.toString(),
            '--config_file_path',
            `${path__default["default"].join(dataFolderPath, '.janrc')}`,
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
        process.env.PATH = (process.env.PATH || '').concat(path__default["default"].delimiter, dest);
    }
    else {
        process.env.LD_LIBRARY_PATH = (process.env.LD_LIBRARY_PATH || '').concat(path__default["default"].delimiter, dest);
    }
}
var index = {
    run,
    dispose,
    engineVariant,
};

module.exports = index;
//# sourceMappingURL=index.cjs.js.map
