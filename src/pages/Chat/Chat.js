import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Helmet from "react-helmet";
import "./styles.css";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { motion } from "framer-motion";
import { Grid, Input, Text, Button } from "./elements/index";
import Navigation from "../../components/Navigation";

let socket;
const ChatPage = () => {
    const [message, setMessage] = useState("");
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
        });

        return () => {
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
        event.preventDefault();
        exitRoom();
    });

    return (
        <Container
            initial={{ y: -250, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <Helmet>
                <link
                    href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                    rel="stylesheet"
                    id="bootstrap-css"
                />
                <link href="/style.css" type="text/css" rel="stylesheet" />
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            </Helmet>

            <Grid
                flex
                alignItems="center"
                justifyContent="center"
                mystyles="margin-top: 68px"
            >
                <Text mystyles="font-weight: 700; font-size: 20px;">
                    서울 강남구 삼성동
                </Text>
            </Grid>

            <div className="inbox_msg">
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="height: 42px; width: 96px;position: absolute; top: 0; right: 130px; text-align: center; border-radius: 25px; margin-top: 125px; z-index: 2000; background-color: white;"
                >
                    <Text mystyles="font-weight: 400; font-size: 15px;">
                        Today
                    </Text>
                </Grid>
                <div className="mesgs">
                    <div className="msg_history chat" id="chat_body">
                        {chatHistory.map((chat) => {
                            return (
                                <div style={{ display: "flex" }}>
                                    {Number(chat.userId) === Number(userId) ? (
                                        <motion.div
                                            initial={{ x: 250, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            style={{
                                                color: "white",
                                                backgroundColor:
                                                    "rgba(59, 224, 107, 1)",
                                                borderTopRightRadius: "25px",
                                                borderTopLeftRadius: "30px",
                                                borderBottomLeftRadius: "30px",
                                                width: "230px",
                                                marginLeft: "auto",
                                                height: "91px",
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "20px",
                                                wordBreak: "break-all",
                                                marginTop: "20px",
                                            }}
                                        >
                                            {chat.message}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ x: -250, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            style={{
                                                color: "blue",
                                                backgroundColor:
                                                    "rgba(243, 243, 243, 1)",
                                                borderTopRightRadius: "25px",
                                                borderTopLeftRadius: "30px",
                                                borderBottomRightRadius: "30px",
                                                width: "230px",
                                                height: "91px",
                                                marginTop: "20px",
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "20px",
                                                wordBreak: "break-all",
                                                marginTop: "20px",
                                            }}
                                        >
                                            {chat.message}
                                        </motion.div>
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
                            <Button
                                mystyles="background-color:rgba(92, 235, 132, 1); height: 41px; width: 300px; margin: 20px auto 0 auto;"
                                onClick={exitRoom}
                            >
                                나가기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Navigation />
        </Container>
    );
};

const Container = styled(motion.div)`
    position: relative;
    max-width: 428px;
    width: 100%;
    min-height: 100vh;
    margin: auto;
    box-sizing: border-box;
    background: rgba(88, 224, 126, 1);
    overflow: hidden;
    /* border-radius: 25px; */
`;

export default ChatPage;
