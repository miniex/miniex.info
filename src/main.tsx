import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";

import "@/styles/global.scss";
import "@/i18n";

const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
} else {
    console.error("Root element not found");
}