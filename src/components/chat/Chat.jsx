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

    const connectToDevice = async () => {
        try {
            const response = await fetch("http://192.168.246.165:80/connect", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Handle success, if needed
            console.log("Device Connected");
            setIsOnline(true);
        } catch (error) {
            console.error("There was a problem with Connection:", error);
            setIsOnline(false);
        }
    };
    useEffect(() => connectToDevice, []);

    return (
        <div
            className="main"
            style={{
                height: "100vh",
                position: "fixed",
                width: "100%",
            }}
        >
            <Navbar isOnline={isOnline} connectToDevice={connectToDevice} />
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                }}
            >
                <ChatAside setRefresh={setRefresh} />
                <ChatMain pt={pt} id={id} type={type} refresh={refresh} />
            </div>
        </div>
    );
}
