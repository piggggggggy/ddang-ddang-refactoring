import api from "../modules/api";

export async function getQuestList(lat, lng) {
    try{
    const url = `/api/quests?lat=${lat.toFixed(6)}&lng=${lng.toFixed(6)}`;
    const { data } = await api.get(url);
    return data;

    } catch(err){
        console.log(err.message)
    }
}
