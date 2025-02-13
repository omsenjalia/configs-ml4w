"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessWatchdog = void 0;
const node_1 = require("@janhq/core/node");
const child_process_1 = require("child_process");
const events_1 = require("events");
class ProcessWatchdog extends events_1.EventEmitter {
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
        (0, node_1.log)(`Starting process: ${this.command} ${this.args.join(' ')}`);
        this.process = (0, child_process_1.spawn)(this.command, this.args, this.options);
        (_a = this.process.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            (0, node_1.log)(`Process output: ${data}`);
            this.emit('output', data.toString());
        });
        (_b = this.process.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            (0, node_1.log)(`Process error: ${data}`);
            this.emit('error', data.toString());
        });
        this.process.on('close', (code) => {
            (0, node_1.log)(`Process exited with code ${code}`);
            this.emit('close', code);
            if (!this.isTerminating) {
                this.restartProcess();
            }
        });
    }
    restartProcess() {
        if (this.restartCount < this.maxRestarts) {
            this.restartCount++;
            (0, node_1.log)(`Restarting process in ${this.restartDelay}ms (Attempt ${this.restartCount}/${this.maxRestarts})`);
            setTimeout(() => this.spawnProcess(), this.restartDelay);
        }
        else {
            (0, node_1.log)('Max restart attempts reached. Exiting watchdog.');
            this.emit('maxRestartsReached');
        }
    }
    terminate() {
        this.isTerminating = true;
        if (this.process) {
            (0, node_1.log)('Terminating watched process...');
            this.process.kill();
        }
        this.emit('terminated');
    }
}
exports.ProcessWatchdog = ProcessWatchdog;
//# sourceMappingURL=watchdog.js.map