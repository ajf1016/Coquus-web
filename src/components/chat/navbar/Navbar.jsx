import React from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <h1>Coquus.</h1>
                </div>
                <div className={styles.label}>
                    <span>Offline</span>
                </div>
                <div className={styles.profile}>
                    <div className={styles.name}>Ajmal Fayiz</div>
                    <div className={styles.avatar}>
                        <span>A</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
