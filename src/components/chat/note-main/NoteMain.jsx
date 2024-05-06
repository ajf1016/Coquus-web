"use client";
import React, { useEffect, useState } from "react";
import styles from "./note-main.module.css";
import NewNote from "./NewNote";
import UploadAlreadyRecordedAudio from "./RecordAndUploadPC";
import { noteConfig } from "../../../../apiConfig";
import RecordAndUploadLaptop from "./RecordAndUploadPC";
import RecordAndUploadPC from "./RecordAndUploadPC";
import RecordAndUploadESP32 from "./RecordAndUploadESP32";

export default function NoteMain({ pt, id, type, refresh }) {
    const [note, setNote] = useState([]);
    const [mode, setMode] = useState("summary");
    const [isLoading, setLoading] = useState(true);
    const fetchNotes = () => {
        noteConfig
            .get("get-single-note/" + id + "/")
            .then((res) => {
                console.log(res);
                const { status_code, data } = res.data;
                if (status_code === 6000) {
                    setNote(data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally((err) => {
                setLoading(false);
            });
    };
    useEffect(() => {
        setLoading(true);
        fetchNotes();
    }, [id]);

    const renderMain = () => {
        if (pt === "new" && type === "null") {
            return <NewNote />;
        } else if (pt === "new" && type === "upload-already-recorded-audio") {
            return <UploadAlreadyRecordedAudio />;
        } else if (pt === "new" && type === "record-and-upload-esp32") {
            return <RecordAndUploadESP32 />;
        } else if (pt === "new" && type === "record-and-upload-pc") {
            return <RecordAndUploadPC />;
        } else {
            return isLoading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <h3 className={styles.name}>Loading..</h3>
                </div>
            ) : (
                <div className={styles.main}>
                    <div className={styles.top}>
                        <h3 className={styles.name}>{note.summary}</h3>
                        <div className={styles.modeButtons}>
                            <span
                                onClick={() => setMode("raw")}
                                style={{
                                    backgroundColor:
                                        mode === "raw"
                                            ? "#030637"
                                            : "transparent",
                                    color: mode === "raw" ? "#fff" : "#030637",
                                }}
                            >
                                Raw
                            </span>
                            <span
                                onClick={() => setMode("summary")}
                                style={{
                                    backgroundColor:
                                        mode === "summary"
                                            ? "#030637"
                                            : "transparent",
                                    color:
                                        mode === "summary" ? "#fff" : "#030637",
                                }}
                            >
                                Summary
                            </span>
                        </div>
                    </div>
                    {mode === "raw" ? (
                        <div className={styles.content}>
                            <p className={styles.text}>{note.text}</p>
                        </div>
                    ) : (
                        <div className={styles.content}>
                            <p className={styles.text}>{note.summary}</p>
                        </div>
                    )}
                </div>
            );
        }
    };

    return renderMain();
}
