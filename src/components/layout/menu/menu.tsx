import React from 'react';
import { Sidebar } from '../sidebar';
import { MainMenu } from '../main-menu';
import styles from './Menu.module.scss';

export const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
    <MainMenu/>
    <Sidebar/>
    </div>
  );
};