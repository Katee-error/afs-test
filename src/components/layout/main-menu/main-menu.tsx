'use client';

import React from 'react';
import Image from 'next/image';
import logoIcon from "./../../../../public/assets/icons/Logo.svg";
import companyIcon from "./../../../../public/assets/icons/Company.svg";
import searchIcon from "./../../../../public/assets/icons/Search.svg";
import settingsIcon from "./../../../../public/assets/icons/Settings.svg";
import signOutIcon from "./../../../../public/assets/icons/SignOut.svg";
import styles from './MainMenu.module.scss';

export const MainMenu = () => {
  return (
    <aside className={styles.main_menu}>
      <div className={styles.logo}>
        <Image src={logoIcon} alt="Logo" width={36} height={36} />
      </div>
      <div className={styles.icons_menu}>
        <div className={styles.icons_menu_start}>
          <div className={styles.icon_wrapper}>
            <Image src={companyIcon} alt="Company Icon" width={36} height={36} />
          </div>
          <div className={styles.icon_wrapper}>
            <Image src={searchIcon} alt="Search Icon" width={36} height={36} />
          </div>
        </div>
        <div className={styles.icons_menu_end}>
          <div className={styles.icon_wrapper}>
            <Image src={settingsIcon} alt="Settings Icon" width={36} height={36} />
          </div>
          <div className={styles.icon_wrapper}>
            <Image src={signOutIcon} alt="Sign Out Icon" width={36} height={36} />
          </div>
        </div>
      </div>
    </aside>
  );
};

