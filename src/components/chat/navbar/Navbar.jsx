"use client";
import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
    let isConnected = localStorage.getItem("is_connected");
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
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <Link href={"/"} className={styles.logo}>
                    <h1>Coquus.</h1>
                </Link>
                <div
                    onClick={connectToDevice}
                    className={styles.label}
                    style={{
                        backgroundColor: isConnected ? "#2ecc71" : "#e74c3c",
                        cursor: "pointer",
                    }}
                >
                    <span
                        style={{
                            color: isConnected ? "#007104" : "#9d0000",
                        }}
                    >
                        {isConnected ? "Online" : "Offline"}
                    </span>
                </div>
                <div className={styles.profile}>
                    {/* <div className={styles.name}>Ajmal Fayiz</div> */}
                    <div className={styles.avatar}>
                        <span>A</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
