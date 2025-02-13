"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const node_1 = require("@janhq/core/node");
const path_1 = __importStar(require("path"));
class FileLogger extends node_1.Logger {
    constructor(logEnabled = true, logCleaningInterval = 120000) {
        super();
        this.name = 'file';
        this.logCleaningInterval = 120000;
        this.timeout = null;
        this.appLogPath = './';
        this.logEnabled = true;
        this.logEnabled = logEnabled;
        if (logCleaningInterval)
            this.logCleaningInterval = logCleaningInterval;
        const appConfigurations = (0, node_1.getAppConfigurations)();
        const logFolderPath = (0, path_1.join)(appConfigurations.data_folder, 'logs');
        if (!fs_1.default.existsSync(logFolderPath)) {
            fs_1.default.mkdirSync(logFolderPath, { recursive: true });
        }
        this.appLogPath = (0, path_1.join)(logFolderPath, 'app.log');
    }
    log(args) {
        if (!this.logEnabled)
            return;
        let message = args[0];
        const scope = args[1];
        if (!message)
            return;
        const path = this.appLogPath;
        if (!scope && !message.startsWith('[')) {
            message = `[APP]::${message}`;
        }
        else if (scope) {
            message = `${scope}::${message}`;
        }
        message = `${new Date().toISOString()} ${message}`;
        writeLog(message, path);
    }
    cleanLogs(maxFileSizeBytes, daysToKeep) {
        // clear existing timeout
        // in case we rerun it with different values
        if (this.timeout)
            clearTimeout(this.timeout);
        this.timeout = undefined;
        if (!this.logEnabled)
            return;
        console.log('Validating app logs. Next attempt in ', this.logCleaningInterval);
        const size = maxFileSizeBytes !== null && maxFileSizeBytes !== void 0 ? maxFileSizeBytes : 1 * 1024 * 1024; // 1 MB
        const days = daysToKeep !== null && daysToKeep !== void 0 ? daysToKeep : 7; // 7 days
        const logDirectory = path_1.default.join((0, node_1.getJanDataFolderPath)(), 'logs');
        // Perform log cleaning
        const currentDate = new Date();
        if (fs_1.default.existsSync(logDirectory))
            fs_1.default.readdir(logDirectory, (err, files) => {
                if (err) {
                    console.error('Error reading log directory:', err);
                    return;
                }
                files.forEach((file) => {
                    const filePath = path_1.default.join(logDirectory, file);
                    fs_1.default.stat(filePath, (err, stats) => {
                        if (err) {
                            console.error('Error getting file stats:', err);
                            return;
                        }
                        // Check size
                        if (stats.size > size) {
                            fs_1.default.unlink(filePath, (err) => {
                                if (err) {
                                    console.error('Error deleting log file:', err);
                                    return;
                                }
                                console.debug(`Deleted log file due to exceeding size limit: ${filePath}`);
                            });
                        }
                        else {
                            // Check age
                            const creationDate = new Date(stats.ctime);
                            const daysDifference = Math.floor((currentDate.getTime() - creationDate.getTime()) /
                                (1000 * 3600 * 24));
                            if (daysDifference > days) {
                                fs_1.default.unlink(filePath, (err) => {
                                    if (err) {
                                        console.error('Error deleting log file:', err);
                                        return;
                                    }
                                    console.debug(`Deleted old log file: ${filePath}`);
                                });
                            }
                        }
                    });
                });
            });
        // Schedule the next execution with doubled delays
        this.timeout = setTimeout(() => this.cleanLogs(maxFileSizeBytes, daysToKeep), this.logCleaningInterval);
    }
}
exports.FileLogger = FileLogger;
const writeLog = (message, logPath) => {
    if (!fs_1.default.existsSync(logPath)) {
        const logDirectory = path_1.default.join((0, node_1.getJanDataFolderPath)(), 'logs');
        if (!fs_1.default.existsSync(logDirectory)) {
            fs_1.default.mkdirSync(logDirectory);
        }
        fs_1.default.writeFileSync(logPath, message);
    }
    else {
        const logFile = fs_1.default.createWriteStream(logPath, {
            flags: 'a',
        });
        logFile.write(util_1.default.format(message) + '\n');
        logFile.close();
        console.debug(message);
    }
};
