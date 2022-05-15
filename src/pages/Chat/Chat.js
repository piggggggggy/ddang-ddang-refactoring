import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import io from "socket.io-client";

import { Grid } from "../../elements/index";

import "./Chat.css";

let socket;

export default function Chat() {
    const [message, setMessage] = React.useState("");
    const [chatRoomLst, setChatRoomLst] = React.useState([]);
    const [chatHistory, setChatHistory] = React.useState([]);
    const socketUrl = "http://localhost:8080";

    let userId = 1;
    let nickname = "asdf";
    let roomId = "asfd";
    let roomName = "sdfad";

    React.useEffect(() => {
        const search = window.location.search;
        socket = io(socketUrl, {
            cors: {
                origin: socketUrl,
                credentials: true,
            },
        });

        socket.emit(
            "enterRoom",
            { userId, nickname, roomId, roomName },
            (response) => {
                console.log("response", response);
                setChatHistory([...response.messages]);
            }
        );

        // socket.on('getMessage', (data) => {
        //   console.log(data)

        // })

        return () => {
            // User leaves room
            // socket.emit('exitRoom', { userId, nickname, roomId, roomName }, () => {})
            socket.disconnect();
            socket.off();
        };
    }, [socketUrl, window.location.search]);

    React.useEffect(() => {
        socket.on("getMessage", (msg) => {
            setChatHistory((prevMsg) => [...prevMsg, msg]);
            setTimeout(() => {
                var div = document.getElementById("chat_body");
                div.scrollTop = div.scrollHeight - div.clientWidth;
            }, 10);
        });
    }, []);

    const sendMessage = (e) => {
        // e.preventDefault();

        socket.emit(
            "sendMessage",
            { userId, nickname, roomId, roomName, message },
            () => setMessage("")
        );
        setMessage("");
        setTimeout(() => {
            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight;
        }, 100);
    };

    const onEnterInput = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <>
            <Grid direction="column">
                <h3>니땅내땅</h3>
                <div className="inbox_msg">
                    <div className="inbox_people">
                        <div className="headind_srch">
                            <div className="recent_heading">
                                <h4>Chat Room</h4>
                            </div>
                        </div>
                        <div className="inbox_chat chatRoomList">
                            {chatRoomLst.map((chatRoom) => {
                                return <div>{chatRoom} 마을 채팅방</div>;
                            })}
                        </div>
                    </div>
                    <div className="mesgs">
                        <div className="msg_history chat" id="chat_body">
                            {chatHistory.map((chat) => {
                                return (
                                    <div style={{ display: "flex" }}>
                                        {Number(chat.userId) ===
                                        Number(userId) ? (
                                            <div
                                                style={{
                                                    color: "red",
                                                    border: "solid",
                                                    width: "fit-content",
                                                    marginLeft: "auto",
                                                }}
                                            >
                                                {chat.message}
                                                <div>{chat.nickname}</div>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    color: "blue",
                                                    border: "solid",
                                                    width: "fit-content",
                                                }}
                                            >
                                                {chat.message}
                                                <div>{chat.nickname}</div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="type_msg">
                            <div className="input_msg_write">
                                <input
                                    type="text"
                                    className="write_msg"
                                    placeholder="Type a message"
                                    value={message}
                                    onChange={(event) => {
                                        setMessage(event.target.value);
                                    }}
                                    onKeyPress={onEnterInput}
                                />
                                <button
                                    onClick={sendMessage}
                                    className="msg_send_btn sendMessage"
                                    type="button"
                                >
                                    <i
                                        className="fa fa-paper-plane-o"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    );
}
