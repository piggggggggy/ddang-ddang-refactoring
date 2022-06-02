import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Helmet from "react-helmet";
import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";

import styled, { keyframes } from "styled-components";
import { Grid } from "./elements/index";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container } from "../../elements";
import SignupGnb from "../Sign/Signup/elements/SignupGnb";
import BottomInput from "./components/BottomInput";
import ChatBalloon from "./components/ChatBalloon";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

let socket;

export default function ChatPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(""); // input 값을 없애준다
    const [chatHistory, setChatHistory] = useState([]);
    const [memberCnt, setMemberCnt] = useState(0);

    const userData = useSelector((state) => state.user.user);

    const params = useParams();
    const socketUrl = process.env.REACT_APP_CHAT_BASE_URL;
    // const socketUrl = 'http://localhost:8080';

    let { userId, nickname, si, gu, dong } = params;

    const roomName = si + gu + dong;

    const [address, setAddress] = React.useState({});

    useEffect(() => {
        const search = window.location.search;
        socket = io(socketUrl, {
            cors: {
                origin: socketUrl,
                credentials: true,
            },
        });
        if (roomName !== "") {
            socket.emit(
                "enterRoom",
                { userId, nickname, roomName },
                (response) => {
                    setMemberCnt(response.memberCnt);
                    // setChatHistory([...chatHistory, ...response.messages]);
                    setChatHistory([...response.messages]); // 기존 전체 메세지를 가져옴
                    setTimeout(() => {
                        var div = document.getElementById("chat_body");
                        div.scrollTop = div.scrollHeight;
                    }, 100);
                }
            );
        }

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [socketUrl, window.location.search]);

    useEffect(() => {
        socket.on("getMessage", (msg) => {
            setMemberCnt(msg.memberCnt);
            if (msg.id !== socket.id) {
                setChatHistory((prevMsg) => [...prevMsg, msg]);
            }
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
        console.log('aaaaaaa', userId, nickname, roomName)
        socket.emit("exitRoom", { userId, nickname, roomName }, (response) => {
            setMemberCnt(response.memberCnt);
        });
        navigate("/");
    };

    window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        exitRoom();
    });

    window.addEventListener("load", (event) => {
        event.preventDefault();
        exitRoom();
    });


    useEffect(() => {
        const listenBackEvent = () => {
            // 뒤로가기 할 때 수행할 동작을 적는다
            exitRoom();
        };

        const unlistenHistoryEvent = history.listen(({ action }) => {
            if (action === "POP") {
            listenBackEvent();
            }
        });

        return unlistenHistoryEvent;
    }, []);
    


    return (
        <Container
            color={
                "linear-gradient(169.59deg, #58E07E 4.25%, #61F88C 50.84%, #58E07E 99.4%)"
            }
        >
            <SignupGnb
                exit={exitRoom}
                text={
                    <>
                        {si} {gu} {dong}
                        <br />
                        현재 인원 : {memberCnt ? memberCnt : 0}
                    </>
                }
                color={"none"}
            />
            <Paper>
                <Today>Today</Today>
                <ScrollWrapper id="chat_body">
                    {chatHistory.map((chat) => {
                        return (
                            <ChatBalloon
                                time={chat.createdAt}
                                text={chat.message}
                                name={chat.nickname}
                                isMe={Number(chat.userId) === Number(userId)}
                            />
                        );
                    })}
                </ScrollWrapper>
            </Paper>

            <BottomInput
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </Container>
    );
}
const PaperMove = keyframes`
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 0;
  }
`;

const Paper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 85%;
    background: #fff;
    padding-top: 30px;
    border-radius: 50px 50px 0 0;
    animation: ${PaperMove} 500ms ease;
`;

const Today = styled.div`
    position: absolute;
    top: -21px;
    left: calc(50% - 48px);
    width: 96px;
    height: 42px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    & p {
        font-size: 15px;
        line-height: 17px;
        color: #514f4f;
    }
`;

const ScrollWrapper = styled.div`
    width: 100%;
    height: calc(100% - 30px);
    padding: 30px 25px 60px;
    overflow: scroll;
`;
