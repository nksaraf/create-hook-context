import * as React from "react";

const h = React.createElement;

type ContextProvider<TProviderProps> = React.FC<
  React.PropsWithChildren<TProviderProps>
>;
type UseContext<TContext> = () => TContext;
type WithContext<TProviderProps> = <TRef, TProps>(
  options: React.PropsWithChildren<TProviderProps>,
  Component: React.ForwardRefRenderFunction<TRef, TProps>
) => React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps>>;

export default function createContext<TContext, TProviderProps = TContext>(
  useProvider?: (args: TProviderProps) => TContext,
  defaultValue?: TContext,
  displayName = "Hook"
): [
  ContextProvider<TProviderProps>,
  UseContext<TContext>,
  WithContext<TProviderProps>,
  React.Context<TContext | undefined>
] {
  const Context = React.createContext(defaultValue);

  const ContextProvider = (props: React.PropsWithChildren<TProviderProps>) => {
    const value = (
      useProvider || ((val: TProviderProps) => (val as unknown) as TContext)
    )(props as TProviderProps);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  };

  if (process.env.NODE_ENV !== "production") {
    Context.displayName = `${displayName}Context`;
    ContextProvider.displayName = `${displayName}Provider`;
  }

  const useContext = () => {
    const context = React.useContext(Context);
    if (process.env.NODE_ENV === "development") {
      if (context === undefined) {
        console.warn(
          `use${displayName}Context must be used within a ${displayName}Provider or the context must be created with a defaultValue`
        );
      }
    }
    return context as TContext;
  };

  if (process.env.NODE_ENV === "development") {
    useContext.displayName = `use${displayName}`;
  }

  function withContextProvider<TProps, TRef>(
    options: React.PropsWithChildren<TProviderProps>,
    Component: React.ForwardRefRenderFunction<TRef, TProps>
  ) {
    const WithContextProvider = React.forwardRef<TRef, TProps>(
      (props: TProps, ref) => {
        (props as any).ref = ref;
        return h(ContextProvider, options, h(Component, props));
      }
    );

    if (process.env.NODE_ENV === "development") {
      WithContextProvider.displayName = `With${displayName}Provider(${
        Component.displayName || Component.name || "Component"
      })`;
    }
    return WithContextProvider;
  }

  return [ContextProvider, useContext, withContextProvider, Context];
}

export { createContext };
