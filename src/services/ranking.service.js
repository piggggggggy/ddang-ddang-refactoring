import api from "../modules/api";

const getRanking = async (si, gu, dong) => {
    return await api.get(`/api/ranks?si=${si}&gu=${gu}&dong=${dong}`);
};

const RankingService = {
    getRanking,
};
export default RankingService;
