import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  return (
    <aside className={styles.sidebar}>
    <div className={styles.brand}>
      <h2>Oak Tree Cemetery</h2>
      <p>Process Manager</p>
    </div>

    <nav className={styles.nav}>
      <ul>
        <li className={styles.active}>
          <Link href="/organizations">
            <span className={styles.icon} />
            <span>Organizations</span>
          </Link>
        </li>
        <li>
          <Link href="/contractors">
            <span className={styles.icon} />
            <span>Contractors</span>
          </Link>
        </li>
        <li>
          <Link href="/clients">
            <span className={styles.icon} />
            <span>Clients</span>
          </Link>
        </li>
      </ul>
    </nav>

    <div className={styles.footer}>
      <p>All Funeral Services © 2019-2025</p>
    </div>
  </aside>
  );
};