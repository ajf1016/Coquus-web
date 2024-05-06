"use client";
import React, { useEffect } from "react";
import styles from "./landing-page.module.css";
import Link from "next/link";

export default function LandingPage() {
    localStorage.setItem("is_connected", "false");
    const connectToDevice = async () => {
        try {
            const response = await fetch("http://192.168.246.165:80/connect", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            console.log("Device Connected");
            localStorage.setItem("is_connected", "true");
        } catch (error) {
            console.error("There was a problem with Connection:", error);
        }
    };
    useEffect(() => connectToDevice, []);
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <h3 className={styles.logo}>Coquus.</h3>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, dicta.
                </p>
                <Link href="/note" className={styles.button}>
                    Get Started
                </Link>
            </div>
        </div>
    );
}
