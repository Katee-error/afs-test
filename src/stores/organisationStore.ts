import { makeAutoObservable } from "mobx";

class OrganizationStore {
  orgData: any = null;
  contactData: any = null;
  token: string | null = null;
  tempName: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setTempName = (name: string) => {
    this.tempName = name;
  };

  setOrgData = (data: any) => {
    this.orgData = data;
  };

  setContactData = (data: any) => {
    this.contactData = data;
  };

  setToken = (token: string) => {
    this.token = token;
    localStorage.setItem("authToken", token);
  };
}

export const organizationStore = new OrganizationStore();
