import React from "react";
import "./Login.css";
import "./Parameters.css";
import Home from "./Home";
import Test from "./Test";
import Login from "./Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
