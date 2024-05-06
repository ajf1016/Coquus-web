"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./new-note.module.css";
import { noteConfig } from "../../../../apiConfig";

export default function RecordAndUploadESP32() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
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
        if (!file) return;

        const formData = new FormData();
        formData.append("audio_file", file);

        try {
            uploadingStatus();
            const response = await noteConfig.post("upload-audio/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("File uploaded successfully:", response.data);
            // redirect("/note?pt=notes&id=" + response.data.data.id);
            setData(response.data);
            uploadedStatus();

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
                    {/* <input
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
                    /> */}
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
