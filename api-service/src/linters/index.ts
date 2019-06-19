import { spawn } from "child_process";
import { writeFile } from "fs";
import tmp from "tmp";

export interface ILintRequest {
  code: string;
  lang: string;
}

export interface ILintResult {
  lang: "cpp" | "java";
  errors: string;
  completed: string;
}

export const lint = (job: ILintRequest): Promise<ILintResult> => {
  return new Promise((resolve, reject) => {
    switch (job.lang) {
      case "cpp":
        tmp.file({ postfix: ".cpp" }, (err, path) => {
          if (err) {
            reject(err);
          }
          writeFile(path, job.code, error => {
            if (error) {
              reject(error);
            }
            const cmd = spawn(`${__dirname}/cpp/cpplint/cpplint.py`, [path]);
            let errors = "";
            let completed = "";
            cmd.stdout.on("data", chunk => {
              completed += chunk;
            });
            cmd.stderr.on("data", chunk => {
              errors += chunk;
            });
            cmd.on("close", code => {
              resolve({ lang: "cpp", errors, completed });
            });
          });
        });
        break;
      case "java":
        tmp.file({ postfix: ".java" }, (err, path) => {
          if (err) {
            reject(err);
          }
          writeFile(path, job.code, error => {
            if (error) {
              reject(error);
            }
            const cmd = spawn("java", [
              "-jar",
              `${__dirname}/java/checkstyle-8.21-all.jar`,
              "-c",
              `${__dirname}/java/google_checks.xml`,
              path
            ]);
            let errors = "";
            let completed = "";
            cmd.stdout.on("data", chunk => {
              completed += chunk;
            });
            cmd.stderr.on("data", chunk => {
              errors += chunk;
            });
            cmd.on("close", code => {
              resolve({ lang: "java", errors, completed });
            });
          });
        });
        break;
    }
  });
};

// const detectLanguage = (code: string): Promise<string> => {

// }