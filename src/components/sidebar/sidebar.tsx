"use client";
import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { usePathname } from "next/navigation";
import { AccountIcon, CompanyIcon, ContractorsIcon } from "../icons";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/organisation", label: "Organizations", icon: CompanyIcon },
    { href: "/contractors", label: "Contractors", icon: ContractorsIcon },
    { href: "/clients", label: "Clients", icon: AccountIcon },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>Oak Tree Cemetery</h2>
        <p>Process Manager</p>
      </div>

      <div className={styles.drawer}></div>
      <nav className={styles.nav}>
        <ul>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className={isActive ? styles.active : ""}>
                <Link href={href} className={styles.navLink}>
                  <Icon className={styles.navIcon} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <p>All Funeral Services © 2015-2025</p>
      </div>
    </aside>
  );
};
