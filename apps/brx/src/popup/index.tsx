import React from "react";
import { createRoot } from "react-dom/client";
import { PopupView } from "./view";
import { Buffer } from "buffer";

//@ts-ignore
window["Buffer"] = Buffer;

const container = document.createElement("div");
document.body.appendChild(container);

const root = createRoot(container);
root.render(<PopupView />);
