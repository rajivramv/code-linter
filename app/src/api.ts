import { debounce } from "underscore";
import { IAnnotation } from "./App";
const CPP_ERROR_REGEX = /^[a-zA-Z0-9/\-.]+.cpp:([0-9]+): (.*)/;
const JAVA_ERROR_REGEX = /^[a-zA-Z0-9/\-.[\] ]+.java:([0-9]+):[0-9:]* (.*)/;

// tslint:disable-next-line: variable-name
const _getLintResults = (code: string, lang: string): Promise<IAnnotation[]> => {
  const options = {
    body: `code=${encodeURI(code)}&lang=${lang}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    method: "post"
  };
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URI}/lint`, options)
      .then(res => {
        res.json().then(json => {
          switch (json.lang) {
            case "cpp":
              const cppErrors = json.errors
                .split("\n")
                .filter((line: string) => line.length !== 0)
                .map((line: string) => {
                  const match = line.match(CPP_ERROR_REGEX);
                  if (match != null) {
                    return { row: Number(match[1]) - 1, column: 0, type: "error", text: match[2] };
                  } else {
                    return {};
                  }
                });
              resolve(cppErrors);
              break;
            case "java":
              if (json.errors.length > 0) {
                reject("There are syntactic errors");
                return;
              }
              const javaErrors = json.completed
                .replace("Starting audit...", "")
                .replace("Audit done.", "")
                .split("\n")
                .filter((line: string) => line.length !== 0)
                .map((line: string) => {
                  const match = line.match(JAVA_ERROR_REGEX);
                  if (match != null) {
                    return { row: Number(match[1]) - 1, column: 0, type: "error", text: match[2] };
                  } else {
                    return {};
                  }
                });
              resolve(javaErrors);
              break;
          }
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getLintResults = debounce(_getLintResults, 100, true);
