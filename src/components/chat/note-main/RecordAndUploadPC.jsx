"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./new-note.module.css";
import { noteConfig } from "../../../../apiConfig";
import { updateEsp32Status } from "@/utils/helper";

export default function RecordAndUploadPC() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("audio_file", file);
        noteConfig
            .post("upload-audio/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                const { status_code, data } = res.data;
                console.log("AUDIO", data, status_code);
                if (status_code === 6000) {
                    updateEsp32Status("Audio uploaded from PC");
                    convertAudioToText(data.id);
                } else {
                    updateEsp32Status("Somthing went wrong");
                }
            })
            .catch((err) => {
                updateEsp32Status("Error: " + err);
            });
    };

    const convertAudioToText = (id) => {
        updateEsp32Status("Generating note..");
        noteConfig
            .get("convert-audio-to-text-and-summarize/" + id)
            .then((res) => {
                console.log(res);
                const { status_code, data } = res.data;
                updateEsp32Status("Note Genereated...");
                if (status_code === 6000) {
                    setData(data);
                    updateEsp32Status("Note: " + data?.summary);
                    window.location.href = "/note?pt=notes&id=" + data?.id;
                } else {
                    updateEsp32Status("Somthing went wrong");
                }
            })
            .catch((err) => {
                updateEsp32Status("Failed: " + err);
                console.log(err);
            });
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
                >
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{
                            visibility: "none",
                            // display: "none",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                        }}
                    />
                    <div className={styles.icon}>
                        <Image
                            width={10}
                            height={10}
                            alt="Image"
                            className={styles.image}
                            src={"icons/rec.svg"}
                        />
                    </div>
                    <h3 className={styles.text}>Already uploaded file</h3>
                </div>
                <div
                    className={styles.box}
                    style={{
                        width: "49%",
                    }}
                    onClick={handleUpload}
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
                </div>
            </div>
        </div>
    );
}
