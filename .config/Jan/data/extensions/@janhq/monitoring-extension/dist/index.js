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
 * Monitoring extension for system monitoring.
 * @extends BaseExtension
 */
class MonitoringExtension extends BaseExtension {
    /**
     * Monitoring extension type.
     */
    type() {
        return ExtensionTypeEnum.SystemMonitoring;
    }
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

((function () {
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
})());
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
Object.freeze({
    source: "ulid"
});

var Settings;
(function (Settings) {
    Settings["logEnabled"] = "log-enabled";
    Settings["logCleaningInterval"] = "log-cleaning-interval";
})(Settings || (Settings = {}));
/**
 * JanMonitoringExtension is a extension that provides system monitoring functionality.
 * It implements the MonitoringExtension interface from the @janhq/core package.
 */
class JanMonitoringExtension extends MonitoringExtension {
    /**
     * Called when the extension is loaded.
     */
    onLoad() {
        return __awaiter$1(this, void 0, void 0, function* () {
            // Register extension settings
            this.registerSettings([{ "key": "log-enabled", "title": "Enable App Logs", "description": "Saves app logs locally on your computer. This enables you to send us crash reports.", "controllerType": "checkbox", "controllerProps": { "value": true } }, { "key": "log-cleaning-interval", "title": "Log Cleaning Interval", "description": "Automatically delete local logs after a certain time interval (in milliseconds).", "controllerType": "input", "controllerProps": { "value": "120000", "placeholder": "Interval in milliseconds. E.g. 120000", "textAlign": "right" } }]);
            const logEnabled = yield this.getSetting(Settings.logEnabled, true);
            const logCleaningInterval = parseInt(yield this.getSetting(Settings.logCleaningInterval, '120000'));
            // Register File Logger provided by this extension
            yield executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'registerLogger', {
                logEnabled,
                logCleaningInterval: isNaN(logCleaningInterval)
                    ? 120000
                    : logCleaningInterval,
            });
            // Attempt to fetch nvidia info
            yield executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'updateNvidiaInfo');
            events.emit(AppConfigurationEventName.OnConfigurationUpdate, {});
        });
    }
    onSettingUpdate(key, value) {
        if (key === Settings.logEnabled) {
            executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'updateLogger', { logEnabled: value });
        }
        else if (key === Settings.logCleaningInterval) {
            executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'updateLogger', { logCleaningInterval: value });
        }
    }
    /**
     * Called when the extension is unloaded.
     */
    onUnload() {
        // Register File Logger provided by this extension
        executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'unregisterLogger');
    }
    /**
     * Returns the GPU configuration.
     * @returns A Promise that resolves to an object containing the GPU configuration.
     */
    getGpuSetting() {
        return __awaiter$1(this, void 0, void 0, function* () {
            return executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'getGpuConfig');
        });
    }
    /**
     * Returns information about the system resources.
     * @returns A Promise that resolves to an object containing information about the system resources.
     */
    getResourcesInfo() {
        return executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'getResourcesInfo');
    }
    /**
     * Returns information about the current system load.
     * @returns A Promise that resolves to an object containing information about the current system load.
     */
    getCurrentLoad() {
        return executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'getCurrentLoad');
    }
    /**
     * Returns information about the OS
     * @returns
     */
    getOsInfo() {
        return executeOnMain("@janhq/monitoring-extension/dist/node/index.cjs.js", 'getOsInfo');
    }
}

export { JanMonitoringExtension as default };
//# sourceMappingURL=index.js.map
