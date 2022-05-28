import api from "../modules/api";

export async function getQuestList(location) {
    try {
        const { lng, lat } = location

        console.log(location)

        const url = `/api/quests?lat=${parseFloat(lat).toFixed(6)}&lng=${parseFloat(lng).toFixed(6)}`;
        const { data } = await api.get(url);
        console.log(data)
        return data;
    } catch (err) {
        console.log(err.message);
    }
}
