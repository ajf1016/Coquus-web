"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./new-note.module.css";
import Link from "next/link";

export default function NewNote() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <Link
                    href={"/note?pt=new&type=record-and-upload-esp32"}
                    className={styles.box}
                    style={{
                        width: "49%",
                    }}
                >
                    <div className={styles.icon}>
                        <Image
                            width={10}
                            height={10}
                            alt="Image"
                            className={styles.image}
                            src={"icons/mic.svg"}
                        />
                    </div>
                    <h3 className={styles.text}>Record and upload(ESP32)</h3>
                    <h3 className={styles.description}>
                        Record Audio use your ESP32 Device
                    </h3>
                </Link>
                <Link
                    href={"/note?pt=new&type=record-and-upload-pc"}
                    className={styles.box}
                    style={{
                        width: "49%",
                    }}
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
                    <h3 className={styles.text}>Record and upload(Laptop)</h3>
                    <h3 className={styles.description}>
                        Record and upload audio use your Laptop
                    </h3>
                </Link>
                <Link
                    href={"/note?pt=new&type=upload-already-recorded-audio"}
                    className={styles.box}
                    style={{
                        width: "100%",
                    }}
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
                    <h3 className={styles.text}>
                        Upload already recorded audio
                    </h3>
                    <h3 className={styles.description}>
                        Record note use your laptop/mobile
                    </h3>
                </Link>
            </div>
        </div>
    );
}
