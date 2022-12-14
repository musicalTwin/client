import React from "react";

import Home from "./pages/Home";
import Test from "./utils/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";

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
          <Route path="/register" element={<Register />} />
          <Route path="/error" element={<Error />} />
          <Route exact path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
