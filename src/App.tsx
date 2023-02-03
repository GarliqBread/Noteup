import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppContainer } from "@/views/AppContainer";
import { LandingPage } from "@/views/LandingPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<AppContainer />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
