import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppContainer } from "@/Notebook/AppContainer";
import Layout from '@/components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/app" element={<AppContainer />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
