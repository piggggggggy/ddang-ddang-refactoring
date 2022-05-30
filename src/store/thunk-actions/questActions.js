import { getQuestList } from "../../services/main.service";

export const getQuestListMiddleware = (lat, lng) => {
    return async function (dispatch) {
        const data = await getQuestList(lat, lng);

        return data;
    };
};
