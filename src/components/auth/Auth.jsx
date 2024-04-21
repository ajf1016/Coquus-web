"use client";
import styles from "./auth.module.css";
import React, { useState, useEffect } from "react";
// import WebSocket from "ws";

export default function Auth() {
    const [recording, setRecording] = useState(false);

    const startRecording = async () => {
        try {
            const response = await fetch(
                "http://192.168.246.165:80/start-recording",
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Handle success, if needed
            console.log("Recording started successfully");
            setRecording(true);
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        }
    };

    const stopRecordingAndUpload = async () => {
        try {
            const response = await fetch(
                "http://192.168.246.165:80/stop-recording-and-upload",
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Handle success, if needed
            console.log("Recording started successfully");
            setRecording(false);
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <span
                    className={styles.button}
                    onClick={startRecording}
                    style={{ marginRight: "20px" }}
                >
                    START
                </span>
                <span
                    onClick={stopRecordingAndUpload}
                    className={styles.button}
                >
                    STOP
                </span>
            </div>
        </div>
    );
}
