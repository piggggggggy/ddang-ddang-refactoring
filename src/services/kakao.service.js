import axios from "axios";
import env from "react-dotenv";

const getAddress = async (lng, lat) => {
    return await axios.get(
        `${process.REACT_APP_KAKAO_BASE_URL}/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
        {
            headers: {
                Accept: "*/*",
                Authorization: `KakaoAK ${process.REACT_APP_KAKAO_API_KEY}`,
            },
        }
    );
};

const KakaoService = {
    getAddress,
};

export default KakaoService;
