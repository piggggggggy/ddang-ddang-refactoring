import React from "react";
import api from "../../../modules/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Text, Input, Button } from "../elements/index";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";

import { writeCommentsAxios } from "../../../store/thunk-actions/feedActions";

export default function FeedItem(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const playerEmail = props.item.player.email;
    console.log(playerEmail);

    const { item, onClick, page, id, liked } = props;

    const feedId = item.id;
    console.log(feedId);

    // 좋아요
    const [counter, setCounter] = React.useState(item.likeCnt);

    const [likedByMe, setLikedByMe] = React.useState(liked);

    const likeHandler = () => {
        if (likedByMe === true) {
            setLikedByMe(false);
            setCounter(counter - 1);
            likeFeed();
        } else {
            setLikedByMe(true);
            setCounter(counter + 1);
            likeFeed();
        }
    };

    // 피드 디테일
    const [detailOpen, setDetailOpen] = React.useState(false);
    const detailHandler = () => {
        setDetailOpen(!detailOpen);
    };

    // 디테일 이미지
    const [imagesArr, setImagesArr] = React.useState([
        item.image1_url,
        item.image2_url,
        item.image3_url,
    ]);
    console.log(imagesArr);

    // 댓글
    const [commentArr, setCommentArr] = React.useState(item.comments);
    console.log(commentArr);

    const [commentIsOpen, setCommentIsOpen] = React.useState(false);

    const commentHandler = () => {
        setCommentIsOpen(!commentIsOpen);
    };

    // 댓글 작성

    const [comment, setComment] = React.useState("");

    const commentChange = (e) => {
        setComment(e.target.value);
    };

    const writeComment = () => {
        createComment(comment);
        setComment("");
    };

    const createComment = async (comment) => {
        await api
            .post(`/api/feeds/${feedId}/comments`, { comment })
            .then((res) => {
                console.log(res);

                const dataToAdd = {
                    comment: res.data.comment.comment.comment,
                    createdAt: res.data.comment.comment.createdAt,
                    feedId: feedId,
                    id: res.data.comment.id,
                    player: res.data.comment.player,
                };
                setCommentArr([...commentArr, dataToAdd]);
                // console.log(commentArr);

                // commentArr.push({ comment });
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const likeFeed = async () => {
        api.put(`/api/feeds/${feedId}/like`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteComment = async (commentId) => {
        console.log(feedId, commentId);

        api.delete(`/api/feeds/${feedId}/comments/${commentId}`)
            .then((res) => {
                console.log(res);
                setCommentArr(
                    commentArr.filter((value) => {
                        return value.id != commentId;
                    })
                );
                console.log(commentArr);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(commentArr);

    React.useEffect(() => {
        console.log(commentArr);
    }, [commentArr]);

    return (
        <Feed {...props} onClick={onClick}>
            <Text mystyles="position: absolute; left: -50px; top: 20px;font-weight: 700; font-size: 12px;">
                {item.createdAt.substring(5, 10).replace("-", ".")}
            </Text>
            <Grid
                flex
                alignItems="center"
                justifyContent="center"
                direction="row"
                mystyles="min-height: 78px; padding-left: 14px; overflow-wrap: break-word;"
            >
                <Grid mystyles="width: 1000px; overflow-wrap: break-word;">
                    <Text mystyles="font-weight: 400; font-size: 12px; letter-spacing: -0.05em;">
                        {item.content}
                    </Text>
                </Grid>
            </Grid>
            {(imagesArr[0] !== null ||
                imagesArr[1] !== null ||
                imagesArr[2] !== null) && (
                <Grid
                    flex
                    justifyContent="center"
                    alignItems="center"
                    mystyles="height: 15px; width: 50px; margin: auto; padding-right: 20px"
                    onClick={detailHandler}
                >
                    <Text pointer mystyles="font-weight: 800; font-size: 30px;">
                        ...
                    </Text>
                </Grid>
            )}

            <AnimatePresence>
                {detailOpen && (
                    <>
                        <Grid flex>
                            {imagesArr.map((image, idx) => (
                                <>
                                    <Grid
                                        flex
                                        justifyContent="center"
                                        alignItems="center"
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        mystyles="height: 100px;"
                                    >
                                        <img
                                            src={image !== null ? image : 0}
                                            alt=""
                                            style={
                                                image !== null
                                                    ? {
                                                          width: "70px",
                                                          height: "70px",
                                                      }
                                                    : {}
                                            }
                                        />
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                    </>
                )}
            </AnimatePresence>
            <Grid mystyles="height: 26px;">
                <Grid
                    flex
                    justifyContent="center"
                    alignItems="center"
                    mystyles="width: 70px; height: 100%;"
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
                        {commentArr.length}
                    </Text>
                </Grid>
            </Grid>
            <AnimatePresence>
                {commentIsOpen && (
                    <>
                        {commentArr.map((comment, idx) => (
                            <Grid
                                key={idx}
                                flex
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mystyles="box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.05);padding: 10px;"
                            >
                                <Text mystyles="font-size: 12px;">
                                    {comment.comment}
                                </Text>
                                <Grid
                                    flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mystyles="width: 100px;"
                                >
                                    <Text mystyles="font-weight: 400; font-size: 8px;">
                                        {comment.createdAt.substring(0, 10)}
                                    </Text>
                                    {playerEmail === comment.player.email && (
                                        <Button
                                            mystyles="border: none;background-color: white;"
                                            onClick={() => {
                                                deleteComment(comment.id);
                                            }}
                                        >
                                            x
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Input
                                mystyles="width: 200px; height: 30px; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05); border:none; background: #F4F4F4;"
                                placeholder="댓글을 써주세요"
                                onChange={commentChange}
                            />
                            <Button
                                onClick={writeComment}
                                mystyles="border: none; margin-right: 10px; margin-left: 5px; background: #A3D4FB; font-weight: 400; font-size: 10px; width: 80px; height: 25px; border-radius: 4px;"
                            >
                                전송
                            </Button>
                        </Grid>
                    </>
                )}
            </AnimatePresence>
        </Feed>
    );
}

const Feed = styled(motion.li)`
    ${(props) => (props.page === 0 ? "border-left: 70px solid #F3AC9C" : "")};
    ${(props) => (props.page === 1 ? "border-left: 70px solid #A3D4FB" : "")};
    ${(props) => (props.page === 2 ? "border-left: 70px solid #EDEA50" : "")};
    min-height: 106px;
    margin-top: 18px;
    border-radius: 10px;
    box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);
    margin-left: -40px;
    position: relative;
`;
