import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Auth from "./components/auth";
import Chat from "./components/chat";
import Users from "./components/users";
import "./App.css";

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Auth} />
            <Route path="/chat" component={Chat} />
            <Route path="/users" exact component={Users} />
        </Router>
    );
};

export default App;
