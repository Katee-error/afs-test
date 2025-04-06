import { organizationStore } from "@/stores/organisationStore";
import { createContext, useContext } from "react";

export const store = {
  organizationStore,
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
