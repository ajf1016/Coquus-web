"use client";
import React from "react";
import Navbar from "./navbar/Navbar";
import ChatAside from "./note-aside/NoteAside";
import ChatMain from "./note-main/NoteMain";
import { useSearchParams } from "next/navigation";

export default function Chat() {
    const searchParams = useSearchParams();
    const pt = searchParams.get("pt");
    const id = searchParams.get("id");

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
                <ChatMain pt={pt} id={id} />
            </div>
        </div>
    );
}
