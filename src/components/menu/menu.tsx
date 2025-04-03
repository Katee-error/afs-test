import React from "react";
import styles from "./Menu.module.scss";
import { Sidebar } from "../sidebar";
import { MainMenu } from "../main-menu";

export const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <MainMenu />
      <Sidebar />
    </div>
  );
};
