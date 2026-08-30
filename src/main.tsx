import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Self-hosted, not fetched from fonts.googleapis.com: a Google-hosted webfont sends every
// visitor's IP to Google before the page has asked them anything, which LG München I,
// 3 O 17493/20 held to be a GDPR violation. Vite fingerprints and emits the woff2 files, and
// each @font-face carries a unicode-range, so a browser downloads only the subsets it needs.
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-ext-400.css";
import "@fontsource/ibm-plex-mono/latin-ext-500.css";
import App from "./App.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
