import { feedActions } from "../slices/feedSlice";
import axios from "axios";

// 피드 전체 조회
export const getFeedsAxios = (token, region) => {
    return async function (dispatch) {
        await axios
            .get("/api/feeds", {
                region,
            })
            .then((res) => {
                console.log(res);
                dispatch(feedActions.getFeed({ feeds: res.data.rows }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

// 댓글 작성
export const commentAxios = (token, feedId, comment) => {
    return async function (dispatch) {
        await axios
            .get(`/api/feeds/${feedId}/comments`, {
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    comment,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
