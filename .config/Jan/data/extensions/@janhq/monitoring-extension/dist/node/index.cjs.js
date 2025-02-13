'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var node = require('@janhq/core/node');
var os$4 = require('os');
var require$$0 = require('child_process');
var fs$3 = require('fs');
var util$2 = require('util');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var os__default = /*#__PURE__*/_interopDefaultLegacy(os$4);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs$3);
var util__default = /*#__PURE__*/_interopDefaultLegacy(util$2);
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
 * author       : Sunil Wang
 * createTime   : 2017/7/9 19:24
 * description  :
 */

var bucket$a = {
  options: {
    NOT_SUPPORTED_VALUE: 'not supported',
    INTERVAL: 1000
  },
  isNotSupported(res){
    return res === this.options.NOT_SUPPORTED_VALUE
  }
};

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 19:39
 * description  :
 */

var bucket$9 = bucket$a;
var os$3 = os__default["default"];

bucket$9.cpu = {
  average: function () {
    var totalIdle = 0;
    var totalTick = 0;
    var cpus = os$3.cpus();

    for (var i = 0, len = cpus.length; i < len; i++) {
      var cpu = cpus[i];
      for (var type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    }

    return {
      totalIdle: totalIdle,
      totalTick: totalTick,
      avgIdle: (totalIdle / cpus.length),
      avgTotal: (totalTick / cpus.length)
    }
  },
  usage: function (interval) {
    var self = this;

    if (!interval) {
      interval = bucket$9.options.INTERVAL;
    }

    return new Promise(function (resolve) {
      if (typeof interval !== 'number') {
        throw new TypeError('interval must be a number!')
      }

      var startMeasure = self.average();

      setTimeout(function () {
        var endMeasure = self.average();
        var idleDifference = endMeasure.avgIdle - startMeasure.avgIdle;
        var totalDifference = endMeasure.avgTotal - startMeasure.avgTotal;
        var cpuPercentage = (10000 - Math.round(10000 * idleDifference / totalDifference)) / 100;

        return resolve(cpuPercentage)
      }, interval);
    })
  },
  free: function (interval) {
    var self = this;

    if (!interval) {
      interval = bucket$9.options.INTERVAL;
    }

    return new Promise(function (resolve) {
      if (typeof interval !== 'number') {
        throw new TypeError('interval must be a number!')
      }

      self.usage(interval)
        .then(function (cpuPercentage) {
          return resolve(100 - cpuPercentage)
        });
    })
  },
  count: function () {
    return os$3.cpus().length
  },
  model: function () {
    return os$3.cpus()[0].model
  },
  loadavg: function () {
    return os$3.loadavg()
  },
  loadavgTime: function (time) {
    time = parseInt(time, 10);

    var loads = os$3.loadavg();

    switch (time) {
      case 5:
        return loads[1]
      case 15:
        return loads[2]
      default: return loads[0]
    }
  }
};

var exec$8 = {exports: {}};

/**
 * author       : Sunil Wang
 * createTime   : 2019/10/25 10:36
 * description  :
 */

var cp = require$$0__default["default"];
var bucket$8 = bucket$a;

function exec$7(command){
  return new Promise(function (resolve) {
    var runCommand = 'LC_ALL="en_US.UTF-8";LANG="en_US.UTF-8";LANGUAGE="en_US:en";' + command;

    cp.exec(runCommand, { shell: true }, function (err, stdout, stderr) {
      if (err || !stdout) {
        return resolve(bucket$8.options.NOT_SUPPORTED_VALUE)
      }

      return resolve(stdout)
    });
  })
}

exec$8.exports = exec$7;
exec$8.exports.wrapExec = function(command){
  return function(){
    return exec$7(command)
  }
};

var execExports = exec$8.exports;

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 20:17
 * description  :
 */

var bucket$7 = bucket$a;
var exec$6 = execExports;
var DISK_PATTERN = /^(\S+)\n?\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(.+?)\n/mg;

function createDiskInfo (headlineArgs, args) {
  var info = {};

  headlineArgs.forEach(function (h, i) {
    info[h] = args[i];
  });

  return info
}

function parseDfStdout (stdout) {
  var dfInfo = [];
  var headline;

  stdout.replace(DISK_PATTERN, function () {
    var args = Array.prototype.slice.call(arguments, 1, 7);

    if (arguments[7] === 0) {
      headline = args;
      return
    }
    dfInfo.push(createDiskInfo(headline, args));
  });

  return dfInfo
}

bucket$7.drive = {
  info: function (diskName) {
    if (!diskName) {
      diskName = '/';
    }

    return exec$6('df -kP').then(function (out) {
      var diskInfo = null;
      var main = null;
      var lines = parseDfStdout(out);

      for (var i = 0; i < lines.length; i++) {
        if (lines[i]['Mounted on'] === diskName) {
          diskInfo = lines[i];
          continue
        }

        if (lines[i]['Mounted on'] === '/') {
          main = lines[i];
          continue
        }
      }

      if (diskInfo === null) {
        if (main === null) {
          throw new Error('disk name invalid and / not found')
        }

        console.info('disk name invalid, using / as default');
        diskInfo = main;
      }

      var used = Math.ceil(diskInfo.Used * 1024 / Math.pow(1024, 2));
      var free = Math.ceil((diskInfo.Available || diskInfo.Avail) * 1024 / Math.pow(1024, 2));
      var total = used + free;

      var totalGb = (total / 1024).toFixed(1);
      var usedGb = (used / 1024).toFixed(1);
      var freeGb = (free / 1024).toFixed(1);

      var usedPercentage = (100 * used / total).toFixed(1);
      var freePercentage = (100 * free / total).toFixed(1);

      return Promise.resolve({
        totalGb: totalGb,
        usedGb: usedGb,
        freeGb: freeGb,
        usedPercentage: usedPercentage,
        freePercentage: freePercentage
      })
    })
  },
  free: function (diskName) {
    var self = this;

    return self.info(diskName)
      .then(function (res) {
        return Promise.resolve({
          totalGb: res.totalGb,
          freeGb: res.freeGb,
          freePercentage: res.freePercentage
        })
      })
  },
  used: function (diskName) {
    var self = this;

    return self.info(diskName)
      .then(function (res) {
        return Promise.resolve({
          totalGb: res.totalGb,
          usedGb: res.usedGb,
          usedPercentage: res.usedPercentage
        })
      })
  }
};

/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

var co_1 = co$5['default'] = co$5.co = co$5;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co$5.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise
  function createPromise () {
    return co$5.call(this, fn.apply(this, arguments))
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co$5 (gen) {
  var ctx = this;
  var args = slice.call(arguments, 1);

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled (res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e)
      }
      next(ret);
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected (err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e)
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next (ret) {
      if (ret.done) return resolve(ret.value)
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected)
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, ' +
        'but the following object was passed: "' + String(ret.value) + '"'))
    }
  })
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise (obj) {
  if (!obj) return obj
  if (isPromise(obj)) return obj
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co$5.call(this, obj)
  if (typeof obj === 'function') return thunkToPromise.call(this, obj)
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj)
  if (isObject(obj)) return objectToPromise.call(this, obj)
  return obj
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise (fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err)
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  })
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise (obj) {
  return Promise.all(obj.map(toPromise, this))
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise (obj) {
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results
  })

  function defer (promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise (obj) {
  return typeof obj.then === 'function'
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator (obj) {
  return typeof obj.next === 'function' && typeof obj.throw === 'function'
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction (obj) {
  var constructor = obj.constructor;
  if (!constructor) return false
  if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') return true
  return isGenerator(constructor.prototype)
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject (val) {
  return Object === val.constructor
}

var util$1 = {};

/**
 * @Author: 王澍（SunilWang）
 * @Date: 2020-06-18 17:11:25
 * @Last Modified by: 王澍（SunilWang）
 * @Last Modified time: 2020-06-18 17:11:47
 * @Description:
 */

util$1.isNumber = function(num) {
  return num !== true && num !== false && Boolean(num === 0 || (num && !isNaN(num)));
};

/**
 * @Author: 王澍（SunilWang）
 * @Date: 2017-7-9 21:49:00
 * @Last Modified by: 王澍（SunilWang）
 * @Last Modified time: 2020-09-10 14:59:41
 * @Description:
 */

var bucket$6 = bucket$a;
var os$2 = os__default["default"];
var fs$2 = fs__default["default"];
var co$4 = co_1;
var util = util$1;
var exec$5 = execExports;

var linuxFreeMemory = function () {
  return new Promise(function (resolve) {
    // https://github.com/SunilWang/node-os-utils/pull/11
    // running this on an embedded linux device. This steps takes around 500ms. With this change we brought it down to a few milliseconds.
    fs$2.readFile('/proc/meminfo', 'utf8', function (err, out) {
      if (err) {
        return resolve(bucket$6.options.NOT_SUPPORTED_VALUE)
      }
      var memInfo = {};
      var usage = out.toString().trim().split('\n');
      usage.forEach((line) => {
        var pair = line.split(':');
        memInfo[pair[0]] = parseInt(pair[1], 10);
      });

      var totalMem = parseInt(memInfo.MemTotal, 10) * 1024;

      // check if MemAvailable exists
      if (!memInfo.MemAvailable) {
        memInfo.MemAvailable = memInfo['MemFree'] + memInfo['Buffers'] + memInfo['Cached'] + memInfo['SReclaimable'] - memInfo['Shmem'];
      }
      var freeMem = memInfo.MemAvailable * 1024;

      // https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=34e431b0ae398fc54ea69ff85ec700722c9da773
      // https://www.cnblogs.com/johnnyzen/p/8011309.html
      if (os$2.release() < '3.14') {
        freeMem =
          ((memInfo.MemFree || 0) +
            (memInfo.Buffers || 0) +
            (memInfo.Cached || 0)) *
          1024;
      }

      return resolve({ totalMem, freeMem })
    });
  })
};

// learn from: https://github.com/X-Profiler/xtransit/blob/master/orders/system_log.js#L356
var osxFreeMemory = co$4.wrap(function* () {
  var totalMem = os$2.totalmem();
  var mappings = {
    'Pages purgeable': 'purgeable',
    'Pages wired down': 'wired',
    'Pages active': 'active',
    'Pages inactive': 'inactive',
    'Pages occupied by compressor': 'compressed',
  };
  var [vmStat, pagePageable] = yield Promise.all([
    exec$5('vm_stat'),
    exec$5('sysctl vm.page_pageable_internal_count'),
  ]);

  vmStat = vmStat.toString().trim();
  pagePageable = pagePageable.toString().trim();

  // get page size
  var pageSize = 4096;
  var matchdPageSize = /page size of (\d+) bytes/.exec(vmStat);

  if (matchdPageSize && util.isNumber(matchdPageSize[1])) {
    pageSize = Number(matchdPageSize[1]);
  }

  // get page pageable
  var [, pageableValue] = pagePageable.split(':');

  if (!util.isNumber(pageableValue)) {
    return {
      totalMem,
      freeMem: os$2.freemem(),
    }
  }

  pageableValue = Number(pageableValue) * pageSize;

  // get vm stats
  var lines = vmStat.split('\n').filter((x) => x !== '');
  var stats = {};

  lines.forEach((x) => {
    var parts = x.split(':');
    var key = parts[0];
    var val = parts[1].replace('.', '').trim();

    if (mappings[key]) {
      var ky = mappings[key];
      stats[ky] = val * pageSize;
    }
  });

  // get app memory
  var appMemory = pageableValue - stats.purgeable;
  // get wired memory
  var wiredMemory = stats.wired;
  // get compressed memory
  var compressedMemory = stats.compressed;
  var used = appMemory + wiredMemory + compressedMemory;

  return {
    totalMem,
    freeMem: totalMem - used,
  }
});

bucket$6.mem = {
  info: co$4.wrap(function* () {
    var totalMem = null;
    var freeMem = null;
    var memInfo = yield linuxFreeMemory();

    if (bucket$6.isNotSupported(memInfo)) {
      totalMem = os$2.totalmem();
      freeMem = os$2.freemem();
      if (os$2.platform() === 'darwin') {
        var mem = yield osxFreeMemory();
        totalMem = mem.totalMem;
        freeMem = mem.freeMem;
      }
    } else {
      totalMem = memInfo.totalMem;
      freeMem = memInfo.freeMem;
    }

    var totalMemMb = parseFloat((totalMem / 1024 / 1024).toFixed(2));
    var usedMemMb = parseFloat(((totalMem - freeMem) / 1024 / 1024).toFixed(2));
    var freeMemMb = parseFloat((totalMemMb - usedMemMb).toFixed(2));
    var usedMemPercentage = parseFloat((100 * ((totalMem - freeMem) / totalMem)).toFixed(2));
    var freeMemPercentage = parseFloat((100 * (freeMem / totalMem)).toFixed(2));

    return {
      totalMemMb: totalMemMb,
      usedMemMb: usedMemMb,
      freeMemMb: freeMemMb,
      usedMemPercentage: usedMemPercentage,
      freeMemPercentage: freeMemPercentage,
    }
  }),
  free: function () {
    var self = this;

    return self.info().then(function (res) {
      return Promise.resolve({
        totalMemMb: res.totalMemMb,
        freeMemMb: res.freeMemMb,
      })
    })
  },
  used: function () {
    var self = this;

    return self.info().then(function (res) {
      return Promise.resolve({
        totalMemMb: res.totalMemMb,
        usedMemMb: res.usedMemMb,
      })
    })
  },
  totalMem: function () {
    return os$2.totalmem()
  },
};

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 22:16
 * description  :
 */

var bucket$5 = bucket$a;
var co$3 = co_1;
var exec$4 = execExports;

var ifconfig = {
  breakIntoBlocks: function breakIntoBlocks (fullText) {
    var blocks = [];
    var lines = fullText.split('\n');
    var currentBlock = [];
    lines.forEach(function (line) {
      if (line.length > 0 && ['\t', ' '].indexOf(line[0]) === -1 && currentBlock.length > 0) {
        // start of a new block detected
        blocks.push(currentBlock);
        currentBlock = [];
      }
      if (line.trim()) {
        currentBlock.push(line);
      }
    });
    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
    }
    return blocks
  },

  parseSingleBlock: function parseSingleBlock (block) {
    var data = {};
    block.forEach(function (line, i) {
      var match = line.match(/^(\S+)\s+Link/);
      if (i === 0) {
        var match2 = line.match(/([a-zA-Z0-9]+):\s/);
        if (match === null && match2) {
          match = match2;
        }
      }
      if (match) { // eth0      Link encap:Ethernet  HWaddr 04:01:d3:db:fd:01
        data.device = match[1]; // eth0
        var link = {};
        match = line.match(/encap:(\S+)/);
        if (match) {
          link.encap = match[1];
        }
        match = line.match(/HWaddr\s+(\S+)/);
        if (match) {
          link.hwaddr = match[1];
        }
        data.link = link;
      } else {
        var section = data.other || {};
        if ((match = line.match(/collisions:(\S+)/))) {
          section.collisions = parseInt(match[1]);
        }
        if ((match = line.match(/txqueuelen:(\S+)/))) {
          section.txqueuelen = parseInt(match[1]);
        }
        if ((match = line.match(/RX bytes:(\S+)/))) {
          section.rxBytes = parseInt(match[1]);
        }
        if ((match = line.match(/RX packets (\S+) {2}bytes (\S+)/))) {
          section.rxBytes = parseInt(match[2]);
        }
        if ((match = line.match(/TX bytes:(\S+)/))) {
          section.txBytes = parseInt(match[1]);
        }
        if ((match = line.match(/TX packets (\S+) {2}bytes (\S+)/))) {
          section.txBytes = parseInt(match[2]);
        }
        data.other = section;
      }
    });
    return data
  }
};

function ifconfigStats () {
  return co$3(function * () {
    var res = yield exec$4('ifconfig');

    if(bucket$5.isNotSupported(res)) return res

    var blocks = ifconfig.breakIntoBlocks(res);
    var stats = [];

    blocks.forEach(function (block, index) {
      blocks[index] = ifconfig.parseSingleBlock(block);
      stats[index] = {
        'interface': blocks[index].device,
        'inputBytes': (blocks[index].other && blocks[index].other.rxBytes) || 0,
        'outputBytes': (blocks[index].other && blocks[index].other.txBytes) || 0
      };
    });

    return stats
  })
}

bucket$5.netstat = {
  stats: co$3.wrap(function * () {
    var out = yield exec$4('ip -s link');

    if(bucket$5.isNotSupported(out)) return ifconfigStats()

    var names = new RegExp(/[0-9]+: ([\S]+): /g);
    var RX = new RegExp(/^\s+RX:\s+bytes\s+packets\s+errors\s+dropped\s+(overrun|missed)\s+mcast\s*\n\s*([0-9]+)\s+/gm);
    var TX = new RegExp(/^\s+TX:\s+bytes\s+packets\s+errors\s+dropped\s+carrier\s+collsns\s*\n\s*([0-9]+)\s+/gm);

    var stats = [];
    var i = 0;
    var res = [];

    while ((res = names.exec(out)) !== null) {
      stats[i++] = {
        interface: res[1]
      };
    }

    i = 0;
    while ((res = RX.exec(out)) !== null) {
      stats[i++].inputBytes = res[2];
    }

    i = 0;
    while ((res = TX.exec(out)) !== null) {
      stats[i++].outputBytes = res[1];
    }

    return stats
  }),
  inOut: function (interval) {
    var self = this;

    if (!interval) {
      interval = bucket$5.options.INTERVAL;
    }

    return Promise.all([
      self.stats(),
      (function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            self.stats().then(resolve);
          }, interval);
        })
      })()
    ]).then(function (stats) {
      var oldStats = stats[0];
      var newStats = stats[1];

      var metrics = {
        total: {
          inputMb: 0,
          outputMb: 0
        }
      };
      var nbProblems = 0;

      for (var i = 0; i < oldStats.length; i++) {
        if (oldStats[i].interface !== 'lo' && oldStats[i].interface !== 'lo0' && oldStats[i].inputBytes > 0 && oldStats[i].outputBytes > 0) {
          metrics[oldStats[i].interface] = {};
          metrics[oldStats[i].interface]['inputMb'] = parseFloat(((newStats[i].inputBytes - oldStats[i].inputBytes) / 1000000).toFixed(2));
          metrics[oldStats[i].interface]['outputMb'] = parseFloat(((newStats[i].outputBytes - oldStats[i].outputBytes) / 1000000).toFixed(2));

          metrics.total['inputMb'] += parseFloat(metrics[oldStats[i].interface]['inputMb']);
          metrics.total['outputMb'] += parseFloat(metrics[oldStats[i].interface]['outputMb']);
        } else {
          nbProblems++;
        }
      }

      if (nbProblems === oldStats.length) {
        return Promise.resolve(bucket$5.options.NOT_SUPPORTED_VALUE)
      }

      return Promise.resolve(metrics)
    })
  }
};

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 10:26
 * description  :
 */

var bucket$4 = bucket$a;
var fs$1 = fs__default["default"];

bucket$4.openfiles = {
  openFd: function () {
    return new Promise(function (resolve) {
      fs$1.readFile('/proc/sys/fs/file-nr', function (err, out) {
        if (err) {
          return resolve(bucket$4.options.NOT_SUPPORTED_VALUE)
        }

        var result = out.toString().replace(/\n/g, '').split(' ')[0];

        result = parseInt(result, 10);

        return resolve(result)
      });
    })
  }
};

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 19:08
 * description  :
 */

var bucket$3 = bucket$a;
var exec$3 = execExports;
var wrapExec = exec$3.wrapExec;

bucket$3.osCmd = {
  topCpu: wrapExec('ps -eo pcpu,user,args --no-headers | sort -k 1 -n | tail -n 10 | sort -k 1 -nr | cut -c 1-70'),
  topMem: wrapExec('ps -eo pmem,pid,cmd | sort -k 1 -n | tail -n 10 | sort -k 1 -nr | cut -c 1-70'),
  vmstats: wrapExec('vmstat -S m'),
  processesUsers: wrapExec('ps hax -o user | sort | uniq -c'),
  diskUsage: wrapExec('df -h'),
  who: wrapExec('who'),
  whoami: wrapExec('whoami'),
  openPorts: wrapExec('lsof -Pni4 | grep ESTABLISHED'),
  ifconfig: wrapExec('ifconfig')
};

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 10:36
 * description  :
 */

var bucket$2 = bucket$a;
var fs = fs__default["default"];
var os$1 = os__default["default"];
var co$2 = co_1;
var exec$2 = execExports;

var originalOperatingSystem = {
  checkLastResort: co$2.wrap(function * (){
    return exec$2('uname -sr')
  }),
  darwin: function () {
    var self = this;

    return co$2(function * (){
      var res = yield exec$2('sw_vers');

      if(bucket$2.isNotSupported(res)) return self.checkLastResort()

      var version = res.match(/[\n\r].*ProductVersion:\s*([^\n\r]*)/)[1];
      var distribution = res.match(/.*ProductName:\s*([^\n\r]*)/)[1];

      return distribution + ' ' + version
    })
  },
  linux: function () {
    var self = this;

    // Debian, Ubuntu, CentOS
    return new Promise(function (resolve) {
      fs.readFile('/etc/issue', function (err, out) {
        if (err) {
          return self.checkLastResort(resolve)
        }
        out = out.toString();
        var version = out.match(/[\d]+(\.[\d][\d]?)?/);

        if (version !== null) {
          version = version[0];
        }
        var distribution = out.match(/[\w]*/)[0];

        if (version !== null && distribution !== null) {
          var resultOs = distribution + ' ' + version;
          return resolve(resultOs)
        } else if (distribution !== null && distribution !== '') {
          return resolve(distribution)
        } else if (version === null) {
          fs.readFile('/etc/redhat-release', function (err, out) {
            if (err) {
              return self.checkLastResort(resolve)
            }

            out = out.toString();
            version = out.match(/[\d]+(\.[\d][\d]?)?/);

            if (version !== null) {
              version = version[0];
            }

            var resultOs = 'Red Hat ' + version;
            return resolve(resultOs)
          });
        }
      });
    })
  }
};

bucket$2.os = {
  oos: function () {
    var platform = os$1.platform();

    if (platform === 'linux') {
      return originalOperatingSystem.linux()
    }

    if (platform === 'darwin') {
      return originalOperatingSystem.darwin()
    }

    return originalOperatingSystem.checkLastResort()
  },
  platform: function () {
    return os$1.platform()
  },
  uptime: function () {
    // seconds
    return os$1.uptime()
  },
  ip: function () {
    var platform = os$1.platform();
    var interfaces = os$1.networkInterfaces();
    var ip = '';
    var i = 0;
    try {

      if (platform === 'linux' && interfaces.eth0) {
        for (i = 0; i < interfaces.eth0.length; i++) {
          if (os$1.networkInterfaces().eth0[i].family === 'IPv4') {
            ip = os$1.networkInterfaces().eth0[i].address;
            break
          }
        }

        return ip
      }

      if (platform === 'darwin') {
        for (i = 0; i < interfaces.en0.length; i++) {
          if (os$1.networkInterfaces().en0[i].family === 'IPv4') {
            ip = os$1.networkInterfaces().en0[i].address;
            break
          }
        }

        return ip
      }

      for (i in interfaces) {
        var item = interfaces[i];
        for (var j in item) {
          if (item[j]['internal'] === false && item[j]['family'] === 'IPv4') {
            ip = item[j]['address'];
            break
          }
        }
      }
    } catch (error){
      ip = 'LOCALHOST';
    }

    return ip
  },
  hostname: function () {
    return os$1.hostname()
  },
  type: function () {
    return os$1.type()
  },
  arch: function () {
    return os$1.arch()
  }
};

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 14:31
 * description  :
 */

var bucket$1 = bucket$a;
var exec$1 = execExports;
var os = os__default["default"];
var co$1 = co_1;

bucket$1.proc = {
  totalProcesses: co$1.wrap(function * () {
    var res = yield exec$1("top -bn1 | awk 'NR > 7 && $8 ~ /R|S|D|T/ { print $12 }'");

    if(bucket$1.isNotSupported(res)){
      if (os.platform() === 'darwin') {
        var nb = yield exec$1('ps -A');

        nb = nb.toString().split('\n');

        return nb.length - 1
      }

      return res
    }

    var resultProc = (res.split('\n')).length;

    return resultProc
  }),
  zombieProcesses: co$1.wrap(function * () {
    var res = yield exec$1("top -bn1 | awk 'NR > 7 && $8 ~ /Z/ { print $12 }'");

    if(bucket$1.isNotSupported(res)) return res

    return (res.split('\n')).length
  })
};

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 10:17
 * description  :
 */

var bucket = bucket$a;
var exec = execExports;
var co = co_1;

bucket.users = {
  openedCount: co.wrap(function * () {
    var res = yield exec('who | grep -v localhost | wc -l');

    if(bucket.isNotSupported(res)) return res

    return parseInt(res, 10)
  })
};

/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 18:29
 * description  :
 */

var nodeOsUtils = bucket$a;

class FileLogger extends node.Logger {
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
        const appConfigurations = node.getAppConfigurations();
        const logFolderPath = path.join(appConfigurations.data_folder, 'logs');
        if (!fs__default["default"].existsSync(logFolderPath)) {
            fs__default["default"].mkdirSync(logFolderPath, { recursive: true });
        }
        this.appLogPath = path.join(logFolderPath, 'app.log');
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
        const logDirectory = path__default["default"].join(node.getJanDataFolderPath(), 'logs');
        // Perform log cleaning
        const currentDate = new Date();
        if (fs__default["default"].existsSync(logDirectory))
            fs__default["default"].readdir(logDirectory, (err, files) => {
                if (err) {
                    console.error('Error reading log directory:', err);
                    return;
                }
                files.forEach((file) => {
                    const filePath = path__default["default"].join(logDirectory, file);
                    fs__default["default"].stat(filePath, (err, stats) => {
                        if (err) {
                            console.error('Error getting file stats:', err);
                            return;
                        }
                        // Check size
                        if (stats.size > size) {
                            fs__default["default"].unlink(filePath, (err) => {
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
                                fs__default["default"].unlink(filePath, (err) => {
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
const writeLog = (message, logPath) => {
    if (!fs__default["default"].existsSync(logPath)) {
        const logDirectory = path__default["default"].join(node.getJanDataFolderPath(), 'logs');
        if (!fs__default["default"].existsSync(logDirectory)) {
            fs__default["default"].mkdirSync(logDirectory);
        }
        fs__default["default"].writeFileSync(logPath, message);
    }
    else {
        const logFile = fs__default["default"].createWriteStream(logPath, {
            flags: 'a',
        });
        logFile.write(util__default["default"].format(message) + '\n');
        logFile.close();
        console.debug(message);
    }
};

/**
 * Path to the settings directory
 **/
const SETTINGS_DIR = path__default["default"].join(node.getJanDataFolderPath(), 'settings');
/**
 * Path to the settings file
 **/
const GPU_INFO_FILE = path__default["default"].join(SETTINGS_DIR, 'settings.json');
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
    if (fs$3.existsSync(GPU_INFO_FILE))
        return JSON.parse(fs$3.readFileSync(GPU_INFO_FILE, 'utf-8'));
    return DEFAULT_SETTINGS;
});
const getResourcesInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const ramUsedInfo = yield nodeOsUtils.mem.used();
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
const getCurrentLoad = () => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const cpuPercentage = yield nodeOsUtils.cpu.usage();
    let data = {
        run_mode: 'cpu',
        gpus_in_use: [],
    };
    if (process.platform !== 'darwin') {
        data = JSON.parse(fs$3.readFileSync(GPU_INFO_FILE, 'utf-8'));
    }
    if (data.run_mode === 'gpu' && data.gpus_in_use.length > 0) {
        const gpuIds = data.gpus_in_use.join(',');
        if (gpuIds !== '' && data['vulkan'] !== true) {
            require$$0.exec(`nvidia-smi --query-gpu=index,name,temperature.gpu,utilization.gpu,memory.total,memory.free,utilization.memory --format=csv,noheader,nounits --id=${gpuIds}`, (error, stdout, _) => {
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
/**
 * This will retrieve GPU information and persist settings.json
 * Will be called when the extension is loaded to turn on GPU acceleration if supported
 */
const updateNvidiaInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    // ignore if macos
    if (process.platform === 'darwin')
        return;
    try {
        JSON.parse(fs$3.readFileSync(GPU_INFO_FILE, 'utf-8'));
    }
    catch (error) {
        if (!fs$3.existsSync(SETTINGS_DIR)) {
            fs$3.mkdirSync(SETTINGS_DIR, {
                recursive: true,
            });
        }
        fs$3.writeFileSync(GPU_INFO_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
    }
    yield updateNvidiaDriverInfo();
    yield updateGpuInfo();
});
const updateNvidiaDriverInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        require$$0.exec('nvidia-smi --query-gpu=driver_version --format=csv,noheader', (error, stdout) => {
            const data = JSON.parse(fs$3.readFileSync(GPU_INFO_FILE, 'utf-8'));
            if (!error) {
                const firstLine = stdout.split('\n')[0].trim();
                data.nvidia_driver.exist = true;
                data.nvidia_driver.version = firstLine;
            }
            else {
                data.nvidia_driver.exist = false;
            }
            fs$3.writeFileSync(GPU_INFO_FILE, JSON.stringify(data, null, 2));
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
        let data = JSON.parse(fs$3.readFileSync(GPU_INFO_FILE, 'utf-8'));
        // Cuda
        if (data.vulkan === true) {
            // Vulkan
            require$$0.exec(process.platform === 'win32'
                ? `${__dirname}\\..\\bin\\vulkaninfoSDK.exe --summary`
                : `${__dirname}/../bin/vulkaninfo --summary`, (error, stdout) => __awaiter(void 0, void 0, void 0, function* () {
                if (!error) {
                    const output = stdout.toString();
                    node.log(output);
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
                    fs$3.writeFileSync(GPU_INFO_FILE, JSON.stringify(data, null, 2));
                    node.log(`[APP]::${JSON.stringify(data)}`);
                    resolve({});
                }
                else {
                    reject(error);
                }
            }));
        }
        else {
            require$$0.exec('nvidia-smi --query-gpu=index,memory.total,name --format=csv,noheader,nounits', (error, stdout) => __awaiter(void 0, void 0, void 0, function* () {
                if (!error) {
                    node.log(`[SPECS]::${stdout}`);
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
                fs$3.writeFileSync(GPU_INFO_FILE, JSON.stringify(data, null, 2));
                node.log(`[APP]::${JSON.stringify(data)}`);
                resolve({});
            }));
        }
    });
});
/**
 * Check if file exists in paths
 */
const checkFileExistenceInPaths = (file, paths) => {
    return paths.some((p) => fs$3.existsSync(path__default["default"].join(p, file)));
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
        paths = process.env.PATH ? process.env.PATH.split(path__default["default"].delimiter) : [];
    }
    else {
        filesCuda12 = ['libcudart.so.12', 'libcublas.so.12', 'libcublasLt.so.12'];
        filesCuda11 = ['libcudart.so.11.0', 'libcublas.so.11', 'libcublasLt.so.11'];
        paths = process.env.LD_LIBRARY_PATH
            ? process.env.LD_LIBRARY_PATH.split(path__default["default"].delimiter)
            : [];
        paths.push('/usr/lib/x86_64-linux-gnu/');
    }
    let cudaExists = filesCuda12.every((file) => fs$3.existsSync(file) || checkFileExistenceInPaths(file, paths));
    if (!cudaExists) {
        cudaExists = filesCuda11.every((file) => fs$3.existsSync(file) || checkFileExistenceInPaths(file, paths));
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
            require$$0.exec('nvidia-smi', (error, stdout) => {
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
    const platform = node.SupportedPlatforms.find((p) => p === process.platform) || 'unknown';
    const osInfo = {
        platform: platform,
        arch: process.arch,
        release: os__default["default"].release(),
        machine: os__default["default"].machine(),
        version: os__default["default"].version(),
        totalMem: os__default["default"].totalmem(),
        freeMem: os__default["default"].freemem(),
    };
    return osInfo;
};
const registerLogger = ({ logEnabled, logCleaningInterval }) => {
    const logger = new FileLogger(logEnabled, logCleaningInterval);
    node.LoggerManager.instance().register(logger);
    logger.cleanLogs();
};
const unregisterLogger = () => {
    node.LoggerManager.instance().unregister('file');
};
const updateLogger = ({ logEnabled, logCleaningInterval }) => {
    const logger = node.LoggerManager.instance().loggers.get('file');
    if (logger && logEnabled !== undefined)
        logger.logEnabled = logEnabled;
    if (logger && logCleaningInterval)
        logger.logCleaningInterval = logCleaningInterval;
    // Rerun
    logger && logger.cleanLogs();
};

exports.GPU_INFO_FILE = GPU_INFO_FILE;
exports.SETTINGS_DIR = SETTINGS_DIR;
exports.getCurrentLoad = getCurrentLoad;
exports.getGpuConfig = getGpuConfig;
exports.getOsInfo = getOsInfo;
exports.getResourcesInfo = getResourcesInfo;
exports.registerLogger = registerLogger;
exports.unregisterLogger = unregisterLogger;
exports.updateLogger = updateLogger;
exports.updateNvidiaInfo = updateNvidiaInfo;
//# sourceMappingURL=index.cjs.js.map
