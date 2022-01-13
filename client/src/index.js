import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "./Context";

import './styles/reset.css';
import "./styles/global.css";


ReactDOM.render(
  // Wrap entire App so children have context
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);