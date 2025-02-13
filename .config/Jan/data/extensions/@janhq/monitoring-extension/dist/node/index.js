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
exports.updateLogger = exports.unregisterLogger = exports.registerLogger = exports.getOsInfo = exports.updateNvidiaInfo = exports.getCurrentLoad = exports.getResourcesInfo = exports.getGpuConfig = exports.GPU_INFO_FILE = exports.SETTINGS_DIR = void 0;
const node_1 = require("@janhq/core/node");
const node_os_utils_1 = require("node-os-utils");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const logger_1 = require("./logger");
/**
 * Path to the settings directory
 **/
exports.SETTINGS_DIR = path_1.default.join((0, node_1.getJanDataFolderPath)(), 'settings');
/**
 * Path to the settings file
 **/
exports.GPU_INFO_FILE = path_1.default.join(exports.SETTINGS_DIR, 'settings.json');
/**
 * Default GPU settings
 * TODO: This needs to be refactored to support multiple accelerators
 **/
const DEFAULT_SETTINGS = {
    notify: true,
    run_mode: 'cpu',
    nvidia_driver: {
        exist: false,
        version: '',
    },
    cuda: {
        exist: false,
        version: '',
    },
    gpus: [],
    gpu_highest_vram: '',
    gpus_in_use: [],
    is_initial: true,
    // TODO: This needs to be set based on user toggle in settings
    vulkan: false,
};
const getGpuConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.platform === 'darwin')
        return undefined;
    if ((0, fs_1.existsSync)(exports.GPU_INFO_FILE))
        return JSON.parse((0, fs_1.readFileSync)(exports.GPU_INFO_FILE, 'utf-8'));
    return DEFAULT_SETTINGS;
});
exports.getGpuConfig = getGpuConfig;
const getResourcesInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const ramUsedInfo = yield node_os_utils_1.mem.used();
    const totalMemory = ramUsedInfo.totalMemMb * 1024 * 1024;
    const usedMemory = ramUsedInfo.usedMemMb * 1024 * 1024;
    const resourceInfo = {
        mem: {
            totalMemory,
            usedMemory,
        },
    };
    return resourceInfo;
});
exports.getResourcesInfo = getResourcesInfo;
const getCurrentLoad = () => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const cpuPercentage = yield node_os_utils_1.cpu.usage();
    let data = {
        run_mode: 'cpu',
        gpus_in_use: [],
    };
    if (process.platform !== 'darwin') {
        data = JSON.parse((0, fs_1.readFileSync)(exports.GPU_INFO_FILE, 'utf-8'));
    }
    if (data.run_mode === 'gpu' && data.gpus_in_use.length > 0) {
        const gpuIds = data.gpus_in_use.join(',');
        if (gpuIds !== '' && data['vulkan'] !== true) {
            (0, child_process_1.exec)(`nvidia-smi --query-gpu=index,name,temperature.gpu,utilization.gpu,memory.total,memory.free,utilization.memory --format=csv,noheader,nounits --id=${gpuIds}`, (error, stdout, _) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    throw new Error(error.message);
                }
                const gpuInfo = stdout
                    .trim()
                    .split('\n')
                    .map((line) => {
                    const [id, name, temperature, utilization, memoryTotal, memoryFree, memoryUtilization,] = line.split(', ').map((item) => item.replace(/\r/g, ''));
                    return {
                        id,
                        name,
                        temperature,
                        utilization,
                        memoryTotal,
                        memoryFree,
                        memoryUtilization,
                    };
                });
                resolve({
                    cpu: { usage: cpuPercentage },
                    gpu: gpuInfo,
                });
            });
        }
        else {
            // Handle the case where gpuIds is empty
            resolve({
                cpu: { usage: cpuPercentage },
                gpu: [],
            });
        }
    }
    else {
        // Handle the case where run_mode is not 'gpu' or no GPUs are in use
        resolve({
            cpu: { usage: cpuPercentage },
            gpu: [],
        });
    }
}));
exports.getCurrentLoad = getCurrentLoad;
/**
 * This will retrieve GPU information and persist settings.json
 * Will be called when the extension is loaded to turn on GPU acceleration if supported
 */
const updateNvidiaInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    // ignore if macos
    if (process.platform === 'darwin')
        return;
    try {
        JSON.parse((0, fs_1.readFileSync)(exports.GPU_INFO_FILE, 'utf-8'));
    }
    catch (error) {
        if (!(0, fs_1.existsSync)(exports.SETTINGS_DIR)) {
            (0, fs_1.mkdirSync)(exports.SETTINGS_DIR, {
                recursive: true,
            });
        }
        (0, fs_1.writeFileSync)(exports.GPU_INFO_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
    }
    yield updateNvidiaDriverInfo();
    yield updateGpuInfo();
});
exports.updateNvidiaInfo = updateNvidiaInfo;
const updateNvidiaDriverInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)('nvidia-smi --query-gpu=driver_version --format=csv,noheader', (error, stdout) => {
            const data = JSON.parse((0, fs_1.readFileSync)(exports.GPU_INFO_FILE, 'utf-8'));
            if (!error) {
                const firstLine = stdout.split('\n')[0].trim();
                data.nvidia_driver.exist = true;
                data.nvidia_driver.version = firstLine;
            }
            else {
                data.nvidia_driver.exist = false;
            }
            (0, fs_1.writeFileSync)(exports.GPU_INFO_FILE, JSON.stringify(data, null, 2));
            resolve({});
        });
    });
});
const getGpuArch = (gpuName) => {
    if (!gpuName.toLowerCase().includes('nvidia'))
        return 'unknown';
    if (gpuName.includes('30'))
        return 'ampere';
    else if (gpuName.includes('40'))
        return 'ada';
    else
        return 'unknown';
};
const updateGpuInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let data = JSON.parse((0, fs_1.readFileSync)(exports.GPU_INFO_FILE, 'utf-8'));
        // Cuda
        if (data.vulkan === true) {
            // Vulkan
            (0, child_process_1.exec)(process.platform === 'win32'
                ? `${__dirname}\\..\\bin\\vulkaninfoSDK.exe --summary`
                : `${__dirname}/../bin/vulkaninfo --summary`, (error, stdout) => __awaiter(void 0, void 0, void 0, function* () {
                if (!error) {
                    const output = stdout.toString();
                    (0, node_1.log)(output);
                    const gpuRegex = /GPU(\d+):(?:[\s\S]*?)deviceName\s*=\s*(.*)/g;
                    const gpus = [];
                    let match;
                    while ((match = gpuRegex.exec(output)) !== null) {
                        const id = match[1];
                        const name = match[2];
                        const arch = getGpuArch(name);
                        gpus.push({ id, vram: '0', name, arch });
                    }
                    data.gpus = gpus;
                    if (!data.gpus_in_use || data.gpus_in_use.length === 0) {
                        data.gpus_in_use = [data.gpus.length > 1 ? '1' : '0'];
                    }
                    data = yield updateCudaExistence(data);
                    (0, fs_1.writeFileSync)(exports.GPU_INFO_FILE, JSON.stringify(data, null, 2));
                    (0, node_1.log)(`[APP]::${JSON.stringify(data)}`);
                    resolve({});
                }
                else {
                    reject(error);
                }
            }));
        }
        else {
            (0, child_process_1.exec)('nvidia-smi --query-gpu=index,memory.total,name --format=csv,noheader,nounits', (error, stdout) => __awaiter(void 0, void 0, void 0, function* () {
                if (!error) {
                    (0, node_1.log)(`[SPECS]::${stdout}`);
                    // Get GPU info and gpu has higher memory first
                    let highestVram = 0;
                    let highestVramId = '0';
                    const gpus = stdout
                        .trim()
                        .split('\n')
                        .map((line) => {
                        let [id, vram, name] = line.split(', ');
                        const arch = getGpuArch(name);
                        vram = vram.replace(/\r/g, '');
                        if (parseFloat(vram) > highestVram) {
                            highestVram = parseFloat(vram);
                            highestVramId = id;
                        }
                        return { id, vram, name, arch };
                    });
                    data.gpus = gpus;
                    data.gpu_highest_vram = highestVramId;
                }
                else {
                    data.gpus = [];
                    data.gpu_highest_vram = undefined;
                }
                if (!data.gpus_in_use || data.gpus_in_use.length === 0) {
                    data.gpus_in_use = data.gpu_highest_vram ? [data.gpu_highest_vram].filter(e => !!e) : [];
                }
                data = yield updateCudaExistence(data);
                console.log('[MONITORING]::Cuda info: ', data);
                (0, fs_1.writeFileSync)(exports.GPU_INFO_FILE, JSON.stringify(data, null, 2));
                (0, node_1.log)(`[APP]::${JSON.stringify(data)}`);
                resolve({});
            }));
        }
    });
});
/**
 * Check if file exists in paths
 */
const checkFileExistenceInPaths = (file, paths) => {
    return paths.some((p) => (0, fs_1.existsSync)(path_1.default.join(p, file)));
};
/**
 * Validate cuda for linux and windows
 */
const updateCudaExistence = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (data = DEFAULT_SETTINGS) {
    let filesCuda12;
    let filesCuda11;
    let paths;
    let cudaVersion = '';
    if (process.platform === 'win32') {
        filesCuda12 = ['cublas64_12.dll', 'cudart64_12.dll', 'cublasLt64_12.dll'];
        filesCuda11 = ['cublas64_11.dll', 'cudart64_110.dll', 'cublasLt64_11.dll'];
        paths = process.env.PATH ? process.env.PATH.split(path_1.default.delimiter) : [];
    }
    else {
        filesCuda12 = ['libcudart.so.12', 'libcublas.so.12', 'libcublasLt.so.12'];
        filesCuda11 = ['libcudart.so.11.0', 'libcublas.so.11', 'libcublasLt.so.11'];
        paths = process.env.LD_LIBRARY_PATH
            ? process.env.LD_LIBRARY_PATH.split(path_1.default.delimiter)
            : [];
        paths.push('/usr/lib/x86_64-linux-gnu/');
    }
    let cudaExists = filesCuda12.every((file) => (0, fs_1.existsSync)(file) || checkFileExistenceInPaths(file, paths));
    if (!cudaExists) {
        cudaExists = filesCuda11.every((file) => (0, fs_1.existsSync)(file) || checkFileExistenceInPaths(file, paths));
        if (cudaExists) {
            cudaVersion = '11';
        }
    }
    else {
        cudaVersion = '12';
    }
    data.cuda.exist = cudaExists;
    data.cuda.version = cudaVersion;
    console.debug(data.is_initial, data.gpus_in_use);
    if (cudaExists && data.is_initial && data.gpus_in_use.length > 0) {
        data.run_mode = 'gpu';
    }
    data.is_initial = false;
    // Attempt to query CUDA using NVIDIA SMI
    if (!cudaExists) {
        yield new Promise((resolve) => {
            (0, child_process_1.exec)('nvidia-smi', (error, stdout) => {
                if (!error) {
                    const regex = /CUDA\s*Version:\s*(\d+\.\d+)/g;
                    const match = regex.exec(stdout);
                    if (match && match[1]) {
                        data.cuda.version = match[1];
                    }
                }
                console.log('[MONITORING]::Finalized cuda info update: ', data);
                resolve();
            });
        });
    }
    return data;
});
const getOsInfo = () => {
    const platform = node_1.SupportedPlatforms.find((p) => p === process.platform) || 'unknown';
    const osInfo = {
        platform: platform,
        arch: process.arch,
        release: os_1.default.release(),
        machine: os_1.default.machine(),
        version: os_1.default.version(),
        totalMem: os_1.default.totalmem(),
        freeMem: os_1.default.freemem(),
    };
    return osInfo;
};
exports.getOsInfo = getOsInfo;
const registerLogger = ({ logEnabled, logCleaningInterval }) => {
    const logger = new logger_1.FileLogger(logEnabled, logCleaningInterval);
    node_1.LoggerManager.instance().register(logger);
    logger.cleanLogs();
};
exports.registerLogger = registerLogger;
const unregisterLogger = () => {
    node_1.LoggerManager.instance().unregister('file');
};
exports.unregisterLogger = unregisterLogger;
const updateLogger = ({ logEnabled, logCleaningInterval }) => {
    const logger = node_1.LoggerManager.instance().loggers.get('file');
    if (logger && logEnabled !== undefined)
        logger.logEnabled = logEnabled;
    if (logger && logCleaningInterval)
        logger.logCleaningInterval = logCleaningInterval;
    // Rerun
    logger && logger.cleanLogs();
};
exports.updateLogger = updateLogger;
