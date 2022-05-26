import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Helmet from "react-helmet";
import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { motion } from "framer-motion";
import { Grid, Input, Text, Button } from "./elements/index";
import Navigation from "../../components/Navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import env from "react-dotenv";

import sendIcon from "../../assets/images/png/chat/send.png";

let socket;
const ChatPage = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(""); // input 값을 없애준다
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
            setChatHistory([...chatHistory, ...response.messages]);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [socketUrl, window.location.search]);

    useEffect(() => {
        socket.on("getMessage", (msg) => {
            console.log(msg);
            setChatHistory((prevMsg) => [...prevMsg, msg]);
            setTimeout(() => {
                var div = document.getElementById("chat_body");
                div.scrollTop = div.scrollHeight - div.clientWidth;
            }, 10);
        });
    }, []);

    console.log("asdf");

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
        navigate("/");
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

    // 좌표 찾기
    const [currentMapPosition, setCurrentMapPosition] = React.useState({});
    console.log(currentMapPosition);
    const getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            setCurrentMapPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            getmyAddress(position.coords.latitude, position.coords.longitude);
        });
    };

    const [address, setAddress] = React.useState({});
    console.log(address);

    // 카카오 api 로 시, 구, 동 정보 받기
    const getmyAddress = (lat, lng) => {
        axios
            .get(
                `${env.MAP_KAKAO_BASE_URL}/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
                {
                    headers: {
                        Accept: "*/*",
                        Authorization: `KakaoAK ${env.MAP_KAKAO_API_KEY}`,
                    },
                }
            )
            .then((res) => {
                const data = {
                    si: res?.data?.documents?.[0]?.address?.region_1depth_name,
                    gu: res?.data?.documents?.[0]?.address?.region_2depth_name,
                    dong: res?.data?.documents?.[0]?.address
                        ?.region_3depth_name,
                };

                setAddress(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        getPosition();
    }, []);

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
                mystyles="margin-top: 68px; position: relative"
            >
                <Grid mystyles="position: absolute; margin-top:-15px;">
                    <IconButton onClick={exitRoom}>
                        <ChevronLeftIcon
                            sx={{ height: "40px", width: "30px" }}
                        />
                    </IconButton>
                </Grid>
                <Text mystyles="font-weight: 700; font-size: 20px; letter-spacing: -0.05em;">
                    {address.si} {address.gu} {address.dong}
                </Text>
            </Grid>
            <Grid mystyles="position: relative; margin-top: 40px;">
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="height: 42px; text-align: center; border-radius: 25px; z-index: 10; top: -5px; position: absolute;"
                >
                    <Text mystyles="font-weight: 400; font-size: 15px; border-radius: 25px; background: white; height: 42px; width: 70px;">
                        Today
                    </Text>
                </Grid>
                <div className="inbox_msg">
                    <div className="mesgs">
                        <div className="msg_history chat" id="chat_body">
                            {chatHistory.map((chat) => {
                                return (
                                    <div style={{ display: "flex" }}>
                                        {Number(chat.userId) ===
                                        Number(userId) ? (
                                            <motion.div
                                                initial={{ x: 250, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                style={{
                                                    color: "white",
                                                    backgroundColor:
                                                        "rgba(59, 224, 107, 1)",
                                                    borderTopRightRadius:
                                                        "25px",
                                                    borderTopLeftRadius: "30px",
                                                    borderBottomLeftRadius:
                                                        "30px",
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
                                                initial={{
                                                    x: -250,
                                                    opacity: 0,
                                                }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                style={{
                                                    color: "blue",
                                                    backgroundColor:
                                                        "rgba(243, 243, 243, 1)",
                                                    borderTopRightRadius:
                                                        "25px",
                                                    borderTopLeftRadius: "30px",
                                                    borderBottomRightRadius:
                                                        "30px",
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
                    </div>
                    <div className="type_msg">
                        <div className="input_msg_write">
                            <input
                                type="text"
                                placeholder="Type a message"
                                value={message}
                                onChange={(event) => {
                                    setMessage(event.target.value);
                                }}
                                onKeyPress={onEnterInput}
                                style={{ background: "#F3F3F3" }}
                            />
                            <button
                                onClick={sendMessage}
                                className="msg_send_btn sendMessage"
                                type="button"
                            >
                                <img
                                    src={sendIcon}
                                    alt=""
                                    style={{ height: "20px" }}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </Grid>
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
