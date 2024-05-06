"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./new-note.module.css";
import { noteConfig } from "../../../../apiConfig";

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
                    setNote(data);
                }
                uploadingStatus();
                redirect("/note?pt=notes&id=" + note.id);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally((err) => {
                // setLoading(false);
            });
    };

    const uploadingStatus = async () => {
        try {
            const response = await fetch(
                "http://192.168.246.165:80/uploading",
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Handle success, if needed
            console.log("Recording started successfully");
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        }
    };
    const uploadedStatus = async () => {
        try {
            const response = await fetch("http://192.168.246.165:80/uploaded", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Handle success, if needed
            console.log("Recording uploaded successfully");
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        } finally {
            window.location.href = "/note?pt=notes&id=" + data?.data?.id;
            console.log(data.data.id);
        }
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
