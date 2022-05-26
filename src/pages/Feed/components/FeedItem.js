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

    const playerEmail = "paul@gmail.com";

    const { item, onClick, page, id } = props;
    const feedId = item.id;

    // 좋아요
    const [counter, setCounter] = React.useState(item?.likeCnt);

    const [likedByMe, setLikedByMe] = React.useState(false);

    const likeHandler = () => {
        if (likedByMe === true) {
            setLikedByMe(false);
            setCounter(counter - 1);
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
    const imagesArr = [];
    imagesArr.push(item?.image1_url, item?.image2_url, item?.image3_url);

    // 댓글
    const [commentArr, setCommentArr] = React.useState([...item?.comments]);
    // const commentArr = item?.comments;

    const [commentIsOpen, setCommentIsOpen] = React.useState(true);

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

    // const createComment = () => {
    //     dispatch(writeCommentsAxios(comment, token, feedId));

    // };

    const createComment = async (comment) => {
        await api
            .post(`/api/feeds/${feedId}/comments`, { comment })
            .then((res) => {
                console.log(res);

                setCommentArr([...commentArr, res.data.comment]);
                console.log(commentArr);

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
        api.delete(`/api/feeds/${feedId}/comments/${commentId}`)
            .then((res) => {
                console.log(res);
                setCommentArr(
                    commentArr.filter((value) => {
                        return value.id != commentId;
                    })
                );
                console.log(commentArr);
                commentArr.pop();
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
                                justifyContent="space-between"
                                alignItems="center"
                                mystyles="box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.05);padding: 10px;"
                            >
                                <Text mystyles="font-size: 12px;">
                                    {comment?.comment}
                                </Text>
                                <Text mystyles="font-size: 12px;">
                                    {comment?.updatedAt !== ""
                                        ? comment?.updatedAt.substring(0, 10)
                                        : comment?.createdAt.substring(0, 10)}
                                </Text>
                                {playerEmail === comment?.player?.email && (
                                    <Button
                                        mystyles="background: #F3AC9C; border-radius: 25px; border: none; box-shadow: 1px 1px 1px 1px #0B325E"
                                        onClick={() => {
                                            deleteComment(comment?.id);
                                        }}
                                    >
                                        x
                                    </Button>
                                )}
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
                                onChange={commentChange}
                            />
                            <IconButton onClick={writeComment}>
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
    ${(props) => (props.page === 0 ? "border-left: 30px solid #F3AC9C" : "")};
    ${(props) => (props.page === 1 ? "border-left: 30px solid #A3D4FB" : "")};
    ${(props) => (props.page === 2 ? "border-left: 30px solid #EDEA50" : "")};
    min-height: 106px;
    margin-top: 18px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05);
    margin-left: -40px;
`;

// const createComment = async (comment) => {
//     await api
//         .post(
//             `/api/feeds/${feedId}/comments`,
//             {
//                 comment: comment,
//             },
//             {
//                 headers: { Authorization: `Bearer ${token}` },
//             }
//         )
//         .then((res) => {
//             console.log(res);
//             commentArr.push(comment);
//             window.location.reload();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
