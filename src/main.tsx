import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";

Sentry.init({
  dsn: "https://57838d9618f9d59d97d018edb3e89ac1@o4510245555011584.ingest.de.sentry.io/4510261345845329",
  sendDefaultPii: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
