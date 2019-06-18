"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const tmp_1 = __importDefault(require("tmp"));
exports.analyze = (job) => {
    return new Promise((resolve, reject) => {
        switch (job.lang) {
            case "cpp":
                tmp_1.default.file({ postfix: ".cpp" }, (err, path) => {
                    if (err) {
                        reject(err);
                    }
                    fs_1.writeFile(path, job.code, error => {
                        if (error) {
                            reject(error);
                        }
                        const cmd = child_process_1.spawn("./cpp/cpplint/cpplint.py", [path]);
                        let output = "";
                        cmd.stdout.on("data", chunk => {
                            output += chunk;
                        });
                        cmd.on("close", code => {
                            console.log("code", code);
                            resolve(output);
                        });
                    });
                });
                break;
            case "java":
                break;
        }
    });
};
//# sourceMappingURL=index.js.map