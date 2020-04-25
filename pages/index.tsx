import createContext from "create-hook-context";
import React from "react";

const [ThemeProvider, useTheme] = createContext<object, { theme: object }>(
  ({ theme }) => theme,
  {},
  "Theme"
);

const Consumer = () => {
  const val = useTheme();
  return <pre>{JSON.stringify(val)}</pre>;
};

export default () => {
  return (
    <>
      <ThemeProvider theme={{ a: 1 }}>
        <Consumer />
      </ThemeProvider>
    </>
  );
};
