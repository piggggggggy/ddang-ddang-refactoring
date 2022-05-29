import api from "../modules/api";

const getRanking = async (places) => {
    try {
        const { si, gu, dong } = places;

        const result = await api.get(
            `/api/ranks?si=${si}&gu=${gu}&dong=${dong}`
        );
        // setGroup([...group, ...res.data.ranks.group]);
        // setIndividual([...individual, ...res.data.ranks.individual]);
        return result;
    } catch (err) {
        console.log(err);
    }
};

const RankingService = {
    getRanking,
};
export default RankingService;
