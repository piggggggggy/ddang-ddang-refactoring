import axios from "axios";

//시구동을 반환 한다.
const getAddress = async (location) => {
    try {
        const { lat, lng } = location.location;
        const res = await axios.get(
            `${process.env.REACT_APP_MAP_KAKAO_BASE_URL}/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
            {
                headers: {
                    Accept: "*/*",
                    Authorization: `KakaoAK ${process.env.REACT_APP_MAP_KAKAO_REST_API_KEY}`,
                },
            }
        );
        const data = {
            si: res?.data?.documents?.[0]?.address?.region_1depth_name,
            gu: res?.data?.documents?.[0]?.address?.region_2depth_name,
            dong: res?.data?.documents?.[0]?.address?.region_3depth_name,
        };
        // console.log(res);

        // console.log(`성공했음 ${data.si} ${data.gu} ${data.dong}`);

        return data;
    } catch (err) {
        console.log(err);
    }
};

const KakaoService = {
    getAddress,
};

export default KakaoService;
