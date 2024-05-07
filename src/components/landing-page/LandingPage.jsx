"use client";
import React, { useEffect } from "react";
import styles from "./landing-page.module.css";
import Link from "next/link";
import { updateEsp32Status } from "@/utils/helper";

export default function LandingPage() {
    localStorage.setItem("is_connected", "false");
    const connectToDevice = async () => {
        try {
            updateEsp32Status("connect");

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
                    Transforming speech into actionable insights...
                </p>
                <Link href="/note?pt=new&type=null" className={styles.button}>
                    Get Started
                </Link>
            </div>
        </div>
    );
}
