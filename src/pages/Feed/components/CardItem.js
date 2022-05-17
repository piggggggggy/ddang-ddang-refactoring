import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Grid } from "../elements/index";
import { Text } from "../elements/index";
import Content from "./CardContent";
import { IconButton } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Item(props) {
    const { item, onClick, page, id } = props;
    console.log(item?.comments);
    const list = item?.comments;
    console.log(list);
    console.log(id);

    // show feedDetail
    const [detailOpen, setDetailOpen] = React.useState(false);
    const detailHandler = () => {
        if (detailOpen === true) {
            setDetailOpen(false);
        } else {
            setDetailOpen(true);
        }
    };

    // 좋아요
    const [counter, setCounter] = React.useState(item?.likeCnt);

    const [likedByMe, setLikedByMe] = React.useState(false);

    const likeHandler = () => {
        if (likedByMe === true) {
            setLikedByMe(false);
            console.log("hello");
            setCounter(counter - 1);
        } else {
            setLikedByMe(true);
            console.log("hello");
            setCounter(counter + 1);
        }
    };

    // 댓글
    const [comment, setComment] = React.useState("");
    const changeCommentHandler = (e) => {
        setComment(e.target.value);
    };

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            {page === "1" && (
                <div onClick={onClick}>
                    <List
                        style={{
                            borderLeft: "20px solid rgba(243,172,156,0.9)",
                        }}
                        layout
                        initial={{ borderRadius: 10 }}
                    >
                        <Grid justifyContent="space-between">
                            <ProfilePicture layout />
                            <ListHeader layout>
                                <Text mystyles="margin:0; font-weight:bolder; color: rgba(163,212, 251, 1); ">
                                    {item?.content}
                                </Text>
                            </ListHeader>
                            <motion.div layout>
                                <IconButton
                                    onClick={detailHandler}
                                    aria-label="like"
                                >
                                    <ArticleIcon
                                        color="primary"
                                        sx={{ height: "20px" }}
                                    />
                                </IconButton>
                            </motion.div>
                        </Grid>
                        <AnimatePresence>
                            {detailOpen && (
                                <Grid>
                                    <h1>Feed Details...</h1>
                                </Grid>
                            )}
                        </AnimatePresence>
                        <HeaderBottom>
                            <IconWrapper layout>
                                <IconButton
                                    onClick={likeHandler}
                                    color={
                                        likedByMe === true ? "error" : "primary"
                                    }
                                    aria-label="like"
                                >
                                    <FavoriteIcon sx={{ fontSize: "15px" }} />
                                </IconButton>
                                <span style={{ fontSize: "12px" }}>
                                    {counter}
                                </span>
                            </IconWrapper>
                            <IconWrapper layout>
                                <IconButton
                                    onClick={toggleOpen}
                                    color={"primary"}
                                    aria-label="like"
                                >
                                    <MessageIcon sx={{ fontSize: "15px" }} />
                                </IconButton>
                                <span style={{ fontSize: "12px" }}>
                                    {item?.commentCnt}
                                </span>
                            </IconWrapper>
                        </HeaderBottom>
                        <AnimatePresence>
                            {isOpen && <Content list={list} />}
                            <motion.div>
                                <TextField
                                    onChange={changeCommentHandler}
                                    value={comment}
                                    fullWidth
                                    label="댓글"
                                    id="comment"
                                />
                                <Button
                                    style={{ height: "30px" }}
                                    variant="contained"
                                >
                                    <b>작성</b>
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </List>
                </div>
            )}
            {page === "2" && (
                <div onClick={onClick}>
                    <List
                        style={{
                            borderLeft: "20px solid rgba(237,234,80,0.9)",
                        }}
                        layout
                        initial={{ borderRadius: 10 }}
                    >
                        <Grid justifyContent="space-between">
                            <ProfilePicture layout />
                            <ListHeader layout>
                                <Text mystyles="margin:0; font-weight:bolder; color: rgba(163,212, 251, 1) ">
                                    {item?.quest?.title}
                                </Text>
                                <Text mystyles="margin:0; font-size: 15px; font-weight: bolder">
                                    리뷰가 별로 없는데 쉬운것 같기도 하고...
                                </Text>
                            </ListHeader>
                            <motion.div layout>
                                <ArticleIcon
                                    color="primary"
                                    sx={{ height: "20px" }}
                                    onClick={toggleOpen}
                                />
                            </motion.div>
                        </Grid>
                        <HeaderBottom>
                            <IconWrapper layout>
                                <FavoriteIcon sx={{ fontSize: "15px" }} />
                                <span style={{ fontSize: "12px" }}>30</span>
                            </IconWrapper>
                            <IconWrapper layout>
                                <MessageIcon
                                    sx={{ fontSize: "15px" }}
                                    onClick={toggleOpen}
                                />
                                <span style={{ fontSize: "12px" }}>26</span>
                            </IconWrapper>
                        </HeaderBottom>
                        <AnimatePresence>
                            {isOpen && <Content list={list} />}
                        </AnimatePresence>
                    </List>
                </div>
            )}
            {page === "3" && (
                <div onClick={onClick}>
                    <List
                        style={{
                            borderLeft: "20px solid rgba(163, 212, 251, 0.8)",
                        }}
                        layout
                        initial={{ borderRadius: 10 }}
                    >
                        <Grid justifyContent="space-between">
                            <ProfilePicture layout />
                            <ListHeader layout>
                                <Text mystyles="margin:0; font-weight:bolder; color: rgba(163,212, 251, 1) ">
                                    {item?.quest?.title}
                                </Text>
                                <Text mystyles="margin:0; font-size: 15px; font-weight: bolder">
                                    리뷰가 별로 없는데 쉬운것 같기도 하고...
                                </Text>
                            </ListHeader>
                            <motion.div layout>
                                <ArticleIcon
                                    color="primary"
                                    sx={{ height: "20px" }}
                                />
                            </motion.div>
                        </Grid>
                        <HeaderBottom>
                            <IconWrapper layout>
                                <FavoriteIcon sx={{ fontSize: "15px" }} />
                                <span style={{ fontSize: "12px" }}>30</span>
                            </IconWrapper>
                            <IconWrapper layout>
                                <MessageIcon
                                    sx={{ fontSize: "15px" }}
                                    onClick={toggleOpen}
                                />
                                <span style={{ fontSize: "12px" }}>26</span>
                            </IconWrapper>
                        </HeaderBottom>
                        <AnimatePresence>
                            {isOpen && <Content list={list} />}
                        </AnimatePresence>
                    </List>
                </div>
            )}
        </>
    );
}

const HeaderBottom = styled(motion.div)`
    display: flex;
    flex-direction: row;
    width: 200px;
    align-items: center;
    margin-top: 8px;
    margin-left: 200px;
`;

const List = styled(motion.li)`
    border-radius: 10px;
    padding: 20px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0px 2px 2px #888, 0px -2px 2px #888;
`;

const ListHeader = styled(motion.div)`
    overflow-wrap: break-word;
    width: 200px;
    margin-left: 20px;
`;

const ProfilePicture = styled(motion.div)`
    width: 40px;
    height: 40px;
    background-color: #666;
    border-radius: 20px;
`;

const IconWrapper = styled(motion.div)`
    display: flex;
    flex-direction: row;
    z-index: 100;
    margin-left: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
`;
