import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GameProvider } from "./components/GameProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/sign-in/SignIn";
import { Provider as ChakraProvider } from "@web3-ui/components";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <GameProvider>
          <Route exact path="/" component={SignIn} />
          <Route path="/game" component={App} />
        </GameProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
