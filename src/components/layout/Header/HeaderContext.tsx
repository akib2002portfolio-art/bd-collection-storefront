import {
  createContext,
  useContext,
} from "react";

export type HeaderVariant =
  | "transparent"
  | "solid";

interface HeaderContextValue {
  variant: HeaderVariant;
  isScrolled: boolean;
  isHomePage: boolean;
}

const HeaderContext =
  createContext<HeaderContextValue | null>(null);

export function HeaderProvider({
  value,
  children,
}: {
  value: HeaderContextValue;
  children: React.ReactNode;
}) {
  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderTheme() {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error(
      "useHeaderTheme must be used inside HeaderProvider"
    );
  }

  return context;
}