import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    border: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: auto;
    font-weight: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    text-decoration: none;
    text-rendering: optimizeLegibility;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  html {
    display: flex;
    min-height: 100%;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
    color: #16171a;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: auto;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.firstLayer};
    overscroll-behavior-y: none;
    -webkit-overflow-scrolling: touch;
  }
  #root {
    height: 100vh;
    width: 100vw;
  }
  a {
    color: currentColor;
    text-decoration: none;
  }
  a:hover {
    cursor: pointer;
  }
  code, p, span {
    color: ${(props) => props.theme.color.text};
  }
  code {
    background-color: ${(props) => props.theme.color.codeBlock};
  }
  .code-mirror {
    width: 100%;
    height: ${({ theme }) => `calc(100% - ${theme.spaces.desktopEditor})`};

    &-toolbar {
      height: ${({ theme }) => `calc(100% - ${theme.spaces.desktopEditorWithToolbar})`};
    }

    @media (max-width: 500px) {
      height: ${({ theme }) => `calc(100% - ${theme.spaces.mobileEditor})`};
    }
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: ${(props) => props.theme.color.scrollBar};
  }
  ::-webkit-scrollbar-thumb {
    background: #1f6ce0;
    border-radius: 2px;
  }
  #pdf-preview {
    position: absolute;
    width: 793px;
    z-index: -1;

    .previewer {
      min-height: 841px;
    }
  }
  .Resizer {
    opacity: 0.2;
    z-index: 97;
    box-sizing: border-box;
    background-clip: padding-box;
  }
  .Resizer:hover {
    transition: all 0.5s ease;
  }
  .Resizer.vertical {
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }
  .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
`;
