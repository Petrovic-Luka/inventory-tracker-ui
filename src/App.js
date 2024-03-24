import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
