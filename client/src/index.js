import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GameProvider } from "./components/GameProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/sign-in/SignIn";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GameProvider>
        <Route exact path="/" component={SignIn} />
        <Route path="/game" component={App} />
      </GameProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
