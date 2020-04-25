# create-hook-context

A more powerful version of `React.createContext`. Accepts a hook that takes in props for a provider, and then returned value of the hook, is the value provided to the context's consumers.

Signature:

```javascript

import createContext from 'create-hook-context';

const [ThemeProvider, useTheme, withThemeProvider, ThemeContext] = createContext(
  ({ theme }) => theme, // hook that provides values for context given input
  {}, // defaultValue for context
  "Theme" // displayName for Context
)

const Consumer = () => {
  const val = useTheme();
  return <pre>{JSON.stringify(val)}</pre>;
};

const App = () => {
  return (
    <ThemeProvider theme={{ a: 1 }}>
      <Consumer />
    </ThemeProvider>
  );
};

/* or can use withThemeProvider to wrap components */

const App = withThemeProvider({ theme: { a: 1 } }, () => {
  const val = useTheme();
  return <pre>{JSON.stringify(val)}</pre>;
});


```
