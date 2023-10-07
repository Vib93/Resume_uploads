import { StrictMode } from "react";
import {createRoot} from "react-dom/client";
import App from "./app";

const rootelement= document.getElementById("root");
if(!rootelement)throw new Error('react app configured incorrectly');
const root= createRoot(rootelement);

root.render(
    <StrictMode>
        <App />         
    </StrictMode>
)