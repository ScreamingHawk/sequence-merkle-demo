import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";

import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider/index.tsx";
import { Web3Provider } from "./providers/Web3Provider/index.tsx";

globalThis.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3Provider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Web3Provider>
  </React.StrictMode>
);
