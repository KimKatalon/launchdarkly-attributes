import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { withLDProvider } from "launchdarkly-react-client-sdk";
import { render } from "react-dom";
// import { LDProvider } from "launchdarkly-react-client-sdk";

const LDProvider = withLDProvider({
  clientSideID: "67e360b82219ab0989a1367a",
  context: {
    kind: "user",
    key: "context-key-changing",
    organization: 1,
    account: 2,
    project: 3,
  }
})(App);

const rootElement = document.getElementById("root");
render(<LDProvider />, rootElement);

