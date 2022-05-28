import api from "../modules/api";

export async function getQuestList(location) {
    try {

        const { lng, lat } = location.location;

        console.log(lng,lat);

        if (typeof lat == "undefined" || typeof lng == "undefined") {
            console.log("좌표값이 없습니다.");
            return {};
        }

        const url = `/api/quests?lat=${parseFloat(lat).toFixed(
            6
        )}&lng=${parseFloat(lng).toFixed(6)}`;
        const { data } = await api.get(url);

        if (data.rows.length > 0) {
            return console.log("데이터가 없습니다.");
        }

        console.log(data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}
