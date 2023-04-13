import { darkTheme, lightTheme } from "./colors";
import { fontSizes, fontWeights } from "./fonts";
import { radius } from "./radius";
import { spaces } from "./spacing";

export const themes = {
  spaces,
  color: lightTheme || darkTheme,
  fontSizes,
  fontWeights,
  radius,
};

export type MyTheme = typeof themes;
