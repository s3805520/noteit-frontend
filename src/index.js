import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import { BrowserRouter, Route } from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>,
    document.getElementById("root")
);
