"use client";
import React, { useEffect, useState } from "react";
import styles from "./note-aside.module.css";
import Link from "next/link";
import axios from "axios";

export default function NoteAside() {
    const [notes, setNote] = useState([]);
    const fetchNotes = () => {
        axios
            .get("http://127.0.0.1:8000/api/v1/notes/get-all-notes/")
            .then((res) => {
                console.log(res);
                const { status_code, data } = res.data;
                if (status_code === 6000) {
                    setNote(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => fetchNotes, []);
    return (
        <div className={styles.main}>
            <Link href={"/note?pt=new&type=null"} className={styles.new_chat}>
                Create New Note
            </Link>
            <div className={styles.chat_items}>
                {notes?.map((note) => (
                    <Link
                        href={`/note?pt=notes&id=${note.id}`}
                        className={styles.chat_item}
                    >
                        <h3 className={styles.name}>{note.summary}</h3>
                        <span className={styles.edit}>Edit</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
