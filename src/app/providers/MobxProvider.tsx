'use client';

import { ReactNode } from "react";
import { enableStaticRendering } from "mobx-react-lite";
import { store, StoreContext } from "./StoreContext";

enableStaticRendering(typeof window === "undefined");

export const MobxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};
