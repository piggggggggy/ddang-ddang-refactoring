import api from "../modules/api";

const feedsLatestAxios = async (si, gu, dong, lat, lng) => {
    return await api.get(
        `api/feeds?type=latest&regionSi=${si}&regionGu=${gu}&regionDong=${dong}&lat=${lat}&lng=${lng}`
    );
};
const feedsPopularityAxios = async (si, gu, dong, lat, lng) => {
    return await api.get(
        `api/feeds?type=popularity&regionSi=${si}&regionGu=${gu}&regionDong=${dong}&lat=${lat}&lng=${lng}`
    );
};
const feedsDistanceAxios = async (si, gu, dong, lat, lng) => {
    console.log(si, gu, dong, lat, lng);
    return await api.get(
        `api/feeds?type=distance&regionSi=${si}&regionGu=${gu}&regionDong=${dong}&lat=${lat}&lng=${lng}`
    );
};
const FeedsService = {
    feedsLatestAxios,
    feedsPopularityAxios,
    feedsDistanceAxios,
};
export default FeedsService;
