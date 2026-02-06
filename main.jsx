import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/Theme.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeToggle>
      <App />
    </ThemeToggle>
  </React.StrictMode>
);
