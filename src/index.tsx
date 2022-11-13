import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

import { ThemeWrapper } from "@/components/ThemeWrapper";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </RecoilRoot>
  </StrictMode>,
);
