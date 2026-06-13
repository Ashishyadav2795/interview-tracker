import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import InterviewPage from "./pages/InterviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/interviews" element={<InterviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;