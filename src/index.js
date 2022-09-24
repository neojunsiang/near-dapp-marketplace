import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeContract } from "./utils/near";

import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

// to ensure app render only contract is init
window.nearInitPromise = initializeContract()
  .then(() => {
    createRoot(document.getElementById("root"))
      .render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,)
  })
  .catch(console.error);

reportWebVitals();