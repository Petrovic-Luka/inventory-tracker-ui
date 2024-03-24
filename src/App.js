import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CreateEquipmentPage from "./pages/CreateEquipment/CreateEquipmentPage";
import CreateBorrowPage from "./pages/CreateBorrow/CreateBorrowPage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/Equipment" exact element={<CreateEquipmentPage />} />
          <Route path="/CreateBorrow" exact element={<CreateBorrowPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
