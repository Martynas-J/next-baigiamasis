"use client"
import styles from "./MainNavBar.module.scss"
import { useState } from 'react';
import Link from "next/link";
import MenuItem from "../MenuItem/MenuItem";

const MainNavBar = ({ isHomePage }) => {
    const [menuOn, setMenuOn] = useState(false)
    const addFormHandler = () => {
        setMenuOn(prevState => !prevState)
    }
    return (
        <nav className={isHomePage ? `${styles.mainNavigation} home-page` : `${styles.mainNavigation}`}>
            <ul className={styles.navList}>
                <li className={styles.navigationItem}>
                    <Link className={styles.navigationLink} href='/'>Home</Link>
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