import React, { useState } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
    const [userId, setUserId] = useState(0);
    const [nickname, setNickname] = useState("");
    const [roomName, setRoomName] = useState("");

    return (
        <div>
            <form>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1>userId</h1>
                    <input
                        name="userId"
                        onChange={(event) => {
                            setUserId(event.target.value);
                        }}
                        placeholder="userId"
                    />
                    <h1>nickname</h1>
                    <input
                        name="nickname"
                        onChange={(event) => {
                            setNickname(event.target.value);
                        }}
                        placeholder="nickname"
                    />
                    <h1>roomId</h1>
                    <input
                        name="roomName"
                        onChange={(event) => {
                            setRoomName(event.target.value);
                        }}
                        placeholder="roomName"
                    />
                    <p></p>
                    <Link to={`/chat/${userId}/${nickname}/${roomName}`}>
                        마을채팅방 입장!
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LandingPage;
