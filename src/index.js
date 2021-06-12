import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import { BrowserRouter, Route } from "react-router-dom";
import Amplify from "aws-amplify";

Amplify.config({
    API: {
        endpoints: [
            {
                name: "backend",
                endpoint: "http://3.90.105.161:5000/",
            },
        ],
    },
});

ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>,
    document.getElementById("root")
);
