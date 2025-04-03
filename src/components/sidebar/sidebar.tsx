"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import companyIcon from "./../../../public/assets/icons/Company.svg";
import contractorIcon from "./../../../public/assets/icons/Contractor.svg";
import accountIcon from "./../../../public/assets/icons/Account.svg";
import styles from "./Sidebar.module.scss";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Organizations", icon: companyIcon },
    { href: "/contractors", label: "Contractors", icon: contractorIcon },
    { href: "/clients", label: "Clients", icon: accountIcon },
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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className={isActive ? styles.active : ""}>
                <Link href={item.href} className={styles.navLink}>
                  <Image
                    src={item.icon}
                    width={20}
                    height={20}
                    alt={`${item.label} icon`}
                    className={isActive ? styles.lightIcon : styles.darkIcon}
                  />
                  <span>{item.label}</span>
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
