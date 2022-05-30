import api from "../modules/api";

export async function postQuest({ request, questId, type }) {
    try {
        const url = `/api/quests/${questId}`;
        const { data } = await api.post(url, { ...request });
        return data;
    } catch (err) {
        console.log(err);
    }
}

// export async function postFeed({ text, image }) {
//     try {
//         const url = '"/api/feeds"';
//         const { data } = await api.post(url, {
//             image: [image],
//             content: text,
//         });
//         return data;
//     } catch (err) {
//         console.log(err);
//     }
// }
