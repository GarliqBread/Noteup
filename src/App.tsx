import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Notebook } from "@/pages/Notebook/Notebook";
import Layout from '@/components/Layout'

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notebook" element={<Notebook />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
