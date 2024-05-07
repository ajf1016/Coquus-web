"use client";
import React, { useEffect, useState } from "react";
import styles from "./note-aside.module.css";
import Link from "next/link";
import { noteConfig } from "../../../../apiConfig";
import { updateEsp32Status } from "@/utils/helper";

export default function ChatAside({ setRefresh, pt, id, type, refresh }) {
    const [notes, setNote] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchNotes = () => {
        if (pt === "new" && type === "upload-already-recorded-audio") {
            noteConfig
                .get("get-all-voices/")
                .then((res) => {
                    console.log(res);
                    const { status_code, data } = res.data;
                    if (status_code === 6000) {
                        setNote(data);
                    } else {
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            noteConfig
                .get("get-all-notes/")
                .then((res) => {
                    console.log(res);
                    const { status_code, data } = res.data;
                    if (status_code === 6000) {
                        setNote(data);
                    } else {
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    useEffect(() => {
        fetchNotes(), console.log("CHANGED");
    }, [pt, id, type, refresh]);

    const renderAside = () => {
        if (pt === "new" && type === "upload-already-recorded-audio") {
            return (
                <div className={styles.chat_items}>
                    {notes?.map((note) => (
                        <Link
                            href={`/note?pt=new&type=upload-already-recorded-audio&id=${note.id}`}
                            className={styles.chat_item}
                            onClick={() => setRefresh(Math.random())}
                        >
                            <audio controls>
                                <source
                                    src={note.audio_file}
                                    type="audio/mpeg"
                                />
                                Your browser does not support the audio element.
                            </audio>
                        </Link>
                    ))}
                </div>
            );
        } else {
            return (
                <div className={styles.chat_items}>
                    {notes?.map((note) => (
                        <Link
                            href={`/note?pt=notes&id=${note.id}`}
                            className={styles.chat_item}
                            onClick={() =>
                                setRefresh(
                                    Math.random(),
                                    updateEsp32Status(
                                        "Note: " + note.summary.substring(0, 30)
                                    )
                                )
                            }
                        >
                            <h3 className={styles.name}>{note.summary}</h3>
                            {/* <span className={styles.edit}>Edit</span> */}
                        </Link>
                    ))}
                </div>
            );
        }
    };
    return (
        <div className={styles.main}>
            <Link href={"/note?pt=new&type=null"} className={styles.new_chat}>
                Create New Note
            </Link>
            {isLoading ? (
                <h3 className={styles.edit}>Loading...</h3>
            ) : (
                renderAside()
            )}
        </div>
    );
}
