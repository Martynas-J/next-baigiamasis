"use client"
import styles from "./MainNavBar.module.scss"
import { useState } from 'react';
import Link from "next/link";
import MenuItem from "../MenuItem/MenuItem";
import { signOut, useSession } from "next-auth/react";
import DataProvider from "../DataProvider/DataProvider";

const MainNavBar = ({ isHomePage }) => {
    const session = useSession()
    const [menuOn, setMenuOn] = useState(false)
    const addFormHandler = () => {
        setMenuOn(prevState => !prevState)
    }

    return (

        <nav className={isHomePage ? `${styles.mainNavigation} home-page` : `${styles.mainNavigation}`}>
            <ul className={styles.navList}>
                <li className={styles.navigationItem}>
                    <DataProvider> <Link className={styles.navigationLink} href='/'>Home</Link></DataProvider>
                </li>
                <li className={styles.navigationItem}>
                    <Link className={styles.navigationLink} href='/systems'>Systems</Link>
                </li>
                <li className={styles.navigationItem}>
                    <Link className={styles.navigationLink} href='/stars'>Stars</Link>
                </li>
                <li className={styles.navigationItem}>
                    <Link className={styles.navigationLink} href='/planets'>Planets</Link>
                </li>
                <li className={styles.navigationItem}>
                    <Link className={styles.navigationLink} href='/discoverers'>Discoverers</Link>
                </li>
                <li className={styles.navigationItem}>
                    <Link className={styles.navigationLink} href='/gallery'>Gallery</Link>
                </li>
                <li className={styles.navigationItem}>
                    <Link className={styles.navigationLink} href='/dashboard'>Dashboard</Link>
                </li>
                <li className={styles.navigationItem}>
                    {session.status === "authenticated" && (
                        <button onClick={signOut} className={styles.navigationButton}>Log out</button>
                    )}
                </li>
                {menuOn ? <li><MenuItem /></li> : ""}
                <li>
                    <button className={styles.logoButton} onClick={addFormHandler}>
                        <img className={styles.logo} src='https://icon-library.com/images/hamburger-menu-icon-svg/hamburger-menu-icon-svg-16.jpg' alt='Hamburger Menu' />
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default MainNavBar;