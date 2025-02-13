"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cpu_instructions_1 = require("cpu-instructions");
// Check the CPU info and determine the supported instruction set
const info = cpu_instructions_1.cpuInfo.cpuInfo().some((e) => e.toUpperCase() === 'AVX512')
    ? 'avx512'
    : cpu_instructions_1.cpuInfo.cpuInfo().some((e) => e.toUpperCase() === 'AVX2')
        ? 'avx2'
        : cpu_instructions_1.cpuInfo.cpuInfo().some((e) => e.toUpperCase() === 'AVX')
            ? 'avx'
            : 'noavx';
// Send the result and wait for confirmation before exiting
new Promise((resolve, reject) => {
    // @ts-ignore
    process.send(info, (error) => {
        if (error) {
            reject(error);
        }
        else {
            resolve();
        }
    });
})
    .then(() => process.exit(0))
    .catch((error) => {
    console.error('Failed to send info:', error);
    process.exit(1);
});
//# sourceMappingURL=cpuInfo.js.map