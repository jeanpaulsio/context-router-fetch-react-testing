import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { NameProvider } from "./context";

ReactDOM.render(
  <NameProvider>
    <App />
  </NameProvider>,
  document.getElementById("root")
);
