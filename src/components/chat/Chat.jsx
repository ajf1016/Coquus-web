import React from "react";
import Navbar from "./navbar/Navbar";
import ChatAside from "./note-aside/NoteAside";
import ChatMain from "./note-main/NoteMain";

export default function Chat() {
    return (
        <div
            className="main"
            style={{
                height: "100vh",
                position: "fixed",
                width: "100%",
            }}
        >
            <Navbar />
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                }}
            >
                <ChatAside />
                <ChatMain />
            </div>
        </div>
    );
}
