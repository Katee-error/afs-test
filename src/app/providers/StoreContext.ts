import { createContext, useContext } from "react";
import { OrganizationStore } from "@/stores/organisationStore";

export const store = {
  organizationStore: new OrganizationStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
