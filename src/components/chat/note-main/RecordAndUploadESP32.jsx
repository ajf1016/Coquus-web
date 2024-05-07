"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./new-note.module.css";
import { noteConfig, serverConfig } from "../../../../apiConfig";
import { updateEsp32Status } from "@/utils/helper";

export default function RecordAndUploadESP32() {
    const [note, setNote] = useState([]);
    const [statusText, setStatusText] = useState("...");
    const startRecording = () => {
        serverConfig
            .post("start-recording")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const convertAudioToText = () => {
        updateEsp32Status("Generating note..");
        setStatusText("Generating note..");
        noteConfig
            .get("convert-audio-to-text-and-summarize/" + 112)
            .then((res) => {
                console.log(res);
                const { status_code, data } = res.data;
                if (status_code === 6000) {
                    setNote(data);
                    console.log("done generating");
                    updateEsp32Status("Note Genereated...");
                    setStatusText("Note Genereated...");

                    if (note?.id) {
                        updateEsp32Status("Note: " + note?.summary);
                        window.location.href = "/note?pt=notes&id=" + note?.id;
                    }
                } else {
                    updateEsp32Status("Somthing went wrong");
                    setStatusText("Somthing went wrong");
                }
                console.log(note);
                console.log(data);
            })
            .catch((err) => {
                updateEsp32Status("Failed...");
                setStatusText("Error: " + err);
                console.log(err);
            })
            .finally((err) => {});
    };

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div
                    className={styles.box}
                    style={{
                        width: "49%",
                        position: "relative",
                    }}
                    onClick={startRecording}
                >
                    <div className={styles.icon}>
                        <Image
                            width={10}
                            height={10}
                            alt="Image"
                            className={styles.image}
                            src={"icons/rec.svg"}
                        />
                    </div>
                    <h3 className={styles.text}>Start Recording</h3>
                    <h3 className={styles.description}>Recording from ESP32</h3>
                </div>
                <div
                    className={styles.box}
                    style={{
                        width: "49%",
                    }}
                    onClick={convertAudioToText}
                >
                    <div className={styles.icon}>
                        <Image
                            width={10}
                            height={10}
                            alt="Image"
                            className={styles.image}
                            src={"icons/upload.svg"}
                        />
                    </div>
                    <h3 className={styles.text}>Convert into note</h3>
                    <h3 className={styles.description}>{statusText}</h3>
                </div>
            </div>
        </div>
    );
}
