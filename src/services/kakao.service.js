import axios from "axios";

//시구동을 반환 한다.
const getAddress = async (location) => {
    try {
        const { lat, lng } = location.location;

        console.log(location);
        if (typeof lat == "undefined" || typeof lng == "undefined") {
            console.log("좌표값이 없습니다.");
            return {};
        }

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

        if (
            typeof data.si == "undefined" &&
            typeof data.gu == "undefined" &&
            typeof data.dong == "undefined"
        ) {
            //이상한 주소반환

            const tempLocation = {
                lat: 37.5172363,
                lng: 127.0473248,
            };

            const juso = {
                si: "서울",
                gu: "강남구",
                dong: "역삼동",
            };

            return juso;
        } else {
            // 정상적인 주소 반환
            return data;
        }
    } catch (err) {
        console.log(err);
    }
};

const KakaoService = {
    getAddress,
};

export default KakaoService;
