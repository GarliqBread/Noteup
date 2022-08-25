import { useRecoilValue } from "recoil";
import GlobalStyles from "reset.css";
import { ThemeProvider } from "styled-components";
import { themes } from "styles/theme";
import { darkTheme, lightTheme } from "styles/theme/colors";

import { settingsState } from "recoil/settings.recoil";

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
