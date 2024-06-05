import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./pages/Router.tsx";
import { SaleConfigProvider } from "./providers/SaleConfigProvider/index.tsx";
import { ThemeProvider } from "./providers/ThemeProvider/index.tsx";
import { Web3Provider } from "./providers/Web3Provider/index.tsx";

globalThis.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3Provider>
      <SaleConfigProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </SaleConfigProvider>
    </Web3Provider>
  </React.StrictMode>
);
