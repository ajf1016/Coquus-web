"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import ChatAside from "./note-aside/NoteAside";
import ChatMain from "./note-main/NoteMain";
import { useSearchParams } from "next/navigation";

export default function Chat() {
    const searchParams = useSearchParams();
    const [isOnline, setIsOnline] = useState(false);
    const [refresh, setRefresh] = useState(Math.random());
    const pt = searchParams.get("pt");
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    return (
        <div
            className="main"
            style={{
                height: "100vh",
                position: "fixed",
                width: "100%",
            }}
        >
            <Navbar
                isOnline={isOnline}
                // connectToDevice={connectToDevice}
            />
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                }}
            >
                <ChatAside
                    setRefresh={setRefresh}
                    pt={pt}
                    id={id}
                    type={type}
                    refresh={refresh}
                />
                <ChatMain pt={pt} id={id} type={type} refresh={refresh} />
            </div>
        </div>
    );
}
