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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter$1(thisArg, _arguments, P, generator) {
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

const NAME = "Layerr";
let __name = NAME;
function getGlobalName() {
    return __name;
}

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
[...CoreRoutes, ...Object.values(NativeRoute)];
[
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
 * Gets Jan's data folder path.
 *
 * @returns {Promise<string>} A Promise that resolves with Jan's data folder path.
 */
const getJanDataFolderPath = () => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.getJanDataFolderPath(); };
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
 * Get system information
 * @returns {Promise<any>} - A promise that resolves with the system information.
 */
const systemInformation = () => { var _a; return (_a = globalThis.core.api) === null || _a === void 0 ? void 0 : _a.systemInformation(); };

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
    if (typeof global !== "undefined") {
        return global;
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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var eventemitter3 = {exports: {}};

eventemitter3.exports;

(function (module) {

	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';

	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @private
	 */
	function Events() {}

	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Add a listener for a given event.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} once Specify if the listener is a one-time listener.
	 * @returns {EventEmitter}
	 * @private
	 */
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }

	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;

	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
	  else emitter._events[evt] = [emitter._events[evt], listener];

	  return emitter;
	}

	/**
	 * Clear event by name.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} evt The Event name.
	 * @private
	 */
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) emitter._events = new Events();
	  else delete emitter._events[evt];
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) return names;

	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Array} The registered listeners.
	 * @public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  var evt = prefix ? prefix + event : event
	    , handlers = this._events[evt];

	  if (!handlers) return [];
	  if (handlers.fn) return [handlers.fn];

	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
	    ee[i] = handlers[i].fn;
	  }

	  return ee;
	};

	/**
	 * Return the number of listeners listening to a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Number} The number of listeners.
	 * @public
	 */
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
	  var evt = prefix ? prefix + event : event
	    , listeners = this._events[evt];

	  if (!listeners) return 0;
	  if (listeners.fn) return 1;
	  return listeners.length;
	};

	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {*} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return this;
	  if (!fn) {
	    clearEvent(this, evt);
	    return this;
	  }

	  var listeners = this._events[evt];

	  if (listeners.fn) {
	    if (
	      listeners.fn === fn &&
	      (!once || listeners.once) &&
	      (!context || listeners.context === context)
	    ) {
	      clearEvent(this, evt);
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	        listeners[i].fn !== fn ||
	        (once && !listeners[i].once) ||
	        (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }

	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else clearEvent(this, evt);
	  }

	  return this;
	};

	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {(String|Symbol)} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;

	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) clearEvent(this, evt);
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	{
	  module.exports = EventEmitter;
	} 
} (eventemitter3));

var eventemitter3Exports = eventemitter3.exports;
var EventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

class TimeoutError$1 extends Error {
	constructor(message) {
		super(message);
		this.name = 'TimeoutError';
	}
}

/**
An error to be thrown when the request is aborted by AbortController.
DOMException is thrown instead of this Error when DOMException is available.
*/
class AbortError extends Error {
	constructor(message) {
		super();
		this.name = 'AbortError';
		this.message = message;
	}
}

/**
TODO: Remove AbortError and just throw DOMException when targeting Node 18.
*/
const getDOMException = errorMessage => globalThis.DOMException === undefined
	? new AbortError(errorMessage)
	: new DOMException(errorMessage);

/**
TODO: Remove below function and just 'reject(signal.reason)' when targeting Node 18.
*/
const getAbortedReason = signal => {
	const reason = signal.reason === undefined
		? getDOMException('This operation was aborted.')
		: signal.reason;

	return reason instanceof Error ? reason : getDOMException(reason);
};

function pTimeout(promise, options) {
	const {
		milliseconds,
		fallback,
		message,
		customTimers = {setTimeout, clearTimeout},
	} = options;

	let timer;
	let abortHandler;

	const wrappedPromise = new Promise((resolve, reject) => {
		if (typeof milliseconds !== 'number' || Math.sign(milliseconds) !== 1) {
			throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
		}

		if (options.signal) {
			const {signal} = options;
			if (signal.aborted) {
				reject(getAbortedReason(signal));
			}

			abortHandler = () => {
				reject(getAbortedReason(signal));
			};

			signal.addEventListener('abort', abortHandler, {once: true});
		}

		if (milliseconds === Number.POSITIVE_INFINITY) {
			promise.then(resolve, reject);
			return;
		}

		// We create the error outside of `setTimeout` to preserve the stack trace.
		const timeoutError = new TimeoutError$1();

		timer = customTimers.setTimeout.call(undefined, () => {
			if (fallback) {
				try {
					resolve(fallback());
				} catch (error) {
					reject(error);
				}

				return;
			}

			if (typeof promise.cancel === 'function') {
				promise.cancel();
			}

			if (message === false) {
				resolve();
			} else if (message instanceof Error) {
				reject(message);
			} else {
				timeoutError.message = message ?? `Promise timed out after ${milliseconds} milliseconds`;
				reject(timeoutError);
			}
		}, milliseconds);

		(async () => {
			try {
				resolve(await promise);
			} catch (error) {
				reject(error);
			}
		})();
	});

	const cancelablePromise = wrappedPromise.finally(() => {
		cancelablePromise.clear();
		if (abortHandler && options.signal) {
			options.signal.removeEventListener('abort', abortHandler);
		}
	});

	cancelablePromise.clear = () => {
		customTimers.clearTimeout.call(undefined, timer);
		timer = undefined;
	};

	return cancelablePromise;
}

// Port of lower_bound from https://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
function lowerBound(array, value, comparator) {
    let first = 0;
    let count = array.length;
    while (count > 0) {
        const step = Math.trunc(count / 2);
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
            first = ++it;
            count -= step + 1;
        }
        else {
            count = step;
        }
    }
    return first;
}

class PriorityQueue {
    #queue = [];
    enqueue(run, options) {
        options = {
            priority: 0,
            ...options,
        };
        const element = {
            priority: options.priority,
            id: options.id,
            run,
        };
        if (this.size === 0 || this.#queue[this.size - 1].priority >= options.priority) {
            this.#queue.push(element);
            return;
        }
        const index = lowerBound(this.#queue, element, (a, b) => b.priority - a.priority);
        this.#queue.splice(index, 0, element);
    }
    setPriority(id, priority) {
        const index = this.#queue.findIndex((element) => element.id === id);
        if (index === -1) {
            throw new ReferenceError(`No promise function with the id "${id}" exists in the queue.`);
        }
        const [item] = this.#queue.splice(index, 1);
        this.enqueue(item.run, { priority, id });
    }
    dequeue() {
        const item = this.#queue.shift();
        return item?.run;
    }
    filter(options) {
        return this.#queue.filter((element) => element.priority === options.priority).map((element) => element.run);
    }
    get size() {
        return this.#queue.length;
    }
}

/**
Promise queue with concurrency control.
*/
class PQueue extends EventEmitter {
    #carryoverConcurrencyCount;
    #isIntervalIgnored;
    #intervalCount = 0;
    #intervalCap;
    #interval;
    #intervalEnd = 0;
    #intervalId;
    #timeoutId;
    #queue;
    #queueClass;
    #pending = 0;
    // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
    #concurrency;
    #isPaused;
    #throwOnTimeout;
    // Use to assign a unique identifier to a promise function, if not explicitly specified
    #idAssigner = 1n;
    /**
    Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.

    Applies to each future operation.
    */
    timeout;
    // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
    constructor(options) {
        super();
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        options = {
            carryoverConcurrencyCount: false,
            intervalCap: Number.POSITIVE_INFINITY,
            interval: 0,
            concurrency: Number.POSITIVE_INFINITY,
            autoStart: true,
            queueClass: PriorityQueue,
            ...options,
        };
        if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
            throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${options.intervalCap?.toString() ?? ''}\` (${typeof options.intervalCap})`);
        }
        if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
            throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${options.interval?.toString() ?? ''}\` (${typeof options.interval})`);
        }
        this.#carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this.#isIntervalIgnored = options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0;
        this.#intervalCap = options.intervalCap;
        this.#interval = options.interval;
        this.#queue = new options.queueClass();
        this.#queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this.timeout = options.timeout;
        this.#throwOnTimeout = options.throwOnTimeout === true;
        this.#isPaused = options.autoStart === false;
    }
    get #doesIntervalAllowAnother() {
        return this.#isIntervalIgnored || this.#intervalCount < this.#intervalCap;
    }
    get #doesConcurrentAllowAnother() {
        return this.#pending < this.#concurrency;
    }
    #next() {
        this.#pending--;
        this.#tryToStartAnother();
        this.emit('next');
    }
    #onResumeInterval() {
        this.#onInterval();
        this.#initializeIntervalIfNeeded();
        this.#timeoutId = undefined;
    }
    get #isIntervalPaused() {
        const now = Date.now();
        if (this.#intervalId === undefined) {
            const delay = this.#intervalEnd - now;
            if (delay < 0) {
                // Act as the interval was done
                // We don't need to resume it here because it will be resumed on line 160
                this.#intervalCount = (this.#carryoverConcurrencyCount) ? this.#pending : 0;
            }
            else {
                // Act as the interval is pending
                if (this.#timeoutId === undefined) {
                    this.#timeoutId = setTimeout(() => {
                        this.#onResumeInterval();
                    }, delay);
                }
                return true;
            }
        }
        return false;
    }
    #tryToStartAnother() {
        if (this.#queue.size === 0) {
            // We can clear the interval ("pause")
            // Because we can redo it later ("resume")
            if (this.#intervalId) {
                clearInterval(this.#intervalId);
            }
            this.#intervalId = undefined;
            this.emit('empty');
            if (this.#pending === 0) {
                this.emit('idle');
            }
            return false;
        }
        if (!this.#isPaused) {
            const canInitializeInterval = !this.#isIntervalPaused;
            if (this.#doesIntervalAllowAnother && this.#doesConcurrentAllowAnother) {
                const job = this.#queue.dequeue();
                if (!job) {
                    return false;
                }
                this.emit('active');
                job();
                if (canInitializeInterval) {
                    this.#initializeIntervalIfNeeded();
                }
                return true;
            }
        }
        return false;
    }
    #initializeIntervalIfNeeded() {
        if (this.#isIntervalIgnored || this.#intervalId !== undefined) {
            return;
        }
        this.#intervalId = setInterval(() => {
            this.#onInterval();
        }, this.#interval);
        this.#intervalEnd = Date.now() + this.#interval;
    }
    #onInterval() {
        if (this.#intervalCount === 0 && this.#pending === 0 && this.#intervalId) {
            clearInterval(this.#intervalId);
            this.#intervalId = undefined;
        }
        this.#intervalCount = this.#carryoverConcurrencyCount ? this.#pending : 0;
        this.#processQueue();
    }
    /**
    Executes all queued functions until it reaches the limit.
    */
    #processQueue() {
        // eslint-disable-next-line no-empty
        while (this.#tryToStartAnother()) { }
    }
    get concurrency() {
        return this.#concurrency;
    }
    set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
            throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        }
        this.#concurrency = newConcurrency;
        this.#processQueue();
    }
    async #throwOnAbort(signal) {
        return new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () => {
                reject(signal.reason);
            }, { once: true });
        });
    }
    /**
    Updates the priority of a promise function by its id, affecting its execution order. Requires a defined concurrency limit to take effect.

    For example, this can be used to prioritize a promise function to run earlier.

    ```js
    import PQueue from 'p-queue';

    const queue = new PQueue({concurrency: 1});

    queue.add(async () => '🦄', {priority: 1});
    queue.add(async () => '🦀', {priority: 0, id: '🦀'});
    queue.add(async () => '🦄', {priority: 1});
    queue.add(async () => '🦄', {priority: 1});

    queue.setPriority('🦀', 2);
    ```

    In this case, the promise function with `id: '🦀'` runs second.

    You can also deprioritize a promise function to delay its execution:

    ```js
    import PQueue from 'p-queue';

    const queue = new PQueue({concurrency: 1});

    queue.add(async () => '🦄', {priority: 1});
    queue.add(async () => '🦀', {priority: 1, id: '🦀'});
    queue.add(async () => '🦄');
    queue.add(async () => '🦄', {priority: 0});

    queue.setPriority('🦀', -1);
    ```
    Here, the promise function with `id: '🦀'` executes last.
    */
    setPriority(id, priority) {
        this.#queue.setPriority(id, priority);
    }
    async add(function_, options = {}) {
        // In case `id` is not defined.
        options.id ??= (this.#idAssigner++).toString();
        options = {
            timeout: this.timeout,
            throwOnTimeout: this.#throwOnTimeout,
            ...options,
        };
        return new Promise((resolve, reject) => {
            this.#queue.enqueue(async () => {
                this.#pending++;
                this.#intervalCount++;
                try {
                    options.signal?.throwIfAborted();
                    let operation = function_({ signal: options.signal });
                    if (options.timeout) {
                        operation = pTimeout(Promise.resolve(operation), { milliseconds: options.timeout });
                    }
                    if (options.signal) {
                        operation = Promise.race([operation, this.#throwOnAbort(options.signal)]);
                    }
                    const result = await operation;
                    resolve(result);
                    this.emit('completed', result);
                }
                catch (error) {
                    if (error instanceof TimeoutError$1 && !options.throwOnTimeout) {
                        resolve();
                        return;
                    }
                    reject(error);
                    this.emit('error', error);
                }
                finally {
                    this.#next();
                }
            }, options);
            this.emit('add');
            this.#tryToStartAnother();
        });
    }
    async addAll(functions, options) {
        return Promise.all(functions.map(async (function_) => this.add(function_, options)));
    }
    /**
    Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
    */
    start() {
        if (!this.#isPaused) {
            return this;
        }
        this.#isPaused = false;
        this.#processQueue();
        return this;
    }
    /**
    Put queue execution on hold.
    */
    pause() {
        this.#isPaused = true;
    }
    /**
    Clear the queue.
    */
    clear() {
        this.#queue = new this.#queueClass();
    }
    /**
    Can be called multiple times. Useful if you for example add additional items at a later time.

    @returns A promise that settles when the queue becomes empty.
    */
    async onEmpty() {
        // Instantly resolve if the queue is empty
        if (this.#queue.size === 0) {
            return;
        }
        await this.#onEvent('empty');
    }
    /**
    @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.

    If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.

    Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
    */
    async onSizeLessThan(limit) {
        // Instantly resolve if the queue is empty.
        if (this.#queue.size < limit) {
            return;
        }
        await this.#onEvent('next', () => this.#queue.size < limit);
    }
    /**
    The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.

    @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
    */
    async onIdle() {
        // Instantly resolve if none pending and if nothing else is queued
        if (this.#pending === 0 && this.#queue.size === 0) {
            return;
        }
        await this.#onEvent('idle');
    }
    async #onEvent(event, filter) {
        return new Promise(resolve => {
            const listener = () => {
                if (filter && !filter()) {
                    return;
                }
                this.off(event, listener);
                resolve();
            };
            this.on(event, listener);
        });
    }
    /**
    Size of the queue, the number of queued items waiting to run.
    */
    get size() {
        return this.#queue.size;
    }
    /**
    Size of the queue, filtered by the given options.

    For example, this can be used to find the number of items remaining in the queue with a specific priority level.
    */
    sizeBy(options) {
        // eslint-disable-next-line unicorn/no-array-callback-reference
        return this.#queue.filter(options).length;
    }
    /**
    Number of running items (no longer in the queue).
    */
    get pending() {
        return this.#pending;
    }
    /**
    Whether the queue is currently paused.
    */
    get isPaused() {
        return this.#isPaused;
    }
}

class HTTPError extends Error {
    response;
    request;
    options;
    constructor(response, request, options) {
        const code = (response.status || response.status === 0) ? response.status : '';
        const title = response.statusText || '';
        const status = `${code} ${title}`.trim();
        const reason = status ? `status code ${status}` : 'an unknown error';
        super(`Request failed with ${reason}: ${request.method} ${request.url}`);
        this.name = 'HTTPError';
        this.response = response;
        this.request = request;
        this.options = options;
    }
}

class TimeoutError extends Error {
    request;
    constructor(request) {
        super(`Request timed out: ${request.method} ${request.url}`);
        this.name = 'TimeoutError';
        this.request = request;
    }
}

// eslint-disable-next-line @typescript-eslint/ban-types
const isObject = (value) => value !== null && typeof value === 'object';

const validateAndMerge = (...sources) => {
    for (const source of sources) {
        if ((!isObject(source) || Array.isArray(source)) && source !== undefined) {
            throw new TypeError('The `options` argument must be an object');
        }
    }
    return deepMerge({}, ...sources);
};
const mergeHeaders = (source1 = {}, source2 = {}) => {
    const result = new globalThis.Headers(source1);
    const isHeadersInstance = source2 instanceof globalThis.Headers;
    const source = new globalThis.Headers(source2);
    for (const [key, value] of source.entries()) {
        if ((isHeadersInstance && value === 'undefined') || value === undefined) {
            result.delete(key);
        }
        else {
            result.set(key, value);
        }
    }
    return result;
};
function newHookValue(original, incoming, property) {
    return (Object.hasOwn(incoming, property) && incoming[property] === undefined)
        ? []
        : deepMerge(original[property] ?? [], incoming[property] ?? []);
}
const mergeHooks = (original = {}, incoming = {}) => ({
    beforeRequest: newHookValue(original, incoming, 'beforeRequest'),
    beforeRetry: newHookValue(original, incoming, 'beforeRetry'),
    afterResponse: newHookValue(original, incoming, 'afterResponse'),
    beforeError: newHookValue(original, incoming, 'beforeError'),
});
// TODO: Make this strongly-typed (no `any`).
const deepMerge = (...sources) => {
    let returnValue = {};
    let headers = {};
    let hooks = {};
    for (const source of sources) {
        if (Array.isArray(source)) {
            if (!Array.isArray(returnValue)) {
                returnValue = [];
            }
            returnValue = [...returnValue, ...source];
        }
        else if (isObject(source)) {
            for (let [key, value] of Object.entries(source)) {
                if (isObject(value) && key in returnValue) {
                    value = deepMerge(returnValue[key], value);
                }
                returnValue = { ...returnValue, [key]: value };
            }
            if (isObject(source.hooks)) {
                hooks = mergeHooks(hooks, source.hooks);
                returnValue.hooks = hooks;
            }
            if (isObject(source.headers)) {
                headers = mergeHeaders(headers, source.headers);
                returnValue.headers = headers;
            }
        }
    }
    return returnValue;
};

const supportsRequestStreams = (() => {
    let duplexAccessed = false;
    let hasContentType = false;
    const supportsReadableStream = typeof globalThis.ReadableStream === 'function';
    const supportsRequest = typeof globalThis.Request === 'function';
    if (supportsReadableStream && supportsRequest) {
        try {
            hasContentType = new globalThis.Request('https://empty.invalid', {
                body: new globalThis.ReadableStream(),
                method: 'POST',
                // @ts-expect-error - Types are outdated.
                get duplex() {
                    duplexAccessed = true;
                    return 'half';
                },
            }).headers.has('Content-Type');
        }
        catch (error) {
            // QQBrowser on iOS throws "unsupported BodyInit type" error (see issue #581)
            if (error instanceof Error && error.message === 'unsupported BodyInit type') {
                return false;
            }
            throw error;
        }
    }
    return duplexAccessed && !hasContentType;
})();
const supportsAbortController = typeof globalThis.AbortController === 'function';
const supportsResponseStreams = typeof globalThis.ReadableStream === 'function';
const supportsFormData = typeof globalThis.FormData === 'function';
const requestMethods = ['get', 'post', 'put', 'patch', 'head', 'delete'];
const responseTypes = {
    json: 'application/json',
    text: 'text/*',
    formData: 'multipart/form-data',
    arrayBuffer: '*/*',
    blob: '*/*',
};
// The maximum value of a 32bit int (see issue #117)
const maxSafeTimeout = 2_147_483_647;
const stop = Symbol('stop');
const kyOptionKeys = {
    json: true,
    parseJson: true,
    stringifyJson: true,
    searchParams: true,
    prefixUrl: true,
    retry: true,
    timeout: true,
    hooks: true,
    throwHttpErrors: true,
    onDownloadProgress: true,
    fetch: true,
};
const requestOptionsRegistry = {
    method: true,
    headers: true,
    body: true,
    mode: true,
    credentials: true,
    cache: true,
    redirect: true,
    referrer: true,
    referrerPolicy: true,
    integrity: true,
    keepalive: true,
    signal: true,
    window: true,
    dispatcher: true,
    duplex: true,
    priority: true,
};

const normalizeRequestMethod = (input) => requestMethods.includes(input) ? input.toUpperCase() : input;
const retryMethods = ['get', 'put', 'head', 'delete', 'options', 'trace'];
const retryStatusCodes = [408, 413, 429, 500, 502, 503, 504];
const retryAfterStatusCodes = [413, 429, 503];
const defaultRetryOptions = {
    limit: 2,
    methods: retryMethods,
    statusCodes: retryStatusCodes,
    afterStatusCodes: retryAfterStatusCodes,
    maxRetryAfter: Number.POSITIVE_INFINITY,
    backoffLimit: Number.POSITIVE_INFINITY,
    delay: attemptCount => 0.3 * (2 ** (attemptCount - 1)) * 1000,
};
const normalizeRetryOptions = (retry = {}) => {
    if (typeof retry === 'number') {
        return {
            ...defaultRetryOptions,
            limit: retry,
        };
    }
    if (retry.methods && !Array.isArray(retry.methods)) {
        throw new Error('retry.methods must be an array');
    }
    if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
        throw new Error('retry.statusCodes must be an array');
    }
    return {
        ...defaultRetryOptions,
        ...retry,
    };
};

// `Promise.race()` workaround (#91)
async function timeout(request, init, abortController, options) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            if (abortController) {
                abortController.abort();
            }
            reject(new TimeoutError(request));
        }, options.timeout);
        void options
            .fetch(request, init)
            .then(resolve)
            .catch(reject)
            .then(() => {
            clearTimeout(timeoutId);
        });
    });
}

// https://github.com/sindresorhus/delay/tree/ab98ae8dfcb38e1593286c94d934e70d14a4e111
async function delay(ms, { signal }) {
    return new Promise((resolve, reject) => {
        if (signal) {
            signal.throwIfAborted();
            signal.addEventListener('abort', abortHandler, { once: true });
        }
        function abortHandler() {
            clearTimeout(timeoutId);
            reject(signal.reason);
        }
        const timeoutId = setTimeout(() => {
            signal?.removeEventListener('abort', abortHandler);
            resolve();
        }, ms);
    });
}

const findUnknownOptions = (request, options) => {
    const unknownOptions = {};
    for (const key in options) {
        if (!(key in requestOptionsRegistry) && !(key in kyOptionKeys) && !(key in request)) {
            unknownOptions[key] = options[key];
        }
    }
    return unknownOptions;
};

class Ky {
    static create(input, options) {
        const ky = new Ky(input, options);
        const function_ = async () => {
            if (typeof ky._options.timeout === 'number' && ky._options.timeout > maxSafeTimeout) {
                throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);
            }
            // Delay the fetch so that body method shortcuts can set the Accept header
            await Promise.resolve();
            let response = await ky._fetch();
            for (const hook of ky._options.hooks.afterResponse) {
                // eslint-disable-next-line no-await-in-loop
                const modifiedResponse = await hook(ky.request, ky._options, ky._decorateResponse(response.clone()));
                if (modifiedResponse instanceof globalThis.Response) {
                    response = modifiedResponse;
                }
            }
            ky._decorateResponse(response);
            if (!response.ok && ky._options.throwHttpErrors) {
                let error = new HTTPError(response, ky.request, ky._options);
                for (const hook of ky._options.hooks.beforeError) {
                    // eslint-disable-next-line no-await-in-loop
                    error = await hook(error);
                }
                throw error;
            }
            // If `onDownloadProgress` is passed, it uses the stream API internally
            /* istanbul ignore next */
            if (ky._options.onDownloadProgress) {
                if (typeof ky._options.onDownloadProgress !== 'function') {
                    throw new TypeError('The `onDownloadProgress` option must be a function');
                }
                if (!supportsResponseStreams) {
                    throw new Error('Streams are not supported in your environment. `ReadableStream` is missing.');
                }
                return ky._stream(response.clone(), ky._options.onDownloadProgress);
            }
            return response;
        };
        const isRetriableMethod = ky._options.retry.methods.includes(ky.request.method.toLowerCase());
        const result = (isRetriableMethod ? ky._retry(function_) : function_());
        for (const [type, mimeType] of Object.entries(responseTypes)) {
            result[type] = async () => {
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                ky.request.headers.set('accept', ky.request.headers.get('accept') || mimeType);
                const response = await result;
                if (type === 'json') {
                    if (response.status === 204) {
                        return '';
                    }
                    const arrayBuffer = await response.clone().arrayBuffer();
                    const responseSize = arrayBuffer.byteLength;
                    if (responseSize === 0) {
                        return '';
                    }
                    if (options.parseJson) {
                        return options.parseJson(await response.text());
                    }
                }
                return response[type]();
            };
        }
        return result;
    }
    request;
    abortController;
    _retryCount = 0;
    _input;
    _options;
    // eslint-disable-next-line complexity
    constructor(input, options = {}) {
        this._input = input;
        this._options = {
            ...options,
            headers: mergeHeaders(this._input.headers, options.headers),
            hooks: mergeHooks({
                beforeRequest: [],
                beforeRetry: [],
                beforeError: [],
                afterResponse: [],
            }, options.hooks),
            method: normalizeRequestMethod(options.method ?? this._input.method),
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            prefixUrl: String(options.prefixUrl || ''),
            retry: normalizeRetryOptions(options.retry),
            throwHttpErrors: options.throwHttpErrors !== false,
            timeout: options.timeout ?? 10_000,
            fetch: options.fetch ?? globalThis.fetch.bind(globalThis),
        };
        if (typeof this._input !== 'string' && !(this._input instanceof URL || this._input instanceof globalThis.Request)) {
            throw new TypeError('`input` must be a string, URL, or Request');
        }
        if (this._options.prefixUrl && typeof this._input === 'string') {
            if (this._input.startsWith('/')) {
                throw new Error('`input` must not begin with a slash when using `prefixUrl`');
            }
            if (!this._options.prefixUrl.endsWith('/')) {
                this._options.prefixUrl += '/';
            }
            this._input = this._options.prefixUrl + this._input;
        }
        if (supportsAbortController) {
            this.abortController = new globalThis.AbortController();
            const originalSignal = this._options.signal ?? this._input.signal;
            if (originalSignal?.aborted) {
                this.abortController.abort(originalSignal?.reason);
            }
            originalSignal?.addEventListener('abort', () => {
                this.abortController.abort(originalSignal.reason);
            });
            this._options.signal = this.abortController.signal;
        }
        if (supportsRequestStreams) {
            // @ts-expect-error - Types are outdated.
            this._options.duplex = 'half';
        }
        if (this._options.json !== undefined) {
            this._options.body = this._options.stringifyJson?.(this._options.json) ?? JSON.stringify(this._options.json);
            this._options.headers.set('content-type', this._options.headers.get('content-type') ?? 'application/json');
        }
        this.request = new globalThis.Request(this._input, this._options);
        if (this._options.searchParams) {
            // eslint-disable-next-line unicorn/prevent-abbreviations
            const textSearchParams = typeof this._options.searchParams === 'string'
                ? this._options.searchParams.replace(/^\?/, '')
                : new URLSearchParams(this._options.searchParams).toString();
            // eslint-disable-next-line unicorn/prevent-abbreviations
            const searchParams = '?' + textSearchParams;
            const url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams);
            // To provide correct form boundary, Content-Type header should be deleted each time when new Request instantiated from another one
            if (((supportsFormData && this._options.body instanceof globalThis.FormData)
                || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers['content-type'])) {
                this.request.headers.delete('content-type');
            }
            // The spread of `this.request` is required as otherwise it misses the `duplex` option for some reason and throws.
            this.request = new globalThis.Request(new globalThis.Request(url, { ...this.request }), this._options);
        }
    }
    _calculateRetryDelay(error) {
        this._retryCount++;
        if (this._retryCount > this._options.retry.limit || error instanceof TimeoutError) {
            throw error;
        }
        if (error instanceof HTTPError) {
            if (!this._options.retry.statusCodes.includes(error.response.status)) {
                throw error;
            }
            const retryAfter = error.response.headers.get('Retry-After')
                ?? error.response.headers.get('RateLimit-Reset')
                ?? error.response.headers.get('X-RateLimit-Reset') // GitHub
                ?? error.response.headers.get('X-Rate-Limit-Reset'); // Twitter
            if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
                let after = Number(retryAfter) * 1000;
                if (Number.isNaN(after)) {
                    after = Date.parse(retryAfter) - Date.now();
                }
                else if (after >= Date.parse('2024-01-01')) {
                    // A large number is treated as a timestamp (fixed threshold protects against clock skew)
                    after -= Date.now();
                }
                const max = this._options.retry.maxRetryAfter ?? after;
                return after < max ? after : max;
            }
            if (error.response.status === 413) {
                throw error;
            }
        }
        const retryDelay = this._options.retry.delay(this._retryCount);
        return Math.min(this._options.retry.backoffLimit, retryDelay);
    }
    _decorateResponse(response) {
        if (this._options.parseJson) {
            response.json = async () => this._options.parseJson(await response.text());
        }
        return response;
    }
    async _retry(function_) {
        try {
            return await function_();
        }
        catch (error) {
            const ms = Math.min(this._calculateRetryDelay(error), maxSafeTimeout);
            if (this._retryCount < 1) {
                throw error;
            }
            await delay(ms, { signal: this._options.signal });
            for (const hook of this._options.hooks.beforeRetry) {
                // eslint-disable-next-line no-await-in-loop
                const hookResult = await hook({
                    request: this.request,
                    options: this._options,
                    error: error,
                    retryCount: this._retryCount,
                });
                // If `stop` is returned from the hook, the retry process is stopped
                if (hookResult === stop) {
                    return;
                }
            }
            return this._retry(function_);
        }
    }
    async _fetch() {
        for (const hook of this._options.hooks.beforeRequest) {
            // eslint-disable-next-line no-await-in-loop
            const result = await hook(this.request, this._options);
            if (result instanceof Request) {
                this.request = result;
                break;
            }
            if (result instanceof Response) {
                return result;
            }
        }
        const nonRequestOptions = findUnknownOptions(this.request, this._options);
        // Cloning is done here to prepare in advance for retries
        const mainRequest = this.request;
        this.request = mainRequest.clone();
        if (this._options.timeout === false) {
            return this._options.fetch(mainRequest, nonRequestOptions);
        }
        return timeout(mainRequest, nonRequestOptions, this.abortController, this._options);
    }
    /* istanbul ignore next */
    _stream(response, onDownloadProgress) {
        const totalBytes = Number(response.headers.get('content-length')) || 0;
        let transferredBytes = 0;
        if (response.status === 204) {
            if (onDownloadProgress) {
                onDownloadProgress({ percent: 1, totalBytes, transferredBytes }, new Uint8Array());
            }
            return new globalThis.Response(null, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            });
        }
        return new globalThis.Response(new globalThis.ReadableStream({
            async start(controller) {
                const reader = response.body.getReader();
                if (onDownloadProgress) {
                    onDownloadProgress({ percent: 0, transferredBytes: 0, totalBytes }, new Uint8Array());
                }
                async function read() {
                    const { done, value } = await reader.read();
                    if (done) {
                        controller.close();
                        return;
                    }
                    if (onDownloadProgress) {
                        transferredBytes += value.byteLength;
                        const percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
                        onDownloadProgress({ percent, transferredBytes, totalBytes }, value);
                    }
                    controller.enqueue(value);
                    await read();
                }
                await read();
            },
        }), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
    }
}

/*! MIT License © Sindre Sorhus */
const createInstance = (defaults) => {
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const ky = (input, options) => Ky.create(input, validateAndMerge(defaults, options));
    for (const method of requestMethods) {
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        ky[method] = (input, options) => Ky.create(input, validateAndMerge(defaults, options, { method }));
    }
    ky.create = (newDefaults) => createInstance(validateAndMerge(newDefaults));
    ky.extend = (newDefaults) => {
        if (typeof newDefaults === 'function') {
            newDefaults = newDefaults(defaults ?? {});
        }
        return createInstance(validateAndMerge(defaults, newDefaults));
    };
    ky.stop = stop;
    return ky;
};
const ky = createInstance();
var ky$1 = ky;

/**
 * @file This file exports a class that implements the InferenceExtension interface from the @janhq/core package.
 * The class provides methods for initializing and stopping a model, and for making inference requests.
 * It also subscribes to events emitted by the @janhq/core package and handles new message requests.
 * @version 1.0.0
 * @module inference-extension/src/index
 */
/**
 * Event subscription types of Downloader
 */
var DownloadTypes;
(function (DownloadTypes) {
    DownloadTypes["DownloadUpdated"] = "onFileDownloadUpdate";
    DownloadTypes["DownloadError"] = "onFileDownloadError";
    DownloadTypes["DownloadSuccess"] = "onFileDownloadSuccess";
    DownloadTypes["DownloadStopped"] = "onFileDownloadStopped";
    DownloadTypes["DownloadStarted"] = "onFileDownloadStarted";
})(DownloadTypes || (DownloadTypes = {}));
var Settings;
(function (Settings) {
    Settings["n_parallel"] = "n_parallel";
    Settings["cont_batching"] = "cont_batching";
    Settings["caching_enabled"] = "caching_enabled";
    Settings["flash_attn"] = "flash_attn";
    Settings["cache_type"] = "cache_type";
    Settings["use_mmap"] = "use_mmap";
    Settings["cpu_threads"] = "cpu_threads";
})(Settings || (Settings = {}));
/**
 * A class that implements the InferenceExtension interface from the @janhq/core package.
 * The class provides methods for initializing and stopping a model, and for making inference requests.
 * It also subscribes to events emitted by the @janhq/core package and handles new message requests.
 */
class JanInferenceCortexExtension extends LocalOAIEngine {
    constructor() {
        super(...arguments);
        this.nodeModule = 'node';
        this.queue = new PQueue({ concurrency: 1 });
        this.provider = InferenceEngine.cortex;
        this.shouldReconnect = true;
        /** Default Engine model load settings */
        this.n_parallel = 4;
        this.cont_batching = true;
        this.caching_enabled = true;
        this.flash_attn = true;
        this.use_mmap = true;
        this.cache_type = 'f16';
        /**
         * The URL for making inference requests.
         */
        this.inferenceUrl = `${"http://127.0.0.1:39291"}/v1/chat/completions`;
        /**
         * Socket instance of events subscription
         */
        this.socket = undefined;
        this.abortControllers = new Map();
    }
    /**
     * Subscribes to events emitted by the @janhq/core package.
     */
    onLoad() {
        const _super = Object.create(null, {
            onLoad: { get: () => super.onLoad }
        });
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a, _b;
            const models = [{ "sources": [{ "filename": "ggml-model-q5_k.gguf", "url": "https://huggingface.co/mys/ggml_bakllava-1/resolve/main/ggml-model-q5_k.gguf" }, { "filename": "mmproj-model-f16.gguf", "url": "https://huggingface.co/mys/ggml_bakllava-1/resolve/main/mmproj-model-f16.gguf" }], "id": "bakllava-1", "object": "model", "name": "BakLlava 1", "version": "1.0", "description": "BakLlava 1 can bring vision understanding to Jan", "format": "gguf", "settings": { "vision_model": true, "text_model": false, "ctx_len": 4096, "prompt_template": "\n### Instruction:\n{prompt}\n### Response:\n", "llama_model_path": "ggml-model-q5_k.gguf", "mmproj": "mmproj-model-f16.gguf", "ngl": 33 }, "parameters": { "max_tokens": 4096 }, "metadata": { "author": "Mys", "tags": ["Vision"], "size": 5750000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "codeninja-1.0-openchat-7b.Q4_K_M.gguf", "url": "https://huggingface.co/beowolx/CodeNinja-1.0-OpenChat-7B-GGUF/resolve/main/codeninja-1.0-openchat-7b.Q4_K_M.gguf" }], "id": "codeninja-1.0-7b", "object": "model", "name": "CodeNinja 7B Q4", "version": "1.2", "description": "CodeNinja is good for coding tasks and can handle various languages including Python, C, C++, Rust, Java, JavaScript, and more.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "GPT4 Correct User: {prompt}<|end_of_turn|>GPT4 Correct Assistant:", "llama_model_path": "codeninja-1.0-openchat-7b.Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Beowolx", "tags": ["7B", "Finetuned"], "size": 4370000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "c4ai-command-r-v01-Q4_K_M.gguf", "url": "https://huggingface.co/andrewcanis/c4ai-command-r-v01-GGUF/resolve/main/c4ai-command-r-v01-Q4_K_M.gguf" }], "id": "command-r-34b", "object": "model", "name": "Command-R v01 34B Q4", "version": "1.6", "description": "C4AI Command-R developed by CohereAI is optimized for a variety of use cases including reasoning, summarization, and question answering.", "format": "gguf", "settings": { "ctx_len": 131072, "prompt_template": "<|START_OF_TURN_TOKEN|><|USER_TOKEN|>{prompt}<|END_OF_TURN_TOKEN|><|START_OF_TURN_TOKEN|><|CHATBOT_TOKEN|>", "llama_model_path": "c4ai-command-r-v01-Q4_K_M.gguf", "ngl": 41 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 131072, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "CohereAI", "tags": ["34B", "Finetuned"], "size": 21500000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "deepseek-coder-1.3b-instruct.Q8_0.gguf", "url": "https://huggingface.co/TheBloke/deepseek-coder-1.3b-instruct-GGUF/resolve/main/deepseek-coder-1.3b-instruct.Q8_0.gguf" }], "id": "deepseek-coder-1.3b", "object": "model", "name": "Deepseek Coder 1.3B Instruct Q8", "version": "1.4", "description": "Deepseek Coder excelled in project-level code completion with advanced capabilities across multiple programming languages.", "format": "gguf", "settings": { "ctx_len": 16384, "prompt_template": "### Instruction:\n{prompt}\n### Response:", "llama_model_path": "deepseek-coder-1.3b-instruct.Q8_0.gguf", "ngl": 25 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 16384, "stop": ["<|EOT|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Deepseek, The Bloke", "tags": ["Tiny"], "size": 1430000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "deepseek-coder-33b-instruct.Q4_K_M.gguf", "url": "https://huggingface.co/mradermacher/deepseek-coder-33b-instruct-GGUF/resolve/main/deepseek-coder-33b-instruct.Q4_K_M.gguf" }], "id": "deepseek-coder-34b", "object": "model", "name": "Deepseek Coder 33B Instruct Q4", "version": "1.4", "description": "Deepseek Coder excelled in project-level code completion with advanced capabilities across multiple programming languages.", "format": "gguf", "settings": { "ctx_len": 16384, "prompt_template": "### Instruction:\n{prompt}\n### Response:", "llama_model_path": "deepseek-coder-33b-instruct.Q4_K_M.gguf", "ngl": 63 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 16384, "stop": ["<|EOT|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Deepseek", "tags": ["33B"], "size": 19940000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "gemma-1.1-2b-it-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/gemma-1.1-2b-it-GGUF/resolve/main/gemma-1.1-2b-it-Q4_K_M.gguf" }], "id": "gemma-1.1-2b-it", "object": "model", "name": "Gemma 1.1 2B Q4", "version": "1.3", "description": "Gemma is built from the same technology with Google's Gemini.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<start_of_turn>user\n{prompt}<end_of_turn>\n<start_of_turn>model", "llama_model_path": "gemma-1.1-2b-it-Q4_K_M.gguf", "ngl": 19 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<end_of_turn>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Google", "tags": ["2B", "Finetuned", "Tiny"], "size": 1630000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "gemma-1.1-7b-it-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/gemma-1.1-7b-it-GGUF/resolve/main/gemma-1.1-7b-it-Q4_K_M.gguf" }], "id": "gemma-1.1-7b-it", "object": "model", "name": "Gemma 1.1 7B Q4", "version": "1.3", "description": "Google's Gemma is built for multilingual purpose", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<start_of_turn>user\n{prompt}<end_of_turn>\n<start_of_turn>model", "llama_model_path": "gemma-1.1-7b-it-Q4_K_M.gguf", "ngl": 29 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Google", "tags": ["7B", "Finetuned"], "size": 5330000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "llama-2-70b-chat.Q4_K_M.gguf", "url": "https://huggingface.co/TheBloke/Llama-2-70B-Chat-GGUF/resolve/main/llama-2-70b-chat.Q4_K_M.gguf" }], "id": "llama2-chat-70b", "object": "model", "name": "Llama 2 Chat 70B Q4", "version": "1.1", "description": "Llama 2 specifically designed for a comprehensive understanding the world.", "format": "gguf", "settings": { "ctx_len": 4096, "prompt_template": "[INST] <<SYS>>\n{system_message}<</SYS>>\n{prompt}[/INST]", "llama_model_path": "llama-2-70b-chat.Q4_K_M.gguf", "ngl": 81 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 4096, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MetaAI", "tags": ["70B", "Foundational Model"], "size": 43920000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "llama-2-7b-chat.Q4_K_M.gguf", "url": "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf" }], "id": "llama2-chat-7b", "object": "model", "name": "Llama 2 Chat 7B Q4", "version": "1.1", "description": "Llama 2 specifically designed for a comprehensive understanding the world.", "format": "gguf", "settings": { "ctx_len": 4096, "prompt_template": "[INST] <<SYS>>\n{system_message}<</SYS>>\n{prompt}[/INST]", "llama_model_path": "llama-2-7b-chat.Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 4096, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MetaAI", "tags": ["7B", "Foundational Model"], "size": 4080000000 }, "engine": "llama-cpp" }, { "sources": [{ "url": "https://huggingface.co/janhq/llamacorn-1.1b-chat-GGUF/resolve/main/llamacorn-1.1b-chat.Q8_0.gguf", "filename": "llamacorn-1.1b-chat.Q8_0.gguf" }], "id": "llamacorn-1.1b", "object": "model", "name": "LlamaCorn 1.1B Q8", "version": "1.1", "description": "LlamaCorn is designed to improve chat functionality from TinyLlama.", "format": "gguf", "settings": { "ctx_len": 2048, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "llamacorn-1.1b-chat.Q8_0.gguf", "ngl": 23 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 2048, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Jan", "tags": ["Tiny", "Finetuned"], "size": 1170000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "llava-v1.6-vicuna-13b.Q4_K_M.gguf", "url": "https://huggingface.co/cjpais/llava-v1.6-vicuna-13b-gguf/resolve/main/llava-v1.6-vicuna-13b.Q4_K_M.gguf" }, { "filename": "mmproj-model-f16.gguf", "url": "https://huggingface.co/cjpais/llava-v1.6-vicuna-13b-gguf/resolve/main/mmproj-model-f16.gguf" }], "id": "llava-13b", "object": "model", "name": "LlaVa 13B Q4", "version": "1.2", "description": "LlaVa can bring vision understanding to Jan", "format": "gguf", "settings": { "vision_model": true, "text_model": false, "ctx_len": 4096, "prompt_template": "\n### Instruction:\n{prompt}\n### Response:\n", "llama_model_path": "llava-v1.6-vicuna-13b.Q4_K_M.gguf", "mmproj": "mmproj-model-f16.gguf", "ngl": 33 }, "parameters": { "max_tokens": 4096, "stop": ["</s>"] }, "metadata": { "author": "liuhaotian", "tags": ["Vision"], "size": 7870000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "llava-v1.6-mistral-7b.Q4_K_M.gguf", "url": "https://huggingface.co/cjpais/llava-1.6-mistral-7b-gguf/resolve/main/llava-v1.6-mistral-7b.Q4_K_M.gguf" }, { "filename": "mmproj-model-f16.gguf", "url": "https://huggingface.co/cjpais/llava-1.6-mistral-7b-gguf/resolve/main/mmproj-model-f16.gguf" }], "id": "llava-7b", "object": "model", "name": "LlaVa 7B", "version": "1.2", "description": "LlaVa can bring vision understanding to Jan", "format": "gguf", "settings": { "vision_model": true, "text_model": false, "ctx_len": 4096, "prompt_template": "\n### Instruction:\n{prompt}\n### Response:\n", "llama_model_path": "llava-v1.6-mistral-7b.Q4_K_M.gguf", "mmproj": "mmproj-model-f16.gguf", "ngl": 33 }, "parameters": { "max_tokens": 4096, "stop": ["</s>"] }, "metadata": { "author": "liuhaotian", "tags": ["Vision"], "size": 4370000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Mistral-7B-Instruct-v0.3-GGUF/resolve/main/Mistral-7B-Instruct-v0.3-Q4_K_M.gguf" }], "id": "mistral-ins-7b-q4", "object": "model", "name": "Mistral 7B Instruct Q4", "version": "1.5", "description": "Mistral 7B Instruct model, specifically designed for a comprehensive understanding of the world.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "{system_message} [INST] {prompt} [/INST]", "llama_model_path": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": ["[/INST]"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MistralAI", "tags": ["7B", "Foundational Model"], "size": 4370000000, "cover": "https://raw.githubusercontent.com/janhq/jan/dev/models/mistral-ins-7b-q4/cover.png" }, "engine": "llama-cpp" }, { "sources": [{ "filename": "mixtral-8x7b-instruct-v0.1.Q4_K_M.gguf", "url": "https://huggingface.co/TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF/resolve/main/mixtral-8x7b-instruct-v0.1.Q4_K_M.gguf" }], "id": "mixtral-8x7b-instruct", "object": "model", "name": "Mixtral 8x7B Instruct Q4", "version": "1.1", "description": "The Mixtral-8x7B is a pretrained generative Sparse Mixture of Experts. The Mixtral-8x7B outperforms 70B models on most benchmarks.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "[INST] {prompt} [/INST]", "llama_model_path": "mixtral-8x7b-instruct-v0.1.Q4_K_M.gguf", "ngl": 100 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MistralAI, TheBloke", "tags": ["70B", "Foundational Model"], "size": 26440000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Noromaid-7B-0.4-DPO.q4_k_m.gguf", "url": "https://huggingface.co/NeverSleep/Noromaid-7B-0.4-DPO-GGUF/resolve/main/Noromaid-7B-0.4-DPO.q4_k_m.gguf" }], "id": "noromaid-7b", "object": "model", "name": "Noromaid 7B Q4", "version": "1.2", "description": "The Noromaid 7b model is designed for role-playing with human-like behavior.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Noromaid-7B-0.4-DPO.q4_k_m.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "NeverSleep", "tags": ["7B", "Finetuned"], "size": 4370000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "openchat-3.5-0106.Q4_K_M.gguf", "url": "https://huggingface.co/TheBloke/openchat-3.5-0106-GGUF/resolve/main/openchat-3.5-0106.Q4_K_M.gguf" }], "id": "openchat-3.5-7b", "object": "model", "name": "Openchat-3.5 7B Q4", "version": "1.2", "description": "The performance of Openchat surpasses ChatGPT-3.5 and Grok-1 across various benchmarks.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "GPT4 Correct User: {prompt}<|end_of_turn|>GPT4 Correct Assistant:", "llama_model_path": "openchat-3.5-0106.Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<|end_of_turn|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Openchat", "tags": ["Recommended", "7B", "Finetuned"], "size": 4370000000 }, "engine": "llama-cpp" }, { "sources": [{ "url": "https://huggingface.co/bartowski/Phi-3-mini-4k-instruct-GGUF/resolve/main/Phi-3-mini-4k-instruct-Q4_K_M.gguf", "filename": "Phi-3-mini-4k-instruct-Q4_K_M.gguf" }], "id": "phi3-3.8b", "object": "model", "name": "Phi-3 Mini Instruct Q4", "version": "1.3", "description": "Phi-3 Mini is Microsoft's newest, compact model designed for mobile use.", "format": "gguf", "settings": { "ctx_len": 4096, "prompt_template": "<|user|>\n{prompt}<|end|>\n<|assistant|>\n", "llama_model_path": "Phi-3-mini-4k-instruct-Q4_K_M.gguf", "ngl": 33 }, "parameters": { "max_tokens": 4096, "stop": ["<|end|>"], "temperature": 0.7, "top_p": 0.95, "stream": true, "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Microsoft", "tags": ["3B", "Finetuned"], "size": 2320000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "phind-codellama-34b-v2.Q5_K_M.gguf", "url": "https://huggingface.co/TheBloke/Phind-CodeLlama-34B-v2-GGUF/resolve/main/phind-codellama-34b-v2.Q5_K_M.gguf" }], "id": "phind-34b", "object": "model", "name": "Phind 34B Q4", "version": "1.3", "description": "Phind 34B is the best Open-source coding model.", "format": "gguf", "settings": { "ctx_len": 16384, "prompt_template": "### System Prompt\n{system_message}\n### User Message\n{prompt}\n### Assistant", "llama_model_path": "phind-codellama-34b-v2.Q4_K_M.gguf", "ngl": 49 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 16384, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Phind", "tags": ["34B", "Finetuned"], "size": 20220000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "qwen1_5-7b-chat-q4_k_m.gguf", "url": "https://huggingface.co/Qwen/Qwen1.5-7B-Chat-GGUF/resolve/main/qwen1_5-7b-chat-q4_k_m.gguf" }], "id": "qwen-7b", "object": "model", "name": "Qwen Chat 7B Q4", "version": "1.2", "description": "Qwen is optimized at Chinese, ideal for everyday tasks.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "qwen1_5-7b-chat-q4_k_m.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Alibaba", "tags": ["7B", "Finetuned"], "size": 4770000000 }, "engine": "llama-cpp" }, { "sources": [{ "url": "https://huggingface.co/TheBloke/stablelm-zephyr-3b-GGUF/resolve/main/stablelm-zephyr-3b.Q8_0.gguf", "filename": "stablelm-zephyr-3b.Q8_0.gguf" }], "id": "stable-zephyr-3b", "object": "model", "name": "Stable Zephyr 3B Q8", "version": "1.1", "description": "StableLM Zephyr 3B is a best model for low-end machine.", "format": "gguf", "settings": { "ctx_len": 4096, "prompt_template": "<|user|>\n{prompt}<|endoftext|>\n<|assistant|>", "llama_model_path": "stablelm-zephyr-3b.Q8_0.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 4096, "stop": ["<|endoftext|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "StabilityAI", "tags": ["3B", "Finetuned", "Tiny"], "size": 2970000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "stealth-v1.3.Q4_K_M.gguf", "url": "https://huggingface.co/janhq/stealth-v1.3-GGUF/resolve/main/stealth-v1.3.Q4_K_M.gguf" }], "id": "stealth-v1.2-7b", "object": "model", "name": "Stealth 7B Q4", "version": "1.2", "description": "This is a new experimental family designed to enhance Mathematical and Logical abilities.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "stealth-v1.3.Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Jan", "tags": ["7B", "Finetuned"], "size": 4370000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf", "url": "https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf" }], "id": "tinyllama-1.1b", "object": "model", "name": "TinyLlama Chat 1.1B Q4", "version": "1.1", "description": "TinyLlama is a tiny model with only 1.1B. It's a good model for less powerful computers.", "format": "gguf", "settings": { "ctx_len": 4096, "prompt_template": "<|system|>\n{system_message}<|user|>\n{prompt}<|assistant|>", "llama_model_path": "tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf", "ngl": 23 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 2048, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "TinyLlama", "tags": ["Tiny", "Foundation Model"], "size": 669000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "trinity-v1.2.Q4_K_M.gguf", "url": "https://huggingface.co/janhq/trinity-v1.2-GGUF/resolve/main/trinity-v1.2.Q4_K_M.gguf" }], "id": "trinity-v1.2-7b", "object": "model", "name": "Trinity-v1.2 7B Q4", "version": "1.2", "description": "Trinity is an experimental model merge using the Slerp method. Recommended for daily assistance purposes.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "trinity-v1.2.Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Jan", "tags": ["7B", "Merged"], "size": 4370000000, "cover": "https://raw.githubusercontent.com/janhq/jan/dev/models/trinity-v1.2-7b/cover.png" }, "engine": "llama-cpp" }, { "sources": [{ "filename": "vistral-7b-chat-dpo.Q4_K_M.gguf", "url": "https://huggingface.co/janhq/vistral-7b-chat-dpo-GGUF/resolve/main/vistral-7b-chat-dpo.Q4_K_M.gguf" }], "id": "vistral-7b", "object": "model", "name": "Vistral 7B Q4", "version": "1.2", "description": "Vistral 7B has a deep understanding of Vietnamese.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "[INST] <<SYS>>\n{system_message}\n<</SYS>>\n{prompt} [/INST]", "llama_model_path": "vistral-7b-chat-dpo.Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Viet Mistral, Jan", "tags": ["7B", "Finetuned"], "size": 4410000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "wizardcoder-python-13b-v1.0.Q4_K_M.gguf", "url": "https://huggingface.co/TheBloke/WizardCoder-Python-13B-V1.0-GGUF/resolve/main/wizardcoder-python-13b-v1.0.Q4_K_M.gguf" }], "id": "wizardcoder-13b", "object": "model", "name": "Wizard Coder Python 13B Q4", "version": "1.2", "description": "WizardCoder 13B is a Python coding model. This model demonstrate high proficiency in specific domains like coding and mathematics.", "format": "gguf", "settings": { "ctx_len": 16384, "prompt_template": "### Instruction:\n{prompt}\n### Response:", "llama_model_path": "wizardcoder-python-13b-v1.0.Q4_K_M.gguf", "ngl": 41 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 16384, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "WizardLM, The Bloke", "tags": ["Recommended", "13B", "Finetuned"], "size": 7870000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "yi-34b-chat.Q4_K_M.gguf", "url": "https://huggingface.co/TheBloke/Yi-34B-Chat-GGUF/resolve/main/yi-34b-chat.Q4_K_M.gguf" }], "id": "yi-34b", "object": "model", "name": "Yi 34B Q4", "version": "1.1", "description": "Yi-34B, a specialized chat model, is known for its diverse and creative responses and excels across various NLP tasks and benchmarks.", "format": "gguf", "settings": { "ctx_len": 4096, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "yi-34b-chat.Q4_K_M.gguf", "ngl": 61 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 4096, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "01-ai, The Bloke", "tags": ["34B", "Foundational Model"], "size": 20660000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Meta-Llama-3-8B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct-Q4_K_M.gguf" }], "id": "llama3-8b-instruct", "object": "model", "name": "Llama 3 8B Instruct Q4", "version": "1.4", "description": "Meta's Llama 3 excels at general usage situations, including chat, general world knowledge, and coding.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_message}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n", "llama_model_path": "Meta-Llama-3-8B-Instruct-Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<|end_of_text|>", "<|eot_id|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MetaAI", "tags": ["8B"], "size": 4920000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Hermes-2-Pro-Llama-3-8B-Q4_K_M.gguf", "url": "https://huggingface.co/NousResearch/Hermes-2-Pro-Llama-3-8B-GGUF/resolve/main/Hermes-2-Pro-Llama-3-8B-Q4_K_M.gguf" }], "id": "llama3-hermes-8b", "object": "model", "name": "Hermes Pro Llama 3 8B Q4", "version": "1.2", "description": "Hermes Pro is well-designed for General chat and JSON output.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Hermes-2-Pro-Llama-3-8B-Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "NousResearch", "tags": ["7B", "Finetuned"], "size": 4920000000 }, "engine": "llama-cpp" }, { "sources": [{ "url": "https://huggingface.co/bartowski/Phi-3-mini-4k-instruct-GGUF/resolve/main/Phi-3-mini-4k-instruct-Q4_K_M.gguf", "filename": "Phi-3-mini-4k-instruct-Q4_K_M.gguf" }], "id": "phi3-medium", "object": "model", "name": "Phi-3 Medium Instruct Q4", "version": "1.4", "description": "Phi-3 Medium is Microsoft's latest SOTA model.", "format": "gguf", "settings": { "ctx_len": 128000, "prompt_template": "<|user|> {prompt}<|end|><|assistant|>", "llama_model_path": "Phi-3-mini-4k-instruct-Q4_K_M.gguf", "ngl": 33 }, "parameters": { "max_tokens": 128000, "stop": ["<|end|>"], "temperature": 0.7, "top_p": 0.95, "stream": true, "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Microsoft", "tags": ["14B", "Finetuned"], "size": 8366000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "aya-23-8B-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/aya-23-8B-GGUF/resolve/main/aya-23-8B-Q4_K_M.gguf" }], "id": "aya-23-8b", "object": "model", "name": "Aya 23 8B Q4", "version": "1.2", "description": "Aya 23 can talk upto 23 languages fluently.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<|START_OF_TURN_TOKEN|><|SYSTEM_TOKEN|>{system_prompt}<|END_OF_TURN_TOKEN|><|START_OF_TURN_TOKEN|><|USER_TOKEN|>{prompt}<|END_OF_TURN_TOKEN|><|START_OF_TURN_TOKEN|><|CHATBOT_TOKEN|>", "llama_model_path": "aya-23-8B-Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "frequency_penalty": 0, "presence_penalty": 0, "stop": ["<|END_OF_TURN_TOKEN|>"] }, "metadata": { "author": "CohereForAI", "tags": ["7B", "Finetuned"], "size": 5056982144 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "aya-23-35B-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/aya-23-35B-GGUF/resolve/main/aya-23-35B-Q4_K_M.gguf" }], "id": "aya-23-35b", "object": "model", "name": "Aya 23 35B Q4", "version": "1.1", "description": "Aya 23 can talk upto 23 languages fluently.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<|START_OF_TURN_TOKEN|><|SYSTEM_TOKEN|>{system_prompt}<|END_OF_TURN_TOKEN|><|START_OF_TURN_TOKEN|><|USER_TOKEN|>{prompt}<|END_OF_TURN_TOKEN|><|START_OF_TURN_TOKEN|><|CHATBOT_TOKEN|>", "llama_model_path": "aya-23-35B-Q4_K_M.gguf", "ngl": 41 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "frequency_penalty": 0, "presence_penalty": 0, "stop": ["<|END_OF_TURN_TOKEN|>"] }, "metadata": { "author": "CohereForAI", "tags": ["34B", "Finetuned"], "size": 21556982144 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Codestral-22B-v0.1-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Codestral-22B-v0.1-GGUF/resolve/main/Codestral-22B-v0.1-Q4_K_M.gguf" }], "id": "codestral-22b", "object": "model", "name": "Codestral 22B Q4", "version": "1.1", "description": "Latest model from MistralAI optimized for code generation tasks.", "format": "gguf", "settings": { "ctx_len": 32000, "prompt_template": "{system_message} [INST] {prompt} [/INST]", "llama_model_path": "Codestral-22B-v0.1-Q4_K_M.gguf", "ngl": 57 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32000, "stop": ["<endofstring>, [/INST]"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MistralAI", "tags": ["22B", "Finetuned", "Featured"], "size": 13341237440 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Qwen2-7B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Qwen2-7B-Instruct-GGUF/resolve/main/Qwen2-7B-Instruct-Q4_K_M.gguf" }], "id": "qwen2-7b", "object": "model", "name": "Qwen 2 7B Instruct Q4", "version": "1.2", "description": "Qwen is optimized at Chinese, ideal for everyday tasks.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Qwen2-7B-Instruct-Q4_K_M.gguf", "ngl": 29 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": [], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Alibaba", "tags": ["7B", "Finetuned"], "size": 4680000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/resolve/main/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf" }], "id": "llama3.1-8b-instruct", "object": "model", "name": "Llama 3.1 8B Instruct Q4", "version": "1.2", "description": "Meta's Llama 3.1 excels at general usage situations, including chat, general world knowledge, and coding.", "format": "gguf", "settings": { "ctx_len": 131072, "prompt_template": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_message}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n", "llama_model_path": "Meta-Llama-3.1-8B-Instruct.Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<|end_of_text|>", "<|eot_id|>", "<|eom_id|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MetaAI", "tags": ["8B", "Featured"], "size": 4920000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Meta-Llama-3.1-70B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Meta-Llama-3.1-70B-Instruct-GGUF/resolve/main/Meta-Llama-3.1-70B-Instruct-Q4_K_M.gguf" }], "id": "llama3.1-70b-instruct", "object": "model", "name": "Llama 3.1 70B Instruct Q4", "version": "1.2", "description": "Meta's Llama 3.1 excels at general usage situations, including chat, general world knowledge, and coding.", "format": "gguf", "settings": { "ctx_len": 131072, "prompt_template": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_message}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n", "llama_model_path": "Meta-Llama-3.1-70B-Instruct-Q4_K_M.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<|end_of_text|>", "<|eot_id|>", "<|eom_id|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MetaAI", "tags": ["70B"], "size": 42500000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "gemma-2-2b-it-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/gemma-2-2b-it-GGUF/resolve/main/gemma-2-2b-it-Q4_K_M.gguf" }], "id": "gemma-2-2b-it", "object": "model", "name": "Gemma 2 2B Q4", "version": "1.1", "description": "Gemma is built from the same technology with Google's Gemini.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<bos><start_of_turn>user\n{prompt}<end_of_turn>\n<start_of_turn>model\n<end_of_turn>\n<start_of_turn>model\n", "llama_model_path": "gemma-2-2b-it-Q4_K_M.gguf", "ngl": 27 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<end_of_turn>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Google", "tags": ["2B", "Tiny", "Conversational", "Text-generation"], "size": 1710000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "gemma-2-9b-it-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/gemma-2-9b-it-GGUF/resolve/main/gemma-2-9b-it-Q4_K_M.gguf" }], "id": "gemma-2-9b-it", "object": "model", "name": "Gemma 2 9B Q4", "version": "1.1", "description": "Gemma is built from the same technology with Google's Gemini.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<bos><start_of_turn>user\n{prompt}<end_of_turn>\n<start_of_turn>model\n<end_of_turn>\n<start_of_turn>model\n", "llama_model_path": "gemma-2-9b-it-Q4_K_M.gguf", "ngl": 43 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<end_of_turn>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Google", "tags": ["9B", "Conversational", "Text-generation"], "size": 5760000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "gemma-2-27b-it-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/gemma-2-27b-it-GGUF/resolve/main/gemma-2-27b-it-Q4_K_M.gguf" }], "id": "gemma-2-27b-it", "object": "model", "name": "Gemma 2 27B Q4", "version": "1.1", "description": "Gemma is built from the same technology with Google's Gemini.", "format": "gguf", "settings": { "ctx_len": 8192, "prompt_template": "<bos><start_of_turn>user\n{prompt}<end_of_turn>\n<start_of_turn>model\n<end_of_turn>\n<start_of_turn>model\n", "llama_model_path": "gemma-2-27b-it-Q4_K_M.gguf", "ngl": 47 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<end_of_turn>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "Google", "tags": ["27B", "Conversational", "Text-generation"], "size": 16600000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Llama-3.2-1B-Instruct-Q8_0.gguf", "url": "https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/resolve/main/Llama-3.2-1B-Instruct-Q8_0.gguf" }], "id": "llama3.2-1b-instruct", "object": "model", "name": "Llama 3.2 1B Instruct Q8", "version": "1.0", "description": "Meta's Llama 3.2 excels at general usage situations, including chat, general world knowledge, and coding.", "format": "gguf", "settings": { "ctx_len": 131072, "prompt_template": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_message}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n", "llama_model_path": "Llama-3.2-1B-Instruct-Q8_0.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<|end_of_text|>", "<|eot_id|>", "<|eom_id|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MetaAI", "tags": ["1B", "Featured"], "size": 1320000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Llama-3.2-3B-Instruct-Q8_0.gguf", "url": "https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF/resolve/main/Llama-3.2-3B-Instruct-Q8_0.gguf" }], "id": "llama3.2-3b-instruct", "object": "model", "name": "Llama 3.2 3B Instruct Q8", "version": "1.0", "description": "Meta's Llama 3.2 excels at general usage situations, including chat, general world knowledge, and coding.", "format": "gguf", "settings": { "ctx_len": 131072, "prompt_template": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_message}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n", "llama_model_path": "Llama-3.2-3B-Instruct-Q8_0.gguf", "ngl": 33 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 8192, "stop": ["<|end_of_text|>", "<|eot_id|>", "<|eom_id|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "MetaAI", "tags": ["3B", "Featured"], "size": 3420000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Qwen2.5-7B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Qwen2.5-7B-Instruct-GGUF/resolve/main/Qwen2.5-7B-Instruct-Q4_K_M.gguf" }], "id": "qwen2.5-7b-instruct", "object": "model", "name": "Qwen2.5 7B Instruct Q4", "version": "1.0", "description": "The Qwen 2.5 family is specifically designed to excel in math, coding, and other computational tasks", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Qwen2.5-7B-Instruct-Q4_K_M.gguf", "ngl": 29 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": ["<|endoftext|>", "<|im_end|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "QwenLM", "tags": ["7B", "Featured"], "size": 4680000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Qwen2.5-Coder-7B-Instruct-GGUF/resolve/main/Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf" }], "id": "qwen2.5-coder-7b-instruct", "object": "model", "name": "Qwen2.5 Coder 7B Instruct Q4", "version": "1.0", "description": "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models. Significantly improvements in code generation, code reasoning and code fixing.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf", "ngl": 29 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": ["<|endoftext|>", "<|im_end|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "QwenLM", "tags": ["7B", "Featured"], "size": 4680000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Qwen2.5-Coder-14B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Qwen2.5-Coder-14B-Instruct-GGUF/resolve/main/Qwen2.5-Coder-14B-Instruct-Q4_K_M.gguf" }], "id": "qwen2.5-coder-14b-instruct", "object": "model", "name": "Qwen2.5 Coder 14B Instruct Q4", "version": "1.0", "description": "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models. Significantly improvements in code generation, code reasoning and code fixing.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Qwen2.5-Coder-14B-Instruct-Q4_K_M.gguf", "ngl": 29 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": ["<|endoftext|>", "<|im_end|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "QwenLM", "tags": ["14B", "Featured"], "size": 8990000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Qwen2.5-Coder-32B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Qwen2.5-Coder-32B-Instruct-GGUF/resolve/main/Qwen2.5-Coder-32B-Instruct-Q4_K_M.gguf" }], "id": "qwen2.5-coder-32b-instruct", "object": "model", "name": "Qwen2.5 Coder 32B Instruct Q4", "version": "1.0", "description": "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models. Significantly improvements in code generation, code reasoning and code fixing.", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Qwen2.5-Coder-32B-Instruct-Q4_K_M.gguf", "ngl": 29 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": ["<|endoftext|>", "<|im_end|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "QwenLM", "tags": ["32B", "Featured"], "size": 19900000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Qwen2.5-14B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Qwen2.5-14B-Instruct-GGUF/resolve/main/Qwen2.5-14B-Instruct-Q4_K_M.gguf" }], "id": "qwen2.5-14b-instruct", "object": "model", "name": "Qwen2.5 14B Instruct Q4", "version": "1.0", "description": "The Qwen 2.5 family is specifically designed to excel in math, coding, and other computational tasks", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Qwen2.5-14B-Instruct-Q4_K_M.gguf", "ngl": 49 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": ["<|endoftext|>", "<|im_end|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "QwenLM", "tags": ["14B", "Featured"], "size": 8990000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Qwen2.5-32B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Qwen2.5-32B-Instruct-GGUF/resolve/main/Qwen2.5-32B-Instruct-Q4_K_M.gguf" }], "id": "qwen2.5-32b-instruct", "object": "model", "name": "Qwen2.5 32B Instruct Q4", "version": "1.0", "description": "The Qwen 2.5 family is specifically designed to excel in math, coding, and other computational tasks", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Qwen2.5-32B-Instruct-Q4_K_M.gguf", "ngl": 65 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": ["<|endoftext|>", "<|im_end|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "QwenLM", "tags": ["32B"], "size": 19900000000 }, "engine": "llama-cpp" }, { "sources": [{ "filename": "Qwen2.5-72B-Instruct-Q4_K_M.gguf", "url": "https://huggingface.co/bartowski/Qwen2.5-72B-Instruct-GGUF/resolve/main/Qwen2.5-72B-Instruct-Q4_K_M.gguf" }], "id": "qwen2.5-72b-instruct", "object": "model", "name": "Qwen2.5 72B Instruct Q4", "version": "1.0", "description": "The Qwen 2.5 family is specifically designed to excel in math, coding, and other computational tasks", "format": "gguf", "settings": { "ctx_len": 32768, "prompt_template": "<|im_start|>system\n{system_message}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant", "llama_model_path": "Qwen2.5-72B-Instruct-Q4_K_M.gguf", "ngl": 81 }, "parameters": { "temperature": 0.7, "top_p": 0.95, "stream": true, "max_tokens": 32768, "stop": ["<|endoftext|>", "<|im_end|>"], "frequency_penalty": 0, "presence_penalty": 0 }, "metadata": { "author": "QwenLM", "tags": ["72B"], "size": 47400000000 }, "engine": "llama-cpp" }];
            this.registerModels(models);
            _super.onLoad.call(this);
            // Register Settings
            this.registerSettings([{ "key": "cont_batching", "title": "Continuous batching", "description": "The number of parallel operations", "controllerType": "checkbox", "controllerProps": { "value": true } }, { "key": "n_parallel", "title": "Parallel operations", "description": "The number of parallel operations", "controllerType": "input", "controllerProps": { "value": "4", "placeholder": "4" } }, { "key": "cpu_threads", "title": "CPU Threads", "description": "The number of CPU threads to use (when in CPU mode)", "controllerType": "input", "controllerProps": { "value": "", "placeholder": "Number of CPU threads" } }, { "key": "flash_attn", "title": "Flash Attention enabled", "description": "To enable Flash Attention, default is true", "controllerType": "checkbox", "controllerProps": { "value": true } }, { "key": "caching_enabled", "title": "Caching enabled", "description": "To enable prompt caching or not", "controllerType": "checkbox", "controllerProps": { "value": true } }, { "key": "cache_type", "title": "KV Cache Type", "description": "KV cache type: f16, q8_0, q4_0, default is f16 (change this could break the model).", "controllerType": "input", "controllerProps": { "placeholder": "f16", "value": "f16" } }, { "key": "use_mmap", "title": "To enable mmap", "description": "To enable mmap, default is true", "controllerType": "checkbox", "controllerProps": { "value": true } }]);
            this.n_parallel =
                (_a = Number(yield this.getSetting(Settings.n_parallel, '4'))) !== null && _a !== void 0 ? _a : 4;
            this.cont_batching = yield this.getSetting(Settings.cont_batching, true);
            this.caching_enabled = yield this.getSetting(Settings.caching_enabled, true);
            this.flash_attn = yield this.getSetting(Settings.flash_attn, true);
            this.use_mmap = yield this.getSetting(Settings.use_mmap, true);
            this.cache_type = yield this.getSetting(Settings.cache_type, 'f16');
            const threads_number = Number(yield this.getSetting(Settings.cpu_threads, ''));
            if (!Number.isNaN(threads_number))
                this.cpu_threads = threads_number;
            this.queue.add(() => this.clean());
            // Run the process watchdog
            const systemInfo = yield systemInformation();
            this.queue.add(() => executeOnMain("@janhq/inference-cortex-extension/dist/node/index.cjs.js", 'run', systemInfo));
            this.queue.add(() => this.healthz());
            this.queue.add(() => this.setDefaultEngine(systemInfo));
            this.subscribeToEvents();
            window.addEventListener('beforeunload', () => {
                this.clean();
            });
            const currentMode = (_b = systemInfo.gpuSetting) === null || _b === void 0 ? void 0 : _b.run_mode;
            events.on(AppConfigurationEventName.OnConfigurationUpdate, () => __awaiter$1(this, void 0, void 0, function* () {
                var _a;
                const systemInfo = yield systemInformation();
                // Update run mode on settings update
                if (((_a = systemInfo.gpuSetting) === null || _a === void 0 ? void 0 : _a.run_mode) !== currentMode)
                    this.queue.add(() => this.setDefaultEngine(systemInfo));
            }));
        });
    }
    onUnload() {
        const _super = Object.create(null, {
            onUnload: { get: () => super.onUnload }
        });
        return __awaiter$1(this, void 0, void 0, function* () {
            console.log('Clean up cortex.cpp services');
            this.shouldReconnect = false;
            this.clean();
            yield executeOnMain("@janhq/inference-cortex-extension/dist/node/index.cjs.js", 'dispose');
            _super.onUnload.call(this);
        });
    }
    onSettingUpdate(key, value) {
        var _a;
        if (key === Settings.n_parallel && typeof value === 'string') {
            this.n_parallel = (_a = Number(value)) !== null && _a !== void 0 ? _a : 1;
        }
        else if (key === Settings.cont_batching && typeof value === 'boolean') {
            this.cont_batching = value;
        }
        else if (key === Settings.caching_enabled && typeof value === 'boolean') {
            this.caching_enabled = value;
        }
        else if (key === Settings.flash_attn && typeof value === 'boolean') {
            this.flash_attn = value;
        }
        else if (key === Settings.cache_type && typeof value === 'string') {
            this.cache_type = value;
        }
        else if (key === Settings.use_mmap && typeof value === 'boolean') {
            this.use_mmap = value;
        }
        else if (key === Settings.cpu_threads && typeof value === 'string') {
            const threads_number = Number(value);
            if (!Number.isNaN(threads_number))
                this.cpu_threads = threads_number;
        }
    }
    loadModel(model) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if ((model.engine === InferenceEngine.nitro || model.settings.vision_model) &&
                model.settings.llama_model_path) {
                // Legacy chat model support
                model.settings = Object.assign(Object.assign({}, model.settings), { llama_model_path: yield getModelFilePath(model, model.settings.llama_model_path) });
            }
            else {
                const _a = model.settings, settings = __rest(_a, ["llama_model_path"]);
                model.settings = settings;
            }
            if ((model.engine === InferenceEngine.nitro || model.settings.vision_model) &&
                model.settings.mmproj) {
                // Legacy clip vision model support
                model.settings = Object.assign(Object.assign({}, model.settings), { mmproj: yield getModelFilePath(model, model.settings.mmproj) });
            }
            else {
                const _b = model.settings, settings = __rest(_b, ["mmproj"]);
                model.settings = settings;
            }
            const controller = new AbortController();
            const { signal } = controller;
            this.abortControllers.set(model.id, controller);
            return yield this.queue.add(() => ky$1
                .post(`${"http://127.0.0.1:39291"}/v1/models/start`, {
                json: Object.assign(Object.assign(Object.assign({}, extractModelLoadParams(model.settings)), { model: model.id, engine: model.engine === InferenceEngine.nitro // Legacy model cache
                        ? InferenceEngine.cortex_llamacpp
                        : model.engine, cont_batching: this.cont_batching, n_parallel: this.n_parallel, caching_enabled: this.caching_enabled, flash_attn: this.flash_attn, cache_type: this.cache_type, use_mmap: this.use_mmap }), (this.cpu_threads ? { cpu_threads: this.cpu_threads } : {})),
                timeout: false,
                signal,
            })
                .json()
                .catch((e) => __awaiter$1(this, void 0, void 0, function* () {
                var _a, _b;
                throw (_b = (yield ((_a = e.response) === null || _a === void 0 ? void 0 : _a.json()))) !== null && _b !== void 0 ? _b : e;
            }))
                .finally(() => this.abortControllers.delete(model.id))
                .then());
        });
    }
    unloadModel(model) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return ky$1
                .post(`${"http://127.0.0.1:39291"}/v1/models/stop`, {
                json: { model: model.id },
            })
                .json()
                .finally(() => {
                var _a;
                (_a = this.abortControllers.get(model.id)) === null || _a === void 0 ? void 0 : _a.abort();
            })
                .then();
        });
    }
    /**
     * Do health check on cortex.cpp
     * @returns
     */
    healthz() {
        return ky$1
            .get(`${"http://127.0.0.1:39291"}/healthz`, {
            retry: {
                limit: 20,
                delay: () => 500,
                methods: ['get'],
            },
        })
            .then(() => { });
    }
    /**
     * Set default engine variant on launch
     */
    setDefaultEngine(systemInfo) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const variant = yield executeOnMain("@janhq/inference-cortex-extension/dist/node/index.cjs.js", 'engineVariant', systemInfo.gpuSetting);
            return (ky$1
                // Fallback support for legacy API
                .post(`${"http://127.0.0.1:39291"}/v1/engines/${InferenceEngine.cortex_llamacpp}/default?version=${"v0.1.49"}&variant=${variant}`, {
                json: {
                    version: "v0.1.49",
                    variant,
                },
            })
                .then(() => { }));
        });
    }
    /**
     * Clean cortex processes
     * @returns
     */
    clean() {
        return ky$1
            .delete(`${"http://127.0.0.1:39291"}/processmanager/destroy`, {
            timeout: 2000, // maximum 2 seconds
            retry: {
                limit: 0,
            },
        })
            .catch(() => {
            // Do nothing
        });
    }
    /**
     * Subscribe to cortex.cpp websocket events
     */
    subscribeToEvents() {
        this.queue.add(() => new Promise((resolve) => {
            this.socket = new WebSocket(`${"ws://127.0.0.1:39291"}/events`);
            this.socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                const transferred = data.task.items.reduce((acc, cur) => acc + cur.downloadedBytes, 0);
                const total = data.task.items.reduce((acc, cur) => acc + cur.bytes, 0);
                const percent = total > 0 ? transferred / total : 0;
                events.emit(DownloadTypes[data.type], {
                    modelId: data.task.id,
                    percent: percent,
                    size: {
                        transferred: transferred,
                        total: total,
                    },
                });
                // Update models list from Hub
                if (data.type === DownloadTypes.DownloadSuccess) {
                    // Delay for the state update from cortex.cpp
                    // Just to be sure
                    setTimeout(() => {
                        events.emit(ModelEvent.OnModelsUpdate, {
                            fetch: true,
                        });
                    }, 500);
                }
            });
            /**
             * This is to handle the server segfault issue
             */
            this.socket.onclose = (event) => {
                console.log('WebSocket closed:', event);
                // Notify app to update model running state
                events.emit(ModelEvent.OnModelStopped, {});
                // Reconnect to the /events websocket
                if (this.shouldReconnect) {
                    console.log(`Attempting to reconnect...`);
                    setTimeout(() => this.subscribeToEvents(), 1000);
                }
                // Queue up health check
                this.queue.add(() => this.healthz());
            };
            resolve();
        }));
    }
}
/// Legacy
const getModelFilePath = (model, file) => __awaiter$1(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Symlink to the model file
    if (!((_a = model.sources[0]) === null || _a === void 0 ? void 0 : _a.url.startsWith('http')) &&
        (yield fs.existsSync(model.sources[0].url))) {
        return (_b = model.sources[0]) === null || _b === void 0 ? void 0 : _b.url;
    }
    if (model.file_path) {
        yield joinPath([yield dirName(model.file_path), file]);
    }
    return joinPath([yield getJanDataFolderPath(), 'models', model.id, file]);
});
///

export { Settings, JanInferenceCortexExtension as default };
//# sourceMappingURL=index.js.map
