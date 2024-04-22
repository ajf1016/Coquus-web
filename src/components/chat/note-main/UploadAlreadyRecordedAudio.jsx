"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./new-note.module.css";
import axios from "axios";
import { redirect } from "next/navigation";

export default function UploadAlreadyRecordedAudio() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("audio_file", file);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/v1/notes/upload-audio/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("File uploaded successfully:", response.data);
            redirect("/note?pt=notes&id=" + response.data.data.id);

            // handle success
        } catch (error) {
            console.error("Error uploading file:", error);
            // handle error
        }
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
                    <h3 className={styles.text}>
                        Upload file from your device
                    </h3>
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
