import React, { Component, Fragment, ChangeEvent } from 'react';
import AceEditor from "react-ace";
import { sampleCppProgram, sampleJavaProgram } from "./samples";
import { getLintResults } from "./api";
import "./App.css";

import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/theme/monokai";

export interface IAnnotation {
  row: number;
  column: number;
  type: string;
  text: string;
}

interface IAppState {
  lang: string;
  annotations: IAnnotation[];
  code: string;
  hasSyntacticErrors: boolean;
}

class App extends Component<{}, IAppState> {
  state = {
    lang: "",
    annotations: [],
    code: "",
    hasSyntacticErrors: false
  }

  setJavaCode = () => {
    this.setState({ code: sampleJavaProgram, lang: "java", annotations: [], hasSyntacticErrors: false })
  }

  setCppCode = () => {
    this.setState({ code: sampleCppProgram, lang: "cpp", annotations: [], hasSyntacticErrors: false })
  }

  setLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ lang: e.target.value })
  }

  componentDidUpdate = (prevProps: {}, prevState: IAppState) => {
    if (prevState.code !== this.state.code || prevState.lang !== this.state.lang) {
      this.refreshLint()
    }
  }

  refreshLint = async () => {
    try {
      const annotations = await getLintResults(this.state.code, this.state.lang);
      this.setState({ annotations, hasSyntacticErrors: false });   
    } catch(e) {
      this.setState({ hasSyntacticErrors: true })
    }
  }

  onCodeChange = async (value: string) => {
    this.setState({ code: value })
    this.refreshLint()
  }

  render = () => (
    <Fragment>
      <h1>Simple Linter</h1>
      <p>This utility lints source code to verify if it conforms <a href="https://github.com/google/styleguide">Google's Style Guide</a>. It uses <a href="https://checkstyle.org/index.html">checkstyle</a> and <a href="https://github.com/google/styleguide/tree/gh-pages/cpplint">cpplint</a> for the linting. Currently implemented languages: <strong>Java, C++</strong></p>
      <p>Add sample code: <button onClick={this.setJavaCode}>Java</button><button onClick={this.setCppCode}>C++</button></p>
      <p>Language: <select onChange={this.setLanguage} value={this.state.lang}><option value="java">Java</option><option value="cpp">C++</option></select></p>
      {this.state.hasSyntacticErrors && <p className="error"> There are syntax errors! Please correct them. </p>}
      <div id="code-linter-container">
        <AceEditor
          mode={this.state.lang === "cpp" ? "c_cpp": "java"}
          theme="monokai"
          onChange={this.onCodeChange}
          name="code-linter"
          value={this.state.code}
          width={"100%"}
          height={"100vh"}
          editorProps={{ $blockScrolling: true }}
          annotations={this.state.annotations}
        />
      </div>
    </Fragment>
  )
}


export default App;
