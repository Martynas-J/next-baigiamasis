import Link from "next/link";
import styles from "./MenuItem.module.scss";

const MenuItem = () => {
    return (
        <div className={styles.menuBar}>
            <div className={styles.linkWrapper}>
                <Link href="/" className={styles.navigationLink}>Home</Link>
                <Link href="/systems" className={styles.navigationLink}>System</Link>
                <Link href="/stars" className={styles.navigationLink}>Stars</Link>
            </div>
            <div className={styles.linkWrapper}>
                <Link href="/planets" className={styles.navigationLink}>Planets</Link>
                <Link href="/discoverers" className={styles.navigationLink}>Discoverers</Link>
                <Link href="/gallery" className={styles.navigationLink}>Gallery</Link>
            </div>
        </div>
    )
}

export default MenuItem
