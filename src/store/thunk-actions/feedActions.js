import { feedActions } from "../slices/feedSlice";
import api from "../../modules/api";

// 피드 전체 조회
export const feedsLatestAxios = (region) => {
    return async function (dispatch) {
        await api
            .post("/api/feeds?type=latest", region)
            .then((res) => {
                console.log(res);
                dispatch(feedActions.getFeed({ feeds: res.data.rows }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const feedsPopularityAxios = (region) => {
    return async function (dispatch) {
        await api
            .post("/api/feeds?type=popularity", region)
            .then((res) => {
                console.log(res);
                dispatch(feedActions.getFeed({ feeds: res.data.rows }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const feedsDistanceAxios = (region) => {
    return async function (dispatch) {
        await api
            .post("/api/feeds?type=distance", region)
            .then((res) => {
                console.log(res);
                dispatch(feedActions.getFeed({ feeds: res.data.rows }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const writeCommentsAxios = (comment, token, feedId) => {
    return async function (dispatch) {
        await api
            .post(`/api/feeds/${feedId}/comments`, {
                comment: comment,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
