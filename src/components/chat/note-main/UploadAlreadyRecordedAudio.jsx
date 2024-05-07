"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./new-note.module.css";
import { noteConfig } from "../../../../apiConfig";
import { updateEsp32Status } from "@/utils/helper";

export default function UploadAlreadyRecordedAudio({ id }) {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const convertAudioToText = () => {
        noteConfig
            .get("convert-audio-to-text-and-summarize/" + id)
            .then((res) => {
                console.log(res);
                const { status_code, data } = res.data;
                if (status_code === 6000) {
                    setData(data);
                }
                updateEsp32Status("Converting");
                window.location.href = "/note?pt=notes&id=" + data.id;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally((err) => {
                // setLoading(false);
            });
    };

    const handleUpload = async () => {
        convertAudioToText();
    };

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                {/* <div
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
                    <h3 className={styles.text}>Upload file</h3>
                </div> */}
                <div
                    className={styles.box}
                    style={{
                        width: "100%",
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
