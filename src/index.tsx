import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import { ThemeWrapper } from "@/components/ThemeWrapper";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </RecoilRoot>
  </React.StrictMode>,
);
