import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppContainer } from "@/views/AppContainer";

function App() {
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
