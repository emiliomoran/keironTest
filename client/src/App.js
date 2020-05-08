import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import User from "./pages/User";

function App() {
  return (
    <Router>
      <Route path="/" component={Login} exact />
      <Route path="/registro" component={Register} exact />
      <Route path="/administrador" component={Admin} exact />
      <Route path="/usuario" component={User} exact />
    </Router>
  );
}

export default App;
