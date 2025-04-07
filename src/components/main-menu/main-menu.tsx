"use client";
import React from "react";
import styles from "./MainMenu.module.scss";
import { CompanyIcon, Logo, SignOutIcon } from "../icons";
import { SearchIcon, SettingsIcon } from "lucide-react";


export const MainMenu = () => {
  return (
    <aside className={styles.main_menu}>
      <div className={styles.logo}>
        <Logo width={36} height={36} />
      </div>
      <div className={styles.icons_menu}>
        <div className={styles.icons_menu_start}>
          <div className={styles.icon_wrapper}>
            <CompanyIcon  className={styles.iconSvg} />
          </div>
          <div className={styles.icon_wrapper}>
            <SearchIcon  className={styles.iconSvg} />
          </div>
        </div>
        <div className={styles.icons_menu_end}>
          <div className={styles.icon_wrapper}>
            <SettingsIcon className={styles.iconSvg} />
          </div>
          <div className={styles.icon_wrapper}>
            <SignOutIcon className={styles.iconSvg} />
          </div>
        </div>
      </div>
    </aside>
  );
};
