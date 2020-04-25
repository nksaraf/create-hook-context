import createContext from "create-hook-context";
import React from "react";

const [ThemeProvider, useTheme, withThemeProvider] = createContext<
  object,
  { theme: object }
>(({ theme }) => theme, {}, "Theme");

export default withThemeProvider({ theme: { a: 1 } }, () => {
  const val = useTheme();
  return <pre>{JSON.stringify(val)}</pre>;
});
