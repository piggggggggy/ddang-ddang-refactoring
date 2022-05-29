import instance from "../modules/api";

export async function getQuestList(location) {
    try {
        const { lng, lat } = location;

        console.log(lng, lat);

        if (typeof lat == "undefined" || typeof lng == "undefined") {
            console.log("좌표값이 없습니다.");
            return {};
        }

        const url = `/api/quests?lat=${parseFloat(lat).toFixed(
            6
        )}&lng=${parseFloat(lng).toFixed(6)}`;
        const { data } = await instance.get(url);
        return data;
    } catch (err) {
    }
}
