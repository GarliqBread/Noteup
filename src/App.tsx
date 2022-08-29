import { invoke } from "@tauri-apps/api";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { isTauri } from "utils/helpers";

import { AppContainer } from "views/AppContainer";

function App() {
  useEffect(() => {
    if (isTauri) {
      // On mount open the tauri application
      invoke("show_main_window");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />} />
        <Route path="/:route" element={<AppContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
