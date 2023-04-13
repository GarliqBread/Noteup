import GlobalStyles from "@/reset.css";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";

import { settingsState } from "@noteup/shared/recoil/settings.recoil";

import { themes } from "@noteup/shared/styles/theme";
import { darkTheme, lightTheme } from "@noteup/shared/styles/theme/colors";

export const wrapWithTheme = (children: JSX.Element): JSX.Element => (
  <ThemeProvider theme={themes}>{children}</ThemeProvider>
);
interface Props {
  children: JSX.Element;
}

export const ThemeWrapper = ({ children }: Props) => {
  const settings = useRecoilValue(settingsState);

  const themeObject = {
    ...themes,
    color: settings.theme === "light" ? lightTheme : darkTheme,
    mode: settings.theme,
  };

  return (
    <ThemeProvider theme={themeObject}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
