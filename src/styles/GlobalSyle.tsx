import { createGlobalStyle } from "styled-components";
interface Colors {
  light100: string;
  light300: string;
  light200: string;
  dark200: string;
  dark300: string;
  dark400: string;
  dark600: string;
  dark700: string;
  dark800: string;
  dark900: string;
  red100: string;
  red200: string;
  blue800: string;
  green100: string;
  green700: string;
}
/* Default colors */
export const colors: Colors = {
  light100: "#ffffff",
  light200: "#F3F3F3",
  light300: "#E5E5E5 ",
  dark200: "#557086",
  dark300: "#58595b",
  dark400: "#424B5A",
  dark600: "#252932",
  dark700: "#363636",
  dark800: "#050D1D",
  dark900: "#0D0D0D",
  red100: "#E11837",
  red200: "#B30E27",
  green100: "#00e701",
  blue800: "#0202f3ea",
  green700: "#1fff20",
} as const;

export default createGlobalStyle`
 :root {
  --font-family: sans-serif;
  --transition: all .3s ease-out;
  --spacing: ".25rem";
  --radius: "1rem"; 
}
*,*::before,*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: var(--font-family);
  line-height: 1.5;
  
}



`;
