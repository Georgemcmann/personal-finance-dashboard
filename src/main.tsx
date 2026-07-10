import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { useFinanceStore } from "./shared/store/useFinanceStore";
// @ts-ignore: allow side-effect css import without type declarations
import "./styles/index.css";

useFinanceStore.getState().initializeData();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
