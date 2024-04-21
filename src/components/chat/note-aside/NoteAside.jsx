import React from "react";
import styles from "./note-aside.module.css";

export default function NoteAside() {
    return (
        <div className={styles.main}>
            <span className={styles.new_chat}>Create New Note</span>
            <div className={styles.chat_items}>
                <div className={styles.chat_item}>
                    <h3 className={styles.name}>Lec 01 Note</h3>
                    <span className={styles.edit}>Edit</span>
                </div>
                <div className={styles.chat_item}>
                    <h3 className={styles.name}>Lec 01 Note</h3>
                    <span className={styles.edit}>Edit</span>
                </div>
            </div>
        </div>
    );
}
