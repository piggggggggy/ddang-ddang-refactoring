import axios from "axios";
import React from "react";

export default function APITest() {
    // o
    const signin = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/signin", {
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
            .post("http://15.164.213.175:3000/api/players/dupEmail", {
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
            .post("http://15.164.213.175:3000/api/players/dupNickname", {
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
        await axios
            .post("http://15.164.213.175:3000/api/players/signup", {
                email: "adfff@gmail.com",
                nickname: "Paul1996!",
                password: "Paul1996!",
                mbti: "ENFP",
                profileImg:
                    "https://image-uploading-pol.s3.ap-northeast-2.amazonaws.com/5867344.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARWI6Z2AKSPUWWMXF%2F20220520%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220520T143639Z&X-Amz-Expires=900&X-Amz-Signature=fdd50c1bb9edf692ec5d7a477c0284faec46295768c5634a546f4c591bbbcb8f&X-Amz-SignedHeaders=host",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoicGF1bEBnbWFpbC5jb20iLCJuaWNrbmFtZSI6ImNoYW5nZWQgbmlja25hbWUiLCJpYXQiOjE2NTMwNTQ5NTAsImV4cCI6MTY1MzA2MjE1MH0.VsvasoBW-ADp4hFDvGdoFj8gR1N1mAQK6oGRr7a4JyY";

    const signout = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/signout", {
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
            .post("http://15.164.213.175:3000/api/players/auth", {
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
            .post("http://15.164.213.175:3000/api/players/mypage", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const edit = async () => {
        let headersList = {
            Accept: "/",
            // "User-Agent": "Thunder Client (https://www.thunderclient.com/)",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoicGF1bEBnbWFpbC5jb20iLCJuaWNrbmFtZSI6ImNoYW5nZWQgbmlja25hbWUiLCJpYXQiOjE2NTMwNjE2NjEsImV4cCI6MTY1MzA2ODg2MX0.GP9wZtaUsEhbgbNTLTMTJ9RMFUT2tMORAPP1Bj5GGC8",
            "Content-Type": "application/json",
        };

        let bodyContent = {
            profileImg: "wefwefwef",
            nickname: "helloworwefwefwefld",
        };

        let reqOptions = {
            url: "http://15.164.213.175:3000/api/players/edit",
            method: "PATCH",
            headers: headersList,
            body: bodyContent,
        };
        axios.request(reqOptions).then(function (response) {
            console.log(response.data);
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
            .post("http://15.164.213.175:3000/api/ranks", data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const feedsPolpularity = async () => {
        axios
            .post(`http://15.164.213.175:3000/api/feeds?type=popularity`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const feedsLatest = async () => {
        axios
            .post(`http://15.164.213.175:3000/api/feeds?type=latest`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const feedsDistance = async () => {
        axios
            .post(`http://15.164.213.175:3000/api/feeds?type=distance`, data)
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
            .post(`http://15.164.213.175:3000/feeds/${feedId}/comments`, {
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
            .post(`http://15.164.213.175:3000/feeds/${feedId}/like`, {
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
                `http://15.164.213.175:3000/feeds/comments/${feedId}/comments/${commentId}`,
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
            .post(`http://15.164.213.175:3000/feeds/${feedId}`, {
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
            .post(`http://15.164.213.175:3000/feeds/${feedId}`, {
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
                `http://15.164.213.175:3000/feeds/${feedId}/comments/${commentId}`,
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
        edit();
    }, []);

    return <>API Test</>;
}
