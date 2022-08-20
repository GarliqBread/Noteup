import { Controlled as CodeMirror } from "react-codemirror2";
import styled from "styled-components";

const StyledCodeMirror = styled(CodeMirror)`
  overflow-y: auto;
  height: 100vh;
  display: block !important;

  .CodeMirror {
    -webkit-font-smoothing: subpixel-antialiased;
    padding: 10px 5px;
    height: 100%;
    font-family: Menlo, Monaco, monospace;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.5;
  }

  .CodeMirror-lines {
    padding: 0;
  }

  .CodeMirror-linenumber {
    padding-right: 5px;
    padding-left: 0;
  }

  .CodeMirror-gutter-background {
    color: #333;
  }

  .CodeMirror-activeline-background {
    background: rgba(0, 0, 0, 0.05) !important;
  }

  .cm-notelink {
    font-style: italic;
    font-weight: bold;
    color: #0daba3;
  }
`;

export { StyledCodeMirror };
