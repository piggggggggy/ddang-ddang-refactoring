import api from "../modules/api";

const getRanking = async (address) => {
    try {
        const { si, gu, dong } = address;
        return await api.get(`/api/ranks?si=${si}&gu=${gu}&dong=${dong}`);
    } catch (err) {
        console.log(err);
    }
};

const RankingService = {
    getRanking,
};
export default RankingService;
