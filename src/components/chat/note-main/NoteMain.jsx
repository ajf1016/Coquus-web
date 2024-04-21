"use client";
import React, { useState } from "react";
import styles from "./note-main.module.css";
import NewNote from "./NewNote";

export default function NoteMain() {
    const [mode, setMode] = useState("raw"); // Initial mode is "raw"
    return <NewNote />;
    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <h3 className={styles.name}>Lec 01 Note</h3>
                <div className={styles.modeButtons}>
                    <span
                        onClick={() => setMode("raw")}
                        style={{
                            backgroundColor:
                                mode === "raw" ? "#030637" : "transparent",
                            color: mode === "raw" ? "#fff" : "#030637",
                        }}
                    >
                        Raw
                    </span>
                    <span
                        onClick={() => setMode("summary")}
                        style={{
                            backgroundColor:
                                mode === "summary" ? "#030637" : "transparent",
                            color: mode === "summary" ? "#fff" : "#030637",
                        }}
                    >
                        Summary
                    </span>
                </div>
            </div>
            {mode === "raw" ? (
                <div className={styles.content}>
                    <p className={styles.text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Omnis aperiam ab a fugiat, commodi optio ipsa ut
                        repellendus sunt numquam quasi soluta veritatis,
                        suscipit, assumenda id ratione nihil eveniet mollitia
                        qui! Possimus ullam expedita odit molestias amet
                        voluptatum minus cumque quaerat delectus, ab consectetur
                        explicabo tempora, a hic asperiores. Veritatis.
                    </p>
                </div>
            ) : (
                <div className={styles.content}>
                    <p className={styles.text}>Summary of the note...</p>
                </div>
            )}
        </div>
    );
}
