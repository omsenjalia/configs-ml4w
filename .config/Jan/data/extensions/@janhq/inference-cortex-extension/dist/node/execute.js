"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.engineVariant = exports.executableCortexFile = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const node_1 = require("@janhq/core/node");
const child_process_1 = require("child_process");
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
const cpuInstructions = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (process.platform === 'darwin')
        return '';
    const child = (0, child_process_1.fork)(path.join(__dirname, './cpuInfo.js')); // Path to the child process file
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
    const binPath = path.join(__dirname, '..', 'bin');
    return {
        enginePath: path.join((0, node_1.appResourcePath)(), 'shared'),
        executablePath: path.join(binPath, binaryName),
        cudaVisibleDevices,
        vkVisibleDevices,
    };
};
exports.executableCortexFile = executableCortexFile;
/**
 * Find which variant to run based on the current platform.
 */
const engineVariant = (gpuSetting) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const cpuInstruction = yield cpuInstructions();
    (0, node_1.log)(`[CORTEX]: CPU instruction: ${cpuInstruction}`);
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
    (0, node_1.log)(`[CORTEX]: Engine variant: ${engineVariant}`);
    return engineVariant;
});
exports.engineVariant = engineVariant;
//# sourceMappingURL=execute.js.map