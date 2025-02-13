/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ JanInferenceMistralExtension)
});

;// ./node_modules/layerr/dist/error.js
function assertError(err) {
    if (!isError(err)) {
        throw new Error("Parameter was not an error");
    }
}
function isError(err) {
    return ((!!err &&
        typeof err === "object" &&
        objectToString(err) === "[object Error]") ||
        err instanceof Error);
}
function objectToString(obj) {
    return Object.prototype.toString.call(obj);
}

;// ./node_modules/layerr/dist/global.js
const NAME = "Layerr";
let __name = NAME;
function getGlobalName() {
    return __name;
}
function setGlobalName(name = null) {
    __name = name ?? NAME;
}

;// ./node_modules/layerr/dist/tools.js

function parseArguments(args) {
    let options, shortMessage = "";
    if (args.length === 0) {
        options = {};
    }
    else if (isError(args[0])) {
        options = {
            cause: args[0],
        };
        shortMessage = args.slice(1).join(" ") || "";
    }
    else if (args[0] && typeof args[0] === "object") {
        options = Object.assign({}, args[0]);
        shortMessage = args.slice(1).join(" ") || "";
    }
    else if (typeof args[0] === "string") {
        options = {};
        shortMessage = shortMessage = args.join(" ") || "";
    }
    else {
        throw new Error("Invalid arguments passed to Layerr");
    }
    return {
        options,
        shortMessage,
    };
}

;// ./node_modules/layerr/dist/layerr.js



class Layerr extends Error {
    constructor(errorOptionsOrMessage, messageText) {
        const args = [...arguments];
        const { options, shortMessage } = parseArguments(args);
        let message = shortMessage;
        if (options.cause) {
            message = `${message}: ${options.cause.message}`;
        }
        super(message);
        this.message = message;
        if (options.name && typeof options.name === "string") {
            this.name = options.name;
        }
        else {
            this.name = getGlobalName();
        }
        if (options.cause) {
            Object.defineProperty(this, "_cause", { value: options.cause });
        }
        Object.defineProperty(this, "_info", { value: {} });
        if (options.info && typeof options.info === "object") {
            Object.assign(this._info, options.info);
        }
        if (Error.captureStackTrace) {
            const ctor = options.constructorOpt || this.constructor;
            Error.captureStackTrace(this, ctor);
        }
    }
    static cause(err) {
        assertError(err);
        if (!err._cause)
            return null;
        return isError(err._cause)
            ? err._cause
            : null;
    }
    static fullStack(err) {
        assertError(err);
        const cause = Layerr.cause(err);
        if (cause) {
            return `${err.stack}\ncaused by: ${Layerr.fullStack(cause)}`;
        }
        return err.stack ?? "";
    }
    static info(err) {
        assertError(err);
        const output = {};
        const cause = Layerr.cause(err);
        if (cause) {
            Object.assign(output, Layerr.info(cause));
        }
        if (err._info) {
            Object.assign(output, err._info);
        }
        return output;
    }
    toString() {
        let output = this.name ||
            this.constructor.name ||
            this.constructor.prototype.name;
        if (this.message) {
            output = `${output}: ${this.message}`;
        }
        return output;
    }
}

;// ./node_modules/layerr/dist/index.js





;// ./node_modules/@janhq/core/dist/core.es5.js


/**
 * The `EventName` enumeration contains the names of all the available events in the Jan platform.
 */
var AssistantEvent;
(function (AssistantEvent) {
    /** The `OnAssistantsUpdate` event is emitted when the assistant list is updated. */
    AssistantEvent["OnAssistantsUpdate"] = "OnAssistantsUpdate";
})(AssistantEvent || (AssistantEvent = {}));

/**
 * Represents the inference engine.
 * @stored
 */
var InferenceEngine;
(function (InferenceEngine) {
    InferenceEngine["anthropic"] = "anthropic";
    InferenceEngine["mistral"] = "mistral";
    InferenceEngine["martian"] = "martian";
    InferenceEngine["openrouter"] = "openrouter";
    InferenceEngine["nitro"] = "nitro";
    InferenceEngine["openai"] = "openai";
    InferenceEngine["groq"] = "groq";
    InferenceEngine["triton_trtllm"] = "triton_trtllm";
    InferenceEngine["nitro_tensorrt_llm"] = "nitro-tensorrt-llm";
    InferenceEngine["cohere"] = "cohere";
    InferenceEngine["nvidia"] = "nvidia";
    InferenceEngine["cortex"] = "cortex";
    InferenceEngine["cortex_llamacpp"] = "llama-cpp";
    InferenceEngine["cortex_onnx"] = "onnxruntime";
    InferenceEngine["cortex_tensorrtllm"] = "tensorrt-llm";
})(InferenceEngine || (InferenceEngine = {}));

/**
 * The `EventName` enumeration contains the names of all the available events in the Jan platform.
 */
var ModelEvent;
(function (ModelEvent) {
    /** The `OnModelInit` event is emitted when a model inits. */
    ModelEvent["OnModelInit"] = "OnModelInit";
    /** The `OnModelReady` event is emitted when a model ready. */
    ModelEvent["OnModelReady"] = "OnModelReady";
    /** The `OnModelFail` event is emitted when a model fails loading. */
    ModelEvent["OnModelFail"] = "OnModelFail";
    /** The `OnModelStop` event is emitted when a model start to stop. */
    ModelEvent["OnModelStop"] = "OnModelStop";
    /** The `OnModelStopped` event is emitted when a model stopped ok. */
    ModelEvent["OnModelStopped"] = "OnModelStopped";
    /** The `OnModelUpdate` event is emitted when the model list is updated. */
    ModelEvent["OnModelsUpdate"] = "OnModelsUpdate";
})(ModelEvent || (ModelEvent = {}));

var ThreadEvent;
(function (ThreadEvent) {
    /** The `OnThreadStarted` event is emitted when a thread is started. */
    ThreadEvent["OnThreadStarted"] = "OnThreadStarted";
})(ThreadEvent || (ThreadEvent = {}));

/**
 * The status of the message.
 * @data_transfer_object
 */
var MessageStatus;
(function (MessageStatus) {
    /** Message is fully loaded. **/
    MessageStatus["Ready"] = "ready";
    /** Message is not fully loaded. **/
    MessageStatus["Pending"] = "pending";
    /** Message loaded with error. **/
    MessageStatus["Error"] = "error";
    /** Message is cancelled streaming */
    MessageStatus["Stopped"] = "stopped";
})(MessageStatus || (MessageStatus = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["InvalidApiKey"] = "invalid_api_key";
    ErrorCode["AuthenticationError"] = "authentication_error";
    ErrorCode["InsufficientQuota"] = "insufficient_quota";
    ErrorCode["InvalidRequestError"] = "invalid_request_error";
    ErrorCode["Unknown"] = "unknown";
})(ErrorCode || (ErrorCode = {}));
/**
 * The content type of the message.
 */
var ContentType;
(function (ContentType) {
    ContentType["Text"] = "text";
    ContentType["Image"] = "image_url";
})(ContentType || (ContentType = {}));

var MessageEvent;
(function (MessageEvent) {
    /** The `OnMessageSent` event is emitted when a message is sent. */
    MessageEvent["OnMessageSent"] = "OnMessageSent";
    /** The `OnMessageResponse` event is emitted when a message is received. */
    MessageEvent["OnMessageResponse"] = "OnMessageResponse";
    /** The `OnMessageUpdate` event is emitted when a message is updated. */
    MessageEvent["OnMessageUpdate"] = "OnMessageUpdate";
})(MessageEvent || (MessageEvent = {}));

var MessageRequestType;
(function (MessageRequestType) {
    MessageRequestType["Thread"] = "Thread";
    MessageRequestType["Assistant"] = "Assistant";
    MessageRequestType["Summary"] = "Summary";
})(MessageRequestType || (MessageRequestType = {}));

/**
 * The role of the author of this message.
 */
var ChatCompletionRole;
(function (ChatCompletionRole) {
    ChatCompletionRole["System"] = "system";
    ChatCompletionRole["Assistant"] = "assistant";
    ChatCompletionRole["User"] = "user";
})(ChatCompletionRole || (ChatCompletionRole = {}));
var ChatCompletionMessageContentType;
(function (ChatCompletionMessageContentType) {
    ChatCompletionMessageContentType["Text"] = "text";
    ChatCompletionMessageContentType["Image"] = "image_url";
    ChatCompletionMessageContentType["Doc"] = "doc_url";
})(ChatCompletionMessageContentType || (ChatCompletionMessageContentType = {}));

/**
 * The `EventName` enumeration contains the names of all the available events in the Jan platform.
 */
var InferenceEvent;
(function (InferenceEvent) {
    /** The `OnInferenceStopped` event is emitted when a inference is stopped. */
    InferenceEvent["OnInferenceStopped"] = "OnInferenceStopped";
})(InferenceEvent || (InferenceEvent = {}));

/**
 * App configuration event name
 */
var AppConfigurationEventName;
(function (AppConfigurationEventName) {
    AppConfigurationEventName["OnConfigurationUpdate"] = "OnConfigurationUpdate";
})(AppConfigurationEventName || (AppConfigurationEventName = {}));

const AllQuantizations = (/* unused pure expression or super */ null && ([
    'Q3_K_S',
    'Q3_K_M',
    'Q3_K_L',
    'Q4_K_S',
    'Q4_K_M',
    'Q5_K_S',
    'Q5_K_M',
    'Q4_0',
    'Q4_1',
    'Q5_0',
    'Q5_1',
    'IQ2_XXS',
    'IQ2_XS',
    'Q2_K',
    'Q2_K_S',
    'Q6_K',
    'Q8_0',
    'F16',
    'F32',
    'COPY',
]));

const SupportedPlatforms = (/* unused pure expression or super */ null && (['win32', 'linux', 'darwin']));

const SelectFilePropTuple = (/* unused pure expression or super */ null && ([
    'openFile',
    'openDirectory',
    'multiSelections',
    'showHiddenFiles',
    'createDirectory',
    'promptToCreate',
    'noResolveAliases',
    'treatPackageAsDirectory',
    'dontAddToRecent',
]));

/**
 * Native Route APIs
 * @description Enum of all the routes exposed by the app
 */
var NativeRoute;
(function (NativeRoute) {
    NativeRoute["openExternalUrl"] = "openExternalUrl";
    NativeRoute["openAppDirectory"] = "openAppDirectory";
    NativeRoute["openFileExplore"] = "openFileExplorer";
    NativeRoute["selectDirectory"] = "selectDirectory";
    NativeRoute["selectFiles"] = "selectFiles";
    NativeRoute["relaunch"] = "relaunch";
    NativeRoute["setNativeThemeLight"] = "setNativeThemeLight";
    NativeRoute["setNativeThemeDark"] = "setNativeThemeDark";
    NativeRoute["setMinimizeApp"] = "setMinimizeApp";
    NativeRoute["setCloseApp"] = "setCloseApp";
    NativeRoute["setMaximizeApp"] = "setMaximizeApp";
    NativeRoute["showOpenMenu"] = "showOpenMenu";
    NativeRoute["hideQuickAskWindow"] = "hideQuickAskWindow";
    NativeRoute["sendQuickAskInput"] = "sendQuickAskInput";
    NativeRoute["hideMainWindow"] = "hideMainWindow";
    NativeRoute["showMainWindow"] = "showMainWindow";
    NativeRoute["quickAskSizeUpdated"] = "quickAskSizeUpdated";
    NativeRoute["ackDeepLink"] = "ackDeepLink";
    NativeRoute["factoryReset"] = "factoryReset";
})(NativeRoute || (NativeRoute = {}));
/**
 * App Route APIs
 * @description Enum of all the routes exposed by the app
 */
var AppRoute;
(function (AppRoute) {
    AppRoute["getAppConfigurations"] = "getAppConfigurations";
    AppRoute["updateAppConfiguration"] = "updateAppConfiguration";
    AppRoute["joinPath"] = "joinPath";
    AppRoute["dirName"] = "dirName";
    AppRoute["isSubdirectory"] = "isSubdirectory";
    AppRoute["baseName"] = "baseName";
    AppRoute["startServer"] = "startServer";
    AppRoute["stopServer"] = "stopServer";
    AppRoute["log"] = "log";
    AppRoute["systemInformation"] = "systemInformation";
    AppRoute["showToast"] = "showToast";
})(AppRoute || (AppRoute = {}));
var AppEvent;
(function (AppEvent) {
    AppEvent["onAppUpdateDownloadUpdate"] = "onAppUpdateDownloadUpdate";
    AppEvent["onAppUpdateDownloadError"] = "onAppUpdateDownloadError";
    AppEvent["onAppUpdateDownloadSuccess"] = "onAppUpdateDownloadSuccess";
    AppEvent["onUserSubmitQuickAsk"] = "onUserSubmitQuickAsk";
    AppEvent["onSelectedText"] = "onSelectedText";
    AppEvent["onDeepLink"] = "onDeepLink";
    AppEvent["onMainViewStateChange"] = "onMainViewStateChange";
})(AppEvent || (AppEvent = {}));
var DownloadRoute;
(function (DownloadRoute) {
    DownloadRoute["abortDownload"] = "abortDownload";
    DownloadRoute["downloadFile"] = "downloadFile";
    DownloadRoute["pauseDownload"] = "pauseDownload";
    DownloadRoute["resumeDownload"] = "resumeDownload";
    DownloadRoute["getDownloadProgress"] = "getDownloadProgress";
})(DownloadRoute || (DownloadRoute = {}));
var DownloadEvent;
(function (DownloadEvent) {
    DownloadEvent["onFileDownloadUpdate"] = "onFileDownloadUpdate";
    DownloadEvent["onFileDownloadError"] = "onFileDownloadError";
    DownloadEvent["onFileDownloadSuccess"] = "onFileDownloadSuccess";
    DownloadEvent["onFileDownloadStopped"] = "onFileDownloadStopped";
    DownloadEvent["onFileDownloadStarted"] = "onFileDownloadStarted";
    DownloadEvent["onFileUnzipSuccess"] = "onFileUnzipSuccess";
})(DownloadEvent || (DownloadEvent = {}));
var LocalImportModelEvent;
(function (LocalImportModelEvent) {
    LocalImportModelEvent["onLocalImportModelUpdate"] = "onLocalImportModelUpdate";
    LocalImportModelEvent["onLocalImportModelFailed"] = "onLocalImportModelFailed";
    LocalImportModelEvent["onLocalImportModelSuccess"] = "onLocalImportModelSuccess";
    LocalImportModelEvent["onLocalImportModelFinished"] = "onLocalImportModelFinished";
})(LocalImportModelEvent || (LocalImportModelEvent = {}));
var ExtensionRoute;
(function (ExtensionRoute) {
    ExtensionRoute["baseExtensions"] = "baseExtensions";
    ExtensionRoute["getActiveExtensions"] = "getActiveExtensions";
    ExtensionRoute["installExtension"] = "installExtension";
    ExtensionRoute["invokeExtensionFunc"] = "invokeExtensionFunc";
    ExtensionRoute["updateExtension"] = "updateExtension";
    ExtensionRoute["uninstallExtension"] = "uninstallExtension";
})(ExtensionRoute || (ExtensionRoute = {}));
var FileSystemRoute;
(function (FileSystemRoute) {
    FileSystemRoute["appendFileSync"] = "appendFileSync";
    FileSystemRoute["unlinkSync"] = "unlinkSync";
    FileSystemRoute["existsSync"] = "existsSync";
    FileSystemRoute["readdirSync"] = "readdirSync";
    FileSystemRoute["rm"] = "rm";
    FileSystemRoute["mkdir"] = "mkdir";
    FileSystemRoute["readFileSync"] = "readFileSync";
    FileSystemRoute["writeFileSync"] = "writeFileSync";
})(FileSystemRoute || (FileSystemRoute = {}));
var FileManagerRoute;
(function (FileManagerRoute) {
    FileManagerRoute["copyFile"] = "copyFile";
    FileManagerRoute["getJanDataFolderPath"] = "getJanDataFolderPath";
    FileManagerRoute["getResourcePath"] = "getResourcePath";
    FileManagerRoute["getUserHomePath"] = "getUserHomePath";
    FileManagerRoute["fileStat"] = "fileStat";
    FileManagerRoute["writeBlob"] = "writeBlob";
    FileManagerRoute["getGgufFiles"] = "getGgufFiles";
})(FileManagerRoute || (FileManagerRoute = {}));
const CoreRoutes = [
    ...Object.values(AppRoute),
    ...Object.values(DownloadRoute),
    ...Object.values(ExtensionRoute),
    ...Object.values(FileSystemRoute),
    ...Object.values(FileManagerRoute),
];
const APIRoutes = [...CoreRoutes, ...Object.values(NativeRoute)];
const APIEvents = [
    ...Object.values(AppEvent),
    ...Object.values(DownloadEvent),
    ...Object.values(LocalImportModelEvent),
];

/**
 * Execute a extension module function in main process
 *
 * @param     extension     extension name to import
 * @param     method     function name to execute
 * @param     args       arguments to pass to the function
 * @returns   Promise<any>
 *
 */
const executeOnMain = (extension, method, ...args) => { var _a, _b; return (_b = (_a = globalThis.core) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.invokeExtensionFunc(extension, method, ...args); };
/**
 * Downloads a file from a URL and saves it to the local file system.
 *
 * @param {DownloadRequest} downloadRequest - The request to download the file.
 * @param {NetworkConfig} network - Optional object to specify proxy/whether to ignore SSL certificates.
 *
 * @returns {Promise<any>} A promise that resolves when the file is downloaded.
 */
const downloadFile = (downloadRequest, network) => { var _a, _b; return (_b = (_a = globalThis.core) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.downloadFile(downloadRequest, network); };
/**
 * Aborts the download of a specific file.
 * @param {string} fileName - The name of the file whose download is to be aborted.
 * @returns {Promise<any>} A promise that resolves when the download has been aborted.
 */
const abortDownload = (fileName) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.abortDownload(fileName); };
/**
 * Gets Jan's data folder path.
 *
 * @returns {Promise<string>} A Promise that resolves with Jan's data folder path.
 */
const getJanDataFolderPath = () => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.getJanDataFolderPath(); };
/**
 * Opens the file explorer at a specific path.
 * @param {string} path - The path to open in the file explorer.
 * @returns {Promise<any>} A promise that resolves when the file explorer is opened.
 */
const openFileExplorer = (path) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.openFileExplorer(path); };
/**
 * Joins multiple paths together.
 * @param paths - The paths to join.
 * @returns {Promise<string>} A promise that resolves with the joined path.
 */
const joinPath = (paths) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.joinPath(paths); };
/**
 * Get dirname of a file path.
 * @param path - The file path to retrieve dirname.
 * @returns {Promise<string>} A promise that resolves the dirname.
 */
const dirName = (path) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.dirName(path); };
/**
 * Retrieve the basename from an url.
 * @param path - The path to retrieve.
 * @returns {Promise<string>} A promise that resolves with the basename.
 */
const baseName = (path) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.baseName(path); };
/**
 * Opens an external URL in the default web browser.
 *
 * @param {string} url - The URL to open.
 * @returns {Promise<any>} - A promise that resolves when the URL has been successfully opened.
 */
const openExternalUrl = (url) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.openExternalUrl(url); };
/**
 * Gets the resource path of the application.
 *
 * @returns {Promise<string>} - A promise that resolves with the resource path.
 */
const getResourcePath = () => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.getResourcePath(); };
/**
 * Gets the user's home path.
 * @returns return user's home path
 */
const getUserHomePath = () => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.getUserHomePath(); };
/**
 * Log to file from browser processes.
 *
 * @param message - Message to log.
 */
const log = (message, fileName) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.log(message, fileName); };
/**
 * Check whether the path is a subdirectory of another path.
 *
 * @param from - The path to check.
 * @param to - The path to check against.
 *
 * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating whether the path is a subdirectory.
 */
const isSubdirectory = (from, to) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.isSubdirectory(from, to); };
/**
 * Get system information
 * @returns {Promise<any>} - A promise that resolves with the system information.
 */
const systemInformation = () => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.systemInformation(); };
/**
 * Show toast message from browser processes.
 * @param title
 * @param message
 * @returns
 */
const showToast = (title, message) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.showToast(title, message); };

/**
 * Adds an observer for an event.
 *
 * @param eventName The name of the event to observe.
 * @param handler The handler function to call when the event is observed.
 */
const on = (eventName, handler) => {
    var _a, _b;
    (_b = (_a = globalThis.core) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.on(eventName, handler);
};
/**
 * Removes an observer for an event.
 *
 * @param eventName The name of the event to stop observing.
 * @param handler The handler function to call when the event is observed.
 */
const off = (eventName, handler) => {
    var _a, _b;
    (_b = (_a = globalThis.core) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.off(eventName, handler);
};
/**
 * Emits an event.
 *
 * @param eventName The name of the event to emit.
 * @param object The object to pass to the event callback.
 */
const emit = (eventName, object) => {
    var _a, _b;
    (_b = (_a = globalThis.core) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.emit(eventName, object);
};
const events = {
    on,
    off,
    emit,
};

/**
 * Writes data to a file at the specified path.
 * @returns {Promise<any>} A Promise that resolves when the file is written successfully.
 */
const writeFileSync = (...args) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.writeFileSync(...args); };
/**
 * Writes blob data to a file at the specified path.
 * @param path - The path to file.
 * @param data - The blob data.
 * @returns
 */
const writeBlob = (path, data) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.writeBlob(path, data); };
/**
 * Reads the contents of a file at the specified path.
 * @returns {Promise<any>} A Promise that resolves with the contents of the file.
 */
const readFileSync = (...args) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.readFileSync(...args); };
/**
 * Check whether the file exists
 * @param {string} path
 * @returns {boolean} A boolean indicating whether the path is a file.
 */
const existsSync = (...args) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.existsSync(...args); };
/**
 * List the directory files
 * @returns {Promise<any>} A Promise that resolves with the contents of the directory.
 */
const readdirSync = (...args) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.readdirSync(...args); };
/**
 * Creates a directory at the specified path.
 * @returns {Promise<any>} A Promise that resolves when the directory is created successfully.
 */
const mkdir = (...args) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.mkdir(...args); };
/**
 * Removes a directory at the specified path.
 * @returns {Promise<any>} A Promise that resolves when the directory is removed successfully.
 */
const rm = (...args) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.rm(...args, { recursive: true, force: true }); };
/**
 * Deletes a file from the local file system.
 * @param {string} path - The path of the file to delete.
 * @returns {Promise<any>} A Promise that resolves when the file is deleted.
 */
const unlinkSync = (...args) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.unlinkSync(...args); };
/**
 * Appends data to a file at the specified path.
 */
const appendFileSync = (...args) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.appendFileSync(...args); };
const copyFile = (src, dest) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.copyFile(src, dest); };
/**
 * Gets the list of gguf files in a directory
 *
 * @param path - The paths to the file.
 * @returns {Promise<{any}>} - A promise that resolves with the list of gguf and non-gguf files
 */
const getGgufFiles = (paths) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.getGgufFiles(paths); };
/**
 * Gets the file's stats.
 *
 * @param path - The path to the file.
 * @param outsideJanDataFolder - Whether the file is outside the Jan data folder.
 * @returns {Promise<FileStat>} - A promise that resolves with the file's stats.
 */
const fileStat = (path, outsideJanDataFolder) => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.fileStat(path, outsideJanDataFolder); };
// TODO: Export `dummy` fs functions automatically
// Currently adding these manually
const fs = {
    writeFileSync,
    readFileSync,
    existsSync,
    readdirSync,
    mkdir,
    rm,
    unlinkSync,
    appendFileSync,
    copyFile,
    fileStat,
    writeBlob,
    getGgufFiles,
};

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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Manages the registered models across extensions.
 */
class ModelManager {
    constructor() {
        this.models = new Map();
        if (window) {
            window.core.modelManager = this;
        }
    }
    /**
     * Registers a model.
     * @param model - The model to register.
     */
    register(model) {
        if (this.models.has(model.id)) {
            this.models.set(model.id, Object.assign(Object.assign({}, model), this.models.get(model.id)));
        }
        else {
            this.models.set(model.id, model);
        }
        events.emit(ModelEvent.OnModelsUpdate, {});
    }
    /**
     * Retrieves a model by it's id.
     * @param id - The id of the model to retrieve.
     * @returns The model, if found.
     */
    get(id) {
        return this.models.get(id);
    }
    /**
     * The instance of the tool manager.
     */
    static instance() {
        var _a, _b;
        return (_b = (_a = window.core) === null || _a === void 0 ? void 0 : _a.modelManager) !== null && _b !== void 0 ? _b : new ModelManager();
    }
}

/**
 * Validation rules for model parameters
 */
const validationRules = {
    temperature: (value) => typeof value === 'number' && value >= 0 && value <= 2,
    token_limit: (value) => Number.isInteger(value) && value >= 0,
    top_k: (value) => typeof value === 'number' && value >= 0 && value <= 1,
    top_p: (value) => typeof value === 'number' && value >= 0 && value <= 1,
    stream: (value) => typeof value === 'boolean',
    max_tokens: (value) => Number.isInteger(value) && value >= 0,
    stop: (value) => Array.isArray(value) && value.every((v) => typeof v === 'string'),
    frequency_penalty: (value) => typeof value === 'number' && value >= 0 && value <= 1,
    presence_penalty: (value) => typeof value === 'number' && value >= 0 && value <= 1,
    ctx_len: (value) => Number.isInteger(value) && value >= 0,
    ngl: (value) => Number.isInteger(value) && value >= 0,
    embedding: (value) => typeof value === 'boolean',
    n_parallel: (value) => Number.isInteger(value) && value >= 0,
    cpu_threads: (value) => Number.isInteger(value) && value >= 0,
    prompt_template: (value) => typeof value === 'string',
    llama_model_path: (value) => typeof value === 'string',
    mmproj: (value) => typeof value === 'string',
    vision_model: (value) => typeof value === 'boolean',
    text_model: (value) => typeof value === 'boolean',
};
/**
 * There are some parameters that need to be normalized before being sent to the server
 * E.g. ctx_len should be an integer, but it can be a float from the input field
 * @param key
 * @param value
 * @returns
 */
const normalizeValue = (key, value) => {
    if (key === 'token_limit' ||
        key === 'max_tokens' ||
        key === 'ctx_len' ||
        key === 'ngl' ||
        key === 'n_parallel' ||
        key === 'cpu_threads') {
        // Convert to integer
        return Math.floor(Number(value));
    }
    return value;
};
/**
 * Extract inference parameters from flat model parameters
 * @param modelParams
 * @returns
 */
const extractInferenceParams = (modelParams, originParams) => {
    if (!modelParams)
        return {};
    const defaultModelParams = {
        temperature: undefined,
        token_limit: undefined,
        top_k: undefined,
        top_p: undefined,
        stream: undefined,
        max_tokens: undefined,
        stop: undefined,
        frequency_penalty: undefined,
        presence_penalty: undefined,
        engine: undefined,
    };
    const runtimeParams = {};
    for (const [key, value] of Object.entries(modelParams)) {
        if (key in defaultModelParams) {
            const validate = validationRules[key];
            if (validate && !validate(normalizeValue(key, value))) {
                // Invalid value - fall back to origin value
                if (originParams && key in originParams) {
                    Object.assign(runtimeParams, Object.assign(Object.assign({}, runtimeParams), { [key]: originParams[key] }));
                }
            }
            else {
                Object.assign(runtimeParams, Object.assign(Object.assign({}, runtimeParams), { [key]: normalizeValue(key, value) }));
            }
        }
    }
    return runtimeParams;
};
/**
 * Extract model load parameters from flat model parameters
 * @param modelParams
 * @returns
 */
const extractModelLoadParams = (modelParams, originParams) => {
    if (!modelParams)
        return {};
    const defaultSettingParams = {
        ctx_len: undefined,
        ngl: undefined,
        embedding: undefined,
        n_parallel: undefined,
        cpu_threads: undefined,
        pre_prompt: undefined,
        system_prompt: undefined,
        ai_prompt: undefined,
        user_prompt: undefined,
        prompt_template: undefined,
        model_path: undefined,
        llama_model_path: undefined,
        mmproj: undefined,
        cont_batching: undefined,
        vision_model: undefined,
        text_model: undefined,
        engine: undefined,
    };
    const settingParams = {};
    for (const [key, value] of Object.entries(modelParams)) {
        if (key in defaultSettingParams) {
            const validate = validationRules[key];
            if (validate && !validate(normalizeValue(key, value))) {
                // Invalid value - fall back to origin value
                if (originParams && key in originParams) {
                    Object.assign(modelParams, Object.assign(Object.assign({}, modelParams), { [key]: originParams[key] }));
                }
            }
            else {
                Object.assign(settingParams, Object.assign(Object.assign({}, settingParams), { [key]: normalizeValue(key, value) }));
            }
        }
    }
    return settingParams;
};

var ExtensionTypeEnum;
(function (ExtensionTypeEnum) {
    ExtensionTypeEnum["Assistant"] = "assistant";
    ExtensionTypeEnum["Conversational"] = "conversational";
    ExtensionTypeEnum["Inference"] = "inference";
    ExtensionTypeEnum["Model"] = "model";
    ExtensionTypeEnum["SystemMonitoring"] = "systemMonitoring";
    ExtensionTypeEnum["HuggingFace"] = "huggingFace";
})(ExtensionTypeEnum || (ExtensionTypeEnum = {}));
/**
 * Represents a base extension.
 * This class should be extended by any class that represents an extension.
 */
class BaseExtension {
    constructor(url, name, productName, active, description, version) {
        this.settingFolderName = 'settings';
        this.settingFileName = 'settings.json';
        this.name = name;
        this.productName = productName;
        this.url = url;
        this.active = active;
        this.description = description;
        this.version = version;
    }
    /**
     * Returns the type of the extension.
     * @returns {ExtensionType} The type of the extension
     * Undefined means its not extending any known extension by the application.
     */
    type() {
        return undefined;
    }
    /**
     * The compatibility of the extension.
     * This is used to check if the extension is compatible with the current environment.
     * @property {Array} platform
     */
    compatibility() {
        return undefined;
    }
    /**
     * Registers models - it persists in-memory shared ModelManager instance's data map.
     * @param models
     */
    registerModels(models) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const model of models) {
                ModelManager.instance().register(model);
            }
        });
    }
    /**
     * Register settings for the extension.
     * @param settings
     * @returns
     */
    registerSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.name) {
                console.error('Extension name is not defined');
                return;
            }
            const extensionSettingFolderPath = yield joinPath([
                yield getJanDataFolderPath(),
                'settings',
                this.name,
            ]);
            settings.forEach((setting) => {
                setting.extensionName = this.name;
            });
            try {
                if (!(yield fs.existsSync(extensionSettingFolderPath)))
                    yield fs.mkdir(extensionSettingFolderPath);
                const settingFilePath = yield joinPath([extensionSettingFolderPath, this.settingFileName]);
                // Persists new settings
                if (yield fs.existsSync(settingFilePath)) {
                    const oldSettings = JSON.parse(yield fs.readFileSync(settingFilePath, 'utf-8'));
                    settings.forEach((setting) => {
                        var _a, _b;
                        // Keep setting value
                        if (setting.controllerProps && Array.isArray(oldSettings))
                            setting.controllerProps.value = (_b = (_a = oldSettings.find((e) => e.key === setting.key)) === null || _a === void 0 ? void 0 : _a.controllerProps) === null || _b === void 0 ? void 0 : _b.value;
                    });
                }
                yield fs.writeFileSync(settingFilePath, JSON.stringify(settings, null, 2));
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    /**
     * Get the setting value for the key.
     * @param key
     * @param defaultValue
     * @returns
     */
    getSetting(key, defaultValue) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const keySetting = (yield this.getSettings()).find((setting) => setting.key === key);
            const value = keySetting === null || keySetting === void 0 ? void 0 : keySetting.controllerProps.value;
            return (_a = value) !== null && _a !== void 0 ? _a : defaultValue;
        });
    }
    onSettingUpdate(key, value) {
        return;
    }
    /**
     * Determine if the prerequisites for the extension are installed.
     *
     * @returns {boolean} true if the prerequisites are installed, false otherwise.
     */
    installationState() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'NotRequired';
        });
    }
    /**
     * Install the prerequisites for the extension.
     *
     * @returns {Promise<void>}
     */
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    /**
     * Get the settings for the extension.
     * @returns
     */
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.name)
                return [];
            const settingPath = yield joinPath([
                yield getJanDataFolderPath(),
                this.settingFolderName,
                this.name,
                this.settingFileName,
            ]);
            try {
                if (!(yield fs.existsSync(settingPath)))
                    return [];
                const content = yield fs.readFileSync(settingPath, 'utf-8');
                const settings = JSON.parse(content);
                return settings;
            }
            catch (err) {
                console.warn(err);
                return [];
            }
        });
    }
    /**
     * Update the settings for the extension.
     * @param componentProps
     * @returns
     */
    updateSettings(componentProps) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.name)
                return;
            const settings = yield this.getSettings();
            const updatedSettings = settings.map((setting) => {
                const updatedSetting = componentProps.find((componentProp) => componentProp.key === setting.key);
                if (updatedSetting && updatedSetting.controllerProps) {
                    setting.controllerProps.value = updatedSetting.controllerProps.value;
                }
                return setting;
            });
            const settingPath = yield joinPath([
                yield getJanDataFolderPath(),
                this.settingFolderName,
                this.name,
                this.settingFileName,
            ]);
            yield fs.writeFileSync(settingPath, JSON.stringify(updatedSettings, null, 2));
            updatedSettings.forEach((setting) => {
                this.onSettingUpdate(setting.key, setting.controllerProps.value);
            });
        });
    }
}

/**
 * Conversational extension. Persists and retrieves conversations.
 * @abstract
 * @extends BaseExtension
 */
class ConversationalExtension extends (/* unused pure expression or super */ null && (BaseExtension)) {
    /**
     * Conversation extension type.
     */
    type() {
        return ExtensionTypeEnum.Conversational;
    }
}

/**
 * Inference extension. Start, stop and inference models.
 */
class InferenceExtension extends (/* unused pure expression or super */ null && (BaseExtension)) {
    /**
     * Inference extension type.
     */
    type() {
        return ExtensionTypeEnum.Inference;
    }
}

/**
 * Monitoring extension for system monitoring.
 * @extends BaseExtension
 */
class MonitoringExtension extends (/* unused pure expression or super */ null && (BaseExtension)) {
    /**
     * Monitoring extension type.
     */
    type() {
        return ExtensionTypeEnum.SystemMonitoring;
    }
}

/**
 * Assistant extension for managing assistants.
 * @extends BaseExtension
 */
class AssistantExtension extends (/* unused pure expression or super */ null && (BaseExtension)) {
    /**
     * Assistant extension type.
     */
    type() {
        return ExtensionTypeEnum.Assistant;
    }
}

/**
 * Model extension for managing models.
 */
class ModelExtension extends (/* unused pure expression or super */ null && (BaseExtension)) {
    /**
     * Model extension type.
     */
    type() {
        return ExtensionTypeEnum.Model;
    }
}

/**
 * Manages the registration and retrieval of inference engines.
 */
class EngineManager {
    constructor() {
        this.engines = new Map();
    }
    /**
     * Registers an engine.
     * @param engine - The engine to register.
     */
    register(engine) {
        this.engines.set(engine.provider, engine);
    }
    /**
     * Retrieves a engine by provider.
     * @param provider - The name of the engine to retrieve.
     * @returns The engine, if found.
     */
    get(provider) {
        // Backward compatible provider
        // nitro is migrated to cortex
        if ([
            InferenceEngine.nitro,
            InferenceEngine.cortex,
            InferenceEngine.cortex_llamacpp,
            InferenceEngine.cortex_onnx,
            InferenceEngine.cortex_tensorrtllm,
            InferenceEngine.cortex_onnx,
        ]
            .map((e) => e.toString())
            .includes(provider))
            provider = InferenceEngine.cortex;
        return this.engines.get(provider);
    }
    /**
     * The instance of the engine manager.
     */
    static instance() {
        var _a, _b;
        return (_b = (_a = window.core) === null || _a === void 0 ? void 0 : _a.engineManager) !== null && _b !== void 0 ? _b : new EngineManager();
    }
}

/**
 * Base AIEngine
 * Applicable to all AI Engines
 */
class AIEngine extends BaseExtension {
    /**
     * On extension load, subscribe to events.
     */
    onLoad() {
        this.registerEngine();
        events.on(ModelEvent.OnModelInit, (model) => this.loadModel(model));
        events.on(ModelEvent.OnModelStop, (model) => this.unloadModel(model));
    }
    /**
     * Registers AI Engines
     */
    registerEngine() {
        EngineManager.instance().register(this);
    }
    /**
     * Loads the model.
     */
    loadModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (model.engine.toString() !== this.provider)
                return Promise.resolve();
            events.emit(ModelEvent.OnModelReady, model);
            return Promise.resolve();
        });
    }
    /**
     * Stops the model.
     */
    unloadModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((model === null || model === void 0 ? void 0 : model.engine) && model.engine.toString() !== this.provider)
                return Promise.resolve();
            events.emit(ModelEvent.OnModelStopped, model !== null && model !== void 0 ? model : {});
            return Promise.resolve();
        });
    }
    /*
     * Inference request
     */
    inference(data) { }
    /**
     * Stop inference
     */
    stopInference() { }
}

function isFunction(value) {
    return typeof value === 'function';
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function (handle) {
        return (clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        {
            throw err;
        }
    });
}

function noop() { }

function errorContext(cb) {
    {
        cb();
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) ;
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function handleUnhandledError(error) {
    {
        reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

/**
 * Sends a request to the inference server to generate a response based on the recent messages.
 * @param recentMessages - An array of recent messages to use as context for the inference.
 * @returns An Observable that emits the generated response as a string.
 */
function requestInference(inferenceUrl, requestBody, model, controller, headers, transformResponse) {
    return new Observable((subscriber) => {
        var _a;
        fetch(inferenceUrl, {
            method: 'POST',
            headers: Object.assign({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': ((_a = model.parameters) === null || _a === void 0 ? void 0 : _a.stream) ? 'text/event-stream' : 'application/json' }, headers),
            body: JSON.stringify(requestBody),
            signal: controller === null || controller === void 0 ? void 0 : controller.signal,
        })
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            if (!response.ok) {
                const data = yield response.json();
                let errorCode = ErrorCode.Unknown;
                if (data.error) {
                    errorCode = (_b = (_a = data.error.code) !== null && _a !== void 0 ? _a : data.error.type) !== null && _b !== void 0 ? _b : ErrorCode.Unknown;
                }
                else if (response.status === 401) {
                    errorCode = ErrorCode.InvalidApiKey;
                }
                const error = {
                    message: (_e = (_d = (_c = data.error) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : data.message) !== null && _e !== void 0 ? _e : 'Error occurred.',
                    code: errorCode,
                };
                subscriber.error(error);
                subscriber.complete();
                return;
            }
            // There could be overriden stream parameter in the model
            // that is set in request body (transformed payload)
            if ((requestBody === null || requestBody === void 0 ? void 0 : requestBody.stream) === false || ((_f = model.parameters) === null || _f === void 0 ? void 0 : _f.stream) === false) {
                const data = yield response.json();
                if (transformResponse) {
                    subscriber.next(transformResponse(data));
                }
                else {
                    subscriber.next((_j = (_h = (_g = data.choices[0]) === null || _g === void 0 ? void 0 : _g.message) === null || _h === void 0 ? void 0 : _h.content) !== null && _j !== void 0 ? _j : '');
                }
            }
            else {
                const stream = response.body;
                const decoder = new TextDecoder('utf-8');
                const reader = stream === null || stream === void 0 ? void 0 : stream.getReader();
                let content = '';
                while (reader) {
                    const { done, value } = yield reader.read();
                    if (done) {
                        break;
                    }
                    const text = decoder.decode(value);
                    const lines = text.trim().split('\n');
                    let cachedLines = '';
                    for (const line of lines) {
                        try {
                            if (transformResponse) {
                                content += transformResponse(line);
                                subscriber.next(content !== null && content !== void 0 ? content : '');
                            }
                            else {
                                const toParse = cachedLines + line;
                                if (!line.includes('data: [DONE]')) {
                                    const data = JSON.parse(toParse.replace('data: ', ''));
                                    if ('error' in data) {
                                        subscriber.error(data.error);
                                        subscriber.complete();
                                        return;
                                    }
                                    content += (_m = (_l = (_k = data.choices[0]) === null || _k === void 0 ? void 0 : _k.delta) === null || _l === void 0 ? void 0 : _l.content) !== null && _m !== void 0 ? _m : '';
                                    if (content.startsWith('assistant: ')) {
                                        content = content.replace('assistant: ', '');
                                    }
                                    if (content !== '')
                                        subscriber.next(content);
                                }
                            }
                        }
                        catch (_o) {
                            cachedLines = line;
                        }
                    }
                }
            }
            subscriber.complete();
        }))
            .catch((err) => subscriber.error(err));
    });
}

// These values should NEVER change. The values are precisely for
// generating ULIDs.
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's Base32
const ENCODING_LEN = 32; // from ENCODING.length;
const TIME_MAX = 281474976710655; // from Math.pow(2, 48) - 1;
const TIME_LEN = 10;
const RANDOM_LEN = 16;
const ERROR_INFO = Object.freeze({
    source: "ulid"
});
/**
 * Detect the best PRNG (pseudo-random number generator)
 * @param root The root to check from (global/window)
 * @returns The PRNG function
 */
function detectPRNG(root) {
    const rootLookup = root || detectRoot();
    const globalCrypto = (rootLookup && (rootLookup.crypto || rootLookup.msCrypto)) ||
        (null);
    if (typeof globalCrypto?.getRandomValues === "function") {
        return () => {
            const buffer = new Uint8Array(1);
            globalCrypto.getRandomValues(buffer);
            return buffer[0] / 0xff;
        };
    }
    else if (typeof globalCrypto?.randomBytes === "function") {
        return () => globalCrypto.randomBytes(1).readUInt8() / 0xff;
    }
    else ;
    throw new Layerr({
        info: {
            code: "PRNG_DETECT",
            ...ERROR_INFO
        }
    }, "Failed to find a reliable PRNG");
}
function detectRoot() {
    if (inWebWorker())
        return self;
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof __webpack_require__.g !== "undefined") {
        return __webpack_require__.g;
    }
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    return null;
}
function encodeRandom(len, prng) {
    let str = "";
    for (; len > 0; len--) {
        str = randomChar(prng) + str;
    }
    return str;
}
/**
 * Encode the time portion of a ULID
 * @param now The current timestamp
 * @param len Length to generate
 * @returns The encoded time
 */
function encodeTime(now, len) {
    if (isNaN(now)) {
        throw new Layerr({
            info: {
                code: "ENC_TIME_NAN",
                ...ERROR_INFO
            }
        }, `Time must be a number: ${now}`);
    }
    else if (now > TIME_MAX) {
        throw new Layerr({
            info: {
                code: "ENC_TIME_SIZE_EXCEED",
                ...ERROR_INFO
            }
        }, `Cannot encode a time larger than ${TIME_MAX}: ${now}`);
    }
    else if (now < 0) {
        throw new Layerr({
            info: {
                code: "ENC_TIME_NEG",
                ...ERROR_INFO
            }
        }, `Time must be positive: ${now}`);
    }
    else if (Number.isInteger(now) === false) {
        throw new Layerr({
            info: {
                code: "ENC_TIME_TYPE",
                ...ERROR_INFO
            }
        }, `Time must be an integer: ${now}`);
    }
    let mod, str = "";
    for (let currentLen = len; currentLen > 0; currentLen--) {
        mod = now % ENCODING_LEN;
        str = ENCODING.charAt(mod) + str;
        now = (now - mod) / ENCODING_LEN;
    }
    return str;
}
function inWebWorker() {
    // @ts-ignore
    return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
}
function randomChar(prng) {
    let rand = Math.floor(prng() * ENCODING_LEN);
    if (rand === ENCODING_LEN) {
        rand = ENCODING_LEN - 1;
    }
    return ENCODING.charAt(rand);
}
/**
 * Generate a ULID
 * @param seedTime Optional time seed
 * @param prng Optional PRNG function
 * @returns A ULID string
 * @example
 *  ulid(); // "01HNZXD07M5CEN5XA66EMZSRZW"
 */
function ulid(seedTime, prng) {
    const currentPRNG = prng || detectPRNG();
    const seed = isNaN(seedTime) ? Date.now() : seedTime;
    return encodeTime(seed, TIME_LEN) + encodeRandom(RANDOM_LEN, currentPRNG);
}

/**
 * Base OAI Inference Provider
 * Applicable to all OAI compatible inference providers
 */
class OAIEngine extends AIEngine {
    constructor() {
        super(...arguments);
        // Controller to handle stop requests
        this.controller = new AbortController();
        this.isCancelled = false;
    }
    /**
     * On extension load, subscribe to events.
     */
    onLoad() {
        super.onLoad();
        events.on(MessageEvent.OnMessageSent, (data) => this.inference(data));
        events.on(InferenceEvent.OnInferenceStopped, () => this.stopInference());
    }
    /**
     * On extension unload
     */
    onUnload() { }
    /*
     * Inference request
     */
    inference(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!((_a = data.model) === null || _a === void 0 ? void 0 : _a.id)) {
                events.emit(MessageEvent.OnMessageResponse, {
                    status: MessageStatus.Error,
                    content: [
                        {
                            type: ContentType.Text,
                            text: {
                                value: 'No model ID provided',
                                annotations: [],
                            },
                        },
                    ],
                });
                return;
            }
            const timestamp = Date.now() / 1000;
            const message = {
                id: ulid(),
                thread_id: data.threadId,
                type: data.type,
                assistant_id: data.assistantId,
                role: ChatCompletionRole.Assistant,
                content: [],
                status: MessageStatus.Pending,
                created_at: timestamp,
                completed_at: timestamp,
                object: 'thread.message',
            };
            if (data.type !== MessageRequestType.Summary) {
                events.emit(MessageEvent.OnMessageResponse, message);
            }
            this.isCancelled = false;
            this.controller = new AbortController();
            const model = Object.assign(Object.assign({}, (this.loadedModel ? this.loadedModel : {})), data.model);
            const header = yield this.headers();
            let requestBody = Object.assign({ messages: (_b = data.messages) !== null && _b !== void 0 ? _b : [], model: model.id, stream: true }, model.parameters);
            if (this.transformPayload) {
                requestBody = this.transformPayload(requestBody);
            }
            requestInference(this.inferenceUrl, requestBody, model, this.controller, header, this.transformResponse).subscribe({
                next: (content) => {
                    const messageContent = {
                        type: ContentType.Text,
                        text: {
                            value: content.trim(),
                            annotations: [],
                        },
                    };
                    message.content = [messageContent];
                    events.emit(MessageEvent.OnMessageUpdate, message);
                },
                complete: () => __awaiter(this, void 0, void 0, function* () {
                    message.status = message.content.length ? MessageStatus.Ready : MessageStatus.Error;
                    events.emit(MessageEvent.OnMessageUpdate, message);
                }),
                error: (err) => __awaiter(this, void 0, void 0, function* () {
                    if (this.isCancelled || message.content.length) {
                        message.status = MessageStatus.Stopped;
                        events.emit(MessageEvent.OnMessageUpdate, message);
                        return;
                    }
                    message.status = MessageStatus.Error;
                    message.content[0] = {
                        type: ContentType.Text,
                        text: {
                            value: err.message,
                            annotations: [],
                        },
                    };
                    message.error_code = err.code;
                    events.emit(MessageEvent.OnMessageUpdate, message);
                }),
            });
        });
    }
    /**
     * Stops the inference.
     */
    stopInference() {
        var _a;
        this.isCancelled = true;
        (_a = this.controller) === null || _a === void 0 ? void 0 : _a.abort();
    }
    /**
     * Headers for the inference request
     */
    headers() {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
}

/**
 * Base OAI Local Inference Provider
 * Added the implementation of loading and unloading model (applicable to local inference providers)
 */
class LocalOAIEngine extends OAIEngine {
    constructor() {
        super(...arguments);
        this.loadModelFunctionName = 'loadModel';
        this.unloadModelFunctionName = 'unloadModel';
        /// Legacy
        this.getModelFilePath = (id) => __awaiter(this, void 0, void 0, function* () {
            return joinPath([yield getJanDataFolderPath(), 'models', id]);
        });
        ///
    }
    /**
     * This class represents a base for local inference providers in the OpenAI architecture.
     * It extends the OAIEngine class and provides the implementation of loading and unloading models locally.
     * The loadModel function subscribes to the ModelEvent.OnModelInit event, loading models when initiated.
     * The unloadModel function subscribes to the ModelEvent.OnModelStop event, unloading models when stopped.
     */
    onLoad() {
        super.onLoad();
        // These events are applicable to local inference providers
        events.on(ModelEvent.OnModelInit, (model) => this.loadModel(model));
        events.on(ModelEvent.OnModelStop, (model) => this.unloadModel(model));
    }
    /**
     * Load the model.
     */
    loadModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (model.engine.toString() !== this.provider)
                return;
            const modelFolder = 'file_path' in model && model.file_path ? yield dirName(model.file_path) : yield this.getModelFilePath(model.id);
            const systemInfo = yield systemInformation();
            const res = yield executeOnMain(this.nodeModule, this.loadModelFunctionName, {
                modelFolder,
                model,
            }, systemInfo);
            if (res === null || res === void 0 ? void 0 : res.error) {
                events.emit(ModelEvent.OnModelFail, { error: res.error });
                return Promise.reject(res.error);
            }
            else {
                this.loadedModel = model;
                events.emit(ModelEvent.OnModelReady, model);
                return Promise.resolve();
            }
        });
    }
    /**
     * Stops the model.
     */
    unloadModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if ((model === null || model === void 0 ? void 0 : model.engine) && ((_a = model.engine) === null || _a === void 0 ? void 0 : _a.toString()) !== this.provider)
                return Promise.resolve();
            this.loadedModel = undefined;
            yield executeOnMain(this.nodeModule, this.unloadModelFunctionName).then(() => {
                events.emit(ModelEvent.OnModelStopped, {});
            });
        });
    }
}

/**
 * Base OAI Remote Inference Provider
 * Added the implementation of loading and unloading model (applicable to local inference providers)
 */
class RemoteOAIEngine extends OAIEngine {
    /**
     * On extension load, subscribe to events.
     */
    onLoad() {
        super.onLoad();
    }
    /**
     * Headers for the inference request
     */
    headers() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign({}, (this.apiKey && {
                'Authorization': `Bearer ${this.apiKey}`,
                'api-key': `${this.apiKey}`,
            }));
        });
    }
}

/**
 * Manages the registration and retrieval of inference tools.
 */
class ToolManager {
    constructor() {
        this.tools = new Map();
    }
    /**
     * Registers a tool.
     * @param tool - The tool to register.
     */
    register(tool) {
        this.tools.set(tool.name, tool);
    }
    /**
     * Retrieves a tool by it's name.
     * @param name - The name of the tool to retrieve.
     * @returns The tool, if found.
     */
    get(name) {
        return this.tools.get(name);
    }
    /*
     ** Process the message request with the tools.
     */
    process(request, tools) {
        return tools.reduce((prevPromise, currentTool) => {
            return prevPromise.then((prevResult) => {
                var _a, _b;
                return currentTool.enabled
                    ? (_b = (_a = this.get(currentTool.type)) === null || _a === void 0 ? void 0 : _a.process(prevResult, currentTool)) !== null && _b !== void 0 ? _b : Promise.resolve(prevResult)
                    : Promise.resolve(prevResult);
            });
        }, Promise.resolve(request));
    }
    /**
     * The instance of the tool manager.
     */
    static instance() {
        var _a, _b;
        return (_b = (_a = window.core) === null || _a === void 0 ? void 0 : _a.toolManager) !== null && _b !== void 0 ? _b : new ToolManager();
    }
}

/**
 * Represents a base inference tool.
 */
class InferenceTool {
}


//# sourceMappingURL=core.es5.js.map

;// ./src/index.ts
/**
 * @file This file exports a class that implements the InferenceExtension interface from the @janhq/core package.
 * The class provides methods for initializing and stopping a model, and for making inference requests.
 * It also subscribes to events emitted by the @janhq/core package and handles new message requests.
 * @version 1.0.0
 * @module inference-mistral-extension/src/index
 */
var src_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var Settings;
(function (Settings) {
    Settings["apiKey"] = "mistral-api-key";
    Settings["chatCompletionsEndPoint"] = "chat-completions-endpoint";
})(Settings || (Settings = {}));
/**
 * A class that implements the InferenceExtension interface from the @janhq/core package.
 * The class provides methods for initializing and stopping a model, and for making inference requests.
 * It also subscribes to events emitted by the @janhq/core package and handles new message requests.
 */
class JanInferenceMistralExtension extends RemoteOAIEngine {
    constructor() {
        super(...arguments);
        this.inferenceUrl = '';
        this.provider = 'mistral';
    }
    onLoad() {
        const _super = Object.create(null, {
            onLoad: { get: () => super.onLoad }
        });
        return src_awaiter(this, void 0, void 0, function* () {
            _super.onLoad.call(this);
            // Register Settings
            this.registerSettings([{"key":"mistral-api-key","title":"API Key","description":"The Mistral API uses API keys for authentication. Visit your [API Keys](https://console.mistral.ai/api-keys/) page to retrieve the API key you'll use in your requests.","controllerType":"input","controllerProps":{"placeholder":"Insert API Key","value":"","type":"password","inputActions":["unobscure","copy"]}},{"key":"chat-completions-endpoint","title":"Chat Completions Endpoint","description":"The endpoint to use for chat completions. See the [Mistral API documentation](https://docs.mistral.ai/api/#operation/createChatCompletion) for more information.","controllerType":"input","controllerProps":{"placeholder":"https://api.mistral.ai/v1/chat/completions","value":"https://api.mistral.ai/v1/chat/completions"}}]);
            this.registerModels([{"sources":[{"url":"https://docs.mistral.ai/api/"}],"id":"mistral-small-latest","object":"model","name":"Mistral Small","version":"1.1","description":"Mistral Small is the ideal choice for simple tasks (Classification, Customer Support, or Text Generation) at an affordable price.","format":"api","settings":{},"parameters":{"max_tokens":32000,"temperature":0.7,"top_p":0.95,"stream":true},"metadata":{"author":"Mistral","tags":["General"]},"engine":"mistral"},{"sources":[{"url":"https://docs.mistral.ai/api/"}],"id":"mistral-large-latest","object":"model","name":"Mistral Large","version":"1.1","description":"Mistral Large is ideal for complex tasks (Synthetic Text Generation, Code Generation, RAG, or Agents).","format":"api","settings":{},"parameters":{"max_tokens":32000,"temperature":0.7,"top_p":0.95,"stream":true},"metadata":{"author":"Mistral","tags":["General"]},"engine":"mistral"},{"sources":[{"url":"https://docs.mistral.ai/api/"}],"id":"open-mixtral-8x22b","object":"model","name":"Mixtral 8x22B","version":"1.1","description":"Mixtral 8x22B is a high-performance, cost-effective model designed for complex tasks.","format":"api","settings":{},"parameters":{"max_tokens":32000,"temperature":0.7,"top_p":0.95,"stream":true},"metadata":{"author":"Mistral","tags":["General"]},"engine":"mistral"}]);
            this.apiKey = yield this.getSetting(Settings.apiKey, '');
            this.inferenceUrl = yield this.getSetting(Settings.chatCompletionsEndPoint, '');
            if (this.inferenceUrl.length === 0) {
                [{"key":"mistral-api-key","title":"API Key","description":"The Mistral API uses API keys for authentication. Visit your [API Keys](https://console.mistral.ai/api-keys/) page to retrieve the API key you'll use in your requests.","controllerType":"input","controllerProps":{"placeholder":"Insert API Key","value":"","type":"password","inputActions":["unobscure","copy"]}},{"key":"chat-completions-endpoint","title":"Chat Completions Endpoint","description":"The endpoint to use for chat completions. See the [Mistral API documentation](https://docs.mistral.ai/api/#operation/createChatCompletion) for more information.","controllerType":"input","controllerProps":{"placeholder":"https://api.mistral.ai/v1/chat/completions","value":"https://api.mistral.ai/v1/chat/completions"}}].forEach((setting) => {
                    if (setting.key === Settings.chatCompletionsEndPoint) {
                        this.inferenceUrl = setting.controllerProps.value;
                    }
                });
            }
        });
    }
    onSettingUpdate(key, value) {
        if (key === Settings.apiKey) {
            this.apiKey = value;
        }
        else if (key === Settings.chatCompletionsEndPoint) {
            if (typeof value !== 'string')
                return;
            if (value.trim().length === 0) {
                [{"key":"mistral-api-key","title":"API Key","description":"The Mistral API uses API keys for authentication. Visit your [API Keys](https://console.mistral.ai/api-keys/) page to retrieve the API key you'll use in your requests.","controllerType":"input","controllerProps":{"placeholder":"Insert API Key","value":"","type":"password","inputActions":["unobscure","copy"]}},{"key":"chat-completions-endpoint","title":"Chat Completions Endpoint","description":"The endpoint to use for chat completions. See the [Mistral API documentation](https://docs.mistral.ai/api/#operation/createChatCompletion) for more information.","controllerType":"input","controllerProps":{"placeholder":"https://api.mistral.ai/v1/chat/completions","value":"https://api.mistral.ai/v1/chat/completions"}}].forEach((setting) => {
                    if (setting.key === Settings.chatCompletionsEndPoint) {
                        this.inferenceUrl = setting.controllerProps.value;
                    }
                });
            }
            else {
                this.inferenceUrl = value;
            }
        }
    }
}

var __webpack_exports__default = __webpack_exports__.A;
export { __webpack_exports__default as default };
