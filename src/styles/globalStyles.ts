import { createGlobalStyle } from "styled-components";
import { FontFace } from "./fontFace";
import { UIPreflight } from "./preflight";
import { TextGuide } from "./textGuide";
import { GlobalTheme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  ${GlobalTheme}
  ${UIPreflight}
  ${TextGuide}
  ${FontFace}
  * {
    color: var(--black);
    margin: 0;
  }
  body {
    background-color: var(--bright);
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
