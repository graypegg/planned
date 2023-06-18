export const theme = {
  bright: "#ffffff",
  background: "#f4f6f8",
  primary: "#52a27e",
  primaryDark: "#2d5b44",
  border: "#dadfe7",
  text: "#1a3d46",
  textLight: "#858d9a",
}

type Theme = typeof theme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
