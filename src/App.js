import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "./Pages/IndexPage";
import Detail from "./Pages/Detail";
import Header from "./comps/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route path="/Detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
