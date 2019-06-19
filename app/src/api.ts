import { debounce } from "underscore";
import { IAnnotation } from "./App";
const CPP_ERROR_REGEX = /^[a-zA-Z0-9/\-.]+.cpp:([0-9]+): (.*)/;

const _getLintResults = (code: string, lang: string): Promise<IAnnotation[]> => {
  const options = {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `code=${encodeURI(code)}&lang=${lang}`
  }
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URI}/lint`, options).then((res) => {
      res.json().then(json => {
        switch(json.lang) {
          case "cpp":
            const errors = json.errors.split("\n").filter((line: string) => line.length !== 0).map((line: string) => {
              const match = line.match(CPP_ERROR_REGEX);
              if (match != null) {
                return { row: Number(match[1]) - 1, column: 0, type: "error", text: match[2] }
              } else return {}
            });
            resolve(errors);         
          break;
          case "java":
            if (json.errors.length > 0) 
            reject("There are syntactic errors");
            console.log(json)
            break;
  
        }
  
      })
    }).catch(err => {
      reject(err)
    })
  })

}

export const getLintResults = debounce(_getLintResults, 100, true); 