import React from "react";
import styles from "./landing-page.module.css";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <h3 className={styles.logo}>Coquus.</h3>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, dicta.
                </p>
                <Link href="/auth" className={styles.button}>
                    Get Started
                </Link>
            </div>
        </div>
    );
}
