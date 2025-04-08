import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SOPDashboard from "./pages/SOPDashboard";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SOPDashboard />
  </React.StrictMode>
);

reportWebVitals();
