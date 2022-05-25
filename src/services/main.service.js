import api from "../modules/api";

export async function getQuestList(lat, lng) {
    //http://localhost:8080/api/quests?lat=37.498095&lng=127.027610
    const url = `/api/quests?lat=${lat.toFixed(6)}&lng=${lng.toFixed(6)}`;
    const { data } = await api.get(url);
    return data;
}
