# create-hook-context

A more powerful version of `React.createContext`. Accepts a hook function that takes in props for a Provider and then the returned value of the hook is the value provided to the Context's consumers. 

Given hook `(props: TProviderProps) => TContext`, returns utilities as an array `[ContextProvider, useContext, withContextProvider, Context]` to consume this context:

* `ContextProvider`: Takes in `TProviderProps` and provides a context `TContext`, eg. 
```tsx

<ContextProvider {...props}>
  <Consumers>
 </ContextProvider>
```
* `useContext`: Returns the wrapped `TContext`, eg. 
```tsx 

const context = useContext()
```
* `withContextProvider`: Can be used to wrap a component with a `ContextProvider`, eg. 
```tsx 

const App = withContextProvider(props)(() => { 
  const context = useContext(); 
  return <div>{JSON.stringify(context)}</div>;
});
```
* `Context`: Context created by React

### Example:

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
