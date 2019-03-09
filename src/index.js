import React, { useState } from "react";
import ReactDOM from "react-dom";
import pugLexer from "pug-lexer";
import pugParser from "pug-parser";
import Highlight from "react-highlight";

import "highlight.js/styles/androidstudio.css";
import "./styles.css";

function App() {
  const [src, setSrc] = useState("");
  let isError = false;
  let output = "";
  if (src) {
    try {
      const tokens = pugLexer(src);
      const ast = pugParser(tokens);
      output = JSON.stringify(ast, null, 2);
    } catch (e) {
      isError = true;
      output = `Failed to process template\n${e.message}\n${e.stack}`;
    }
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          borderRight: "1px solid #ddd",
          flexBasis: "50%",
          flexGrow: 0,
          flexShrink: 0
        }}
      >
        <textarea
          style={{
            height: "100%",
            width: "100%",
            margin: 0,
            padding: 0,
            border: "none"
          }}
          placeholder="Enter pug code here"
          onChange={e => setSrc(e.target.value)}
        />
      </div>
      <div
        style={{
          overflow: "auto",
          flexBasis: "50%",
          flexGrow: 0,
          flexShrink: 0
        }}
      >
        {isError ? (
          <pre>{output}</pre>
        ) : (
          <Highlight className="json">{output}</Highlight>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
