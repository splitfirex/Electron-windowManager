/**
 * React renderer.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initializeIcons } from '@uifabric/icons';

// Import the styles here to process them with webpack
import "@public/style.css";
import { App } from "./app";
initializeIcons();

ReactDOM.render(<App />, document.getElementById("app"));
