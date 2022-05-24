import axios from "axios";
import React from "react";

export default function APITest() {
    // o
    const signin = async () => {
        axios
            .post("/api/players/signin", {
                email: "paul@gmail.com",
                password: "Paul1996!",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // o
    const dupEmail = async () => {
        axios
            .post("/api/players/dupEmail", {
                email: "paul@gmail.com",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // o
    const dupNickname = async () => {
        axios
            .post("/api/players/dupNickname", {
                nickname: "asdfas",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // o
    const signup = async () => {
        let headersList = {
            Accept: "/",
            "Content-Type": "application/json",
        };
        await axios
            .post(
                "/api/players/signup",
                {
                    email: "adffsdfsdff@gmail.com",
                    nickname: "Pausdfsdfl1996!",
                    password: "Paul1996!",
                    mbti: "ENFP",
                    profileImg:
                        "https://image-uploading-pol.s3.ap-northeast-2.amazonaws.com/5867344.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARWI6Z2AKSPUWWMXF%2F20220520%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220520T143639Z&X-Amz-Expires=900&X-Amz-Signature=fdd50c1bb9edf692ec5d7a477c0284faec46295768c5634a546f4c591bbbcb8f&X-Amz-SignedHeaders=host",
                },
                headersList
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoicGF1bEBnbWFpbC5jb20iLCJuaWNrbmFtZSI6ImNoYW5nZWQgbmlja25hbWUiLCJpYXQiOjE2NTMwOTg0NTQsImV4cCI6MTY1MzEwNTY1NH0.5MrGAuRUYEi_sC_F_fOXyL6ySkiwWKKRDyb66bphxCM";

    const signout = async () => {
        axios
            .post("/api/players/signout", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const auth = async () => {
        axios
            .post("/api/players/auth", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // update 중
    const mypage = async () => {
        axios
            .get(
                "/api/players/mypage",
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
                data
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const edit = async () => {
        await axios
            .patch(
                "/api/players/edit",
                {
                    body: { nickname: "asfd", profileImg: "Asdf" },
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                console.log(res);
            });
    };

    const data = {
        currentRegion: {
            regionSi: "서울시",
            regionGu: "강남구",
            regionDong: "삼성동",
        },
    };

    // 랭킹 조회 o
    const ranks = async () => {
        axios
            .post("/api/ranks", data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const feedsPolpularity = async () => {
        axios
            .post(`/api/feeds?type=popularity`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const feedsLatest = async () => {
        axios
            .post(`/api/feeds?type=latest`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const feedsDistance = async () => {
        axios
            .post(`/api/feeds?type=distance`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const feedId = 1;
    const createComment = async () => {
        axios
            .post(`/feeds/${feedId}/comments`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const likeFeed = async () => {
        axios
            .post(`/feeds/${feedId}/like`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const commentId = 1;
    const editComment = async () => {
        axios
            .post(
                `/feeds/comments/${feedId}/comments/${commentId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editFeed = async () => {
        axios
            .post(`/feeds/${feedId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deleteFeed = async () => {
        axios
            .post(`/feeds/${feedId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deleteComment = async () => {
        axios
            .post(
                `/feeds/${feedId}/comments/${commentId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        auth();
    }, []);

    return <>API Test</>;
}
