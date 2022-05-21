import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Helmet from "react-helmet";
import "./styles.css";
import { useParams } from "react-router-dom";

let socket;
const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [chatRoomLst, setChatRoomLst] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const params = useParams();
    const socketUrl = "http://diasm.mooo.com:3002";

    const { userId, nickname, roomName } = params;

    useEffect(() => {
        const search = window.location.search;
        socket = io(socketUrl, {
            cors: {
                origin: socketUrl,
                credentials: true,
            },
        });

        socket.emit("enterRoom", { userId, nickname, roomName }, (response) => {
            console.log("response", response);
            // setChatHistory([ ...response.messages ])
        });

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

    useEffect(() => {
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
            { userId, nickname, roomName, message },
            (response) => {
                console.log(response);
                alert(response.error);
            }
        );
        setMessage("");
        setTimeout(() => {
            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight;
        }, 100);
    };

    const exitRoom = () => {
        socket.emit("exitRoom", { roomName }, () => {
            console.log("됐나??");
        });
    };

    const onEnterInput = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    window.addEventListener("beforeunload", (event) => {
        // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
        event.preventDefault();
        exitRoom();
    });

    return (
        <div>
            <Helmet>
                <link
                    href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                    rel="stylesheet"
                    id="bootstrap-css"
                />
                <link href="/style.css" type="text/css" rel="stylesheet" />
                {/* <script
            src="https://cdn.socket.io/3.1.3/socket.io.min.js"
            integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh"
            crossorigin="anonymous"
        ></script> */}
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            </Helmet>
            <div className="container">
                <h3 className="text-center">니땅내땅</h3>
                <div className="messaging">
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
                                                    {/* <div>
                              {chat.nickname}
                            </div> */}
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
                                                    {/* <div>
                              {chat.nickname}
                            </div> */}
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
                                    <button
                                        onClick={exitRoom}
                                        className="exit_btn exitRoom"
                                        type="button"
                                    >
                                        <i
                                            className="fa fa-paper-plane-o"
                                            aria-hidden="true"
                                        >
                                            {" "}
                                            나가기
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
