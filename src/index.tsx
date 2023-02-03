import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from "recoil";

import { ThemeWrapper } from "@/components/ThemeWrapper";

import App from "./App";
import RecoilNexus from "recoil-nexus";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RecoilNexus />
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
);
