import * as React from "react";

type ContextProvider<TProviderProps> = React.FC<
  React.PropsWithChildren<TProviderProps>
>;
type UseContext<TContext> = () => TContext;
type WithContext<TProviderProps> = <TRef, TProps>(
  options: React.PropsWithChildren<TProviderProps>,
  Component: React.ForwardRefRenderFunction<TRef, TProps>
) => React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps>>;

export default function createContext<TProviderProps, TContext>(
  useHook: (args: TProviderProps) => TContext,
  contextName = "Hook"
): [
  ContextProvider<TProviderProps>,
  UseContext<TContext>,
  WithContext<TProviderProps>,
  React.Context<TContext | undefined>
] {
  const Context = React.createContext<TContext | undefined>(undefined);

  const Provider = ({
    children,
    ...options
  }: React.PropsWithChildren<TProviderProps>) => {
    const value = useHook((options as unknown) as TProviderProps);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  if (process.env.NODE_ENV === "development") {
    Context.displayName = `${contextName}Context`;
    Provider.displayName = `${contextName}Provider`;
  }

  const useContext = () => {
    const context = React.useContext(Context);
    if (process.env.NODE_ENV === "development") {
      if (context === undefined) {
        console.warn(
          `use${contextName}Context must be used within a ${contextName}Provider`
        );
      }
    }
    return context as TContext;
  };

  function withContext<TProps, TRef>(
    options: React.PropsWithChildren<TProviderProps>,
    Component: React.ForwardRefRenderFunction<TRef, TProps>
  ) {
    const WithContext = React.forwardRef<TRef, TProps>((props: TProps, ref) => (
      <Provider {...options}>
        <Component {...props} ref={ref} />
      </Provider>
    ));

    if (process.env.NODE_ENV === "development") {
      WithContext.displayName = `With${contextName}(${
        Component.displayName || Component.name || "Component"
      })`;
    }
    return WithContext;
  }

  return [Provider, useContext, withContext, Context];
}

export { createContext };
