import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Notebook } from "@/pages/Notebook/Notebook";
import Layout from '@/components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/notebook" element={<Notebook />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
