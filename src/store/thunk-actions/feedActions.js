import { feedActions } from "../slices/feedSlice";
import axios from "axios";

// 피드 전체 조회
export const getFeedsAxios = (token, region) => {
    return async function (dispatch) {
        await axios
            .get("/api/feeds", {
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    region,
                },
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
