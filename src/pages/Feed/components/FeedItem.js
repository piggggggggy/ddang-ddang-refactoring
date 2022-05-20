import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Text, Input, Button } from "../elements/index";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";

export default function FeedItem(props) {
    const { item, onClick, page, id } = props;
    console.log(props.page);
    console.log(page);
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

    console.log(item);

    // 피드 디테일
    const [detailOpen, setDetailOpen] = React.useState(false);
    const detailHandler = () => {
        setDetailOpen(!detailOpen);
    };

    // 디테일 이미지
    const imagesArr = [];
    imagesArr.push(item?.image1_url, item?.image2_url, item?.image3_url);
    // console.log(imagesArr);

    // 댓글
    const commentArr = item?.comments;
    // console.log(commentArr);

    const [commentIsOpen, setCommentIsOpen] = React.useState(false);

    const commentHandler = () => {
        setCommentIsOpen(!commentIsOpen);
    };

    return (
        <Feed onClick={onClick}>
            <Grid
                flex
                direction="row"
                mystyles="min-height: 78px; padding: 15px 15px 0 15px; overflow-wrap: break-word;"
            >
                <Grid mystyles="width: 1000px; overflow-wrap: break-word;">
                    <Text mystyles="font-weight: 700; font-size: 16px; color: #A3D4FB;letter-spacing: -0.05em;">
                        Title
                    </Text>
                    <Text mystyles="font-weight: 400; font-size: 12px; letter-spacing: -0.05em;">
                        {item.content}
                    </Text>
                </Grid>
                <Grid flex alignItems="center" justifyContent="center">
                    <Grid mystyles="height: 35px; width: 34px; border: 2px solid red; padding: 10px"></Grid>
                </Grid>
            </Grid>
            <Grid
                flex
                justifyContent="center"
                alignItems="center"
                mystyles="height: 15px; width: 50px; margin: auto; padding-right: 20px"
                onClick={detailHandler}
            >
                <Text pointer mystyles="font-weight: 800">
                    ...
                </Text>
            </Grid>
            <AnimatePresence>
                {detailOpen && (
                    <Grid
                        flex
                        justifyContent="center"
                        alignItems="center"
                        initial={{ y: -250, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        mystyles="height: 100px"
                    >
                        {imagesArr.map((image, idx) => (
                            <Grid
                                flex
                                justifyContent="center"
                                alignItems="center"
                                key={idx}
                                mystyles="height: 100%; background-color: grey; border-right: 1px solid black; margin: 2px;"
                            >
                                image: {image}
                            </Grid>
                        ))}
                    </Grid>
                )}
            </AnimatePresence>
            <Grid mystyles="height: 26px;">
                <Grid
                    flex
                    justifyContent="center"
                    alignItems="center"
                    mystyles="width: 100px; height: 100%; margin-left: 14px;"
                >
                    <IconButton
                        color={likedByMe === true ? "error" : "primary"}
                        aria-label="like"
                        onClick={likeHandler}
                    >
                        <FavoriteIcon sx={{ height: "14px" }} />
                    </IconButton>
                    <Text mystyles="display:inline; font-size: 12px; font-weight: 600; margin-left: -10px; color: #A3D4FB;">
                        {counter}
                    </Text>
                    <IconButton onClick={commentHandler} color={"primary"}>
                        <MessageIcon sx={{ height: "14px" }} />
                    </IconButton>
                    <Text mystyles="display:inline; font-size: 12px; margin-left: -10px; color: #A3D4FB; font-weight: 600;">
                        {item?.commentCnt}
                    </Text>
                </Grid>
            </Grid>
            <AnimatePresence>
                {commentIsOpen && (
                    <>
                        {commentArr.map((comment, idx) => (
                            <Grid
                                flex
                                justifyContent="space-between"
                                alignItems="center"
                                mystyles="box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.05);padding: 10px;"
                            >
                                <Text mystyles="font-size: 12px;">
                                    {comment.comment}
                                </Text>
                                <Text mystyles="font-size: 12px;">
                                    {comment.updatedAt !== ""
                                        ? comment.updatedAt
                                        : comment.createdAt}
                                </Text>
                            </Grid>
                        ))}
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Input
                                mystyles="width: 220px; height: 30px; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05); border:none; border-radius:20px;"
                                placeholder="댓글을 써주세요"
                            />
                            <IconButton>
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </>
                )}
            </AnimatePresence>
        </Feed>
    );
}

const Feed = styled(motion.li)`
    ${(props) => (props.page === 0 ? "border-left: 30px solid #a3d4fb;" : "")};
    ${(props) => (props.page === 1 ? "border-left: 30px solid #a3d4fb;" : "")};
    ${(props) => (props.page === 2 ? "border-left: 30px solid #a3d4fb;" : "")};
    min-height: 106px;
    margin-top: 18px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05);
    margin-left: -40px;
`;
