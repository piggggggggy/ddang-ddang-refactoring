import { FlashOnOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import KakaoService from "../../../services/kakao.service";
import { getQuestList } from "../../../services/main.service";
import { TEMP_LOCATION } from "../../../shared/Link";
import { questActions } from "../../../store/slices/questSlice";
import { userActions } from "../../../store/slices/userSlice";
const geolocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 2000,
    timeout: 2000,
};
const useMainData = () => {
    const dispatch = useDispatch();
    const cachedLocation = localStorage.getItem("location");

    const [loading, setLoading] = useState(false);
    const [questList, setQuestList] = useState([]);
    const [questType, setQuestType] = useState("all");
    const [location, setLocation] = useState({
        lat:
            cachedLocation === null
                ? TEMP_LOCATION.lat
                : JSON.parse(cachedLocation).latitude,
        lng:
            cachedLocation === null
                ? TEMP_LOCATION.lat
                : JSON.parse(cachedLocation).longitude,
    });
    const [region, setRegion] = useState({
        regionDong: "",
        regionGu: "",
        regionSi: "",
    });

    useEffect(() => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (res) => {
                // 2초안에 받아왔을 경우 localstrorage로 캐싱
                const locationForCache = {
                    latitude: res.coords.latitude,
                    longitude: res.coords.longitude,
                };
                const newLocation = JSON.stringify(locationForCache);
                localStorage.setItem("location", newLocation);

                setLocation({
                    lat: res.coords.latitude,
                    lng: res.coords.longitude,
                });
                // 만약에 사용자의 위치에서 시구동을 못가져오면 현재 가능한지 않는 지역에 있습니다.
                const userdata = await KakaoService.getAddress({
                    location: {
                        lat: res.coords.latitude,
                        lng: res.coords.longitude,
                    },
                });

                // 주소가 아무것도 없다고 나오면 강제로 주소를 정해준다.
                if (
                    typeof userdata.si == "undefined" &&
                    typeof userdata.gu == "undefined" &&
                    typeof userdata.dong == "undefined"
                ) {
                    //이상한 주소
                    const data = await getQuestList(TEMP_LOCATION);
                    const { regionDong, regionGu, regionSi } =
                        data.currentRegion;
                    console.log(data);
                    console.log(regionDong, regionGu, regionSi);

                    if (data.rows.length > 0) {
                        setQuestList(data.rows);
                        dispatch(
                            questActions.setQuest({
                                list: data.rows,
                                region: data.currentRegion,
                            })
                        );
                    }
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);

                    setRegion(data.currentRegion);

                    return alert(
                        "현재 가능한 지역이 아닙니다. 가상환경에서 시작합니다."
                    );
                } else {
                    //  퀘스트를 가져온다
                    const data = await getQuestList({
                        lat: res.coords.latitude,
                        lng: res.coords.longitude,
                    });
                    console.log(data);
                    if (data.rows.length > 0) {
                        setQuestList(data.rows);
                        dispatch(
                            questActions.setQuest({
                                list: data.rows,
                                region: data.currentRegion,
                            })
                        );
                    }
                    setRegion(data.currentRegion);
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                }
            },
            async (err) => {
                console.log("main geolocation 오류 : ", err);
                // 2초안에 못받아오거나 실패했을 경우 기존 캐싱된 데이터 사용
                const oldLocation = localStorage.getItem("location");
                if (oldLocation === null)
                    localStorage.setItem(
                        "location",
                        JSON.stringify(TEMP_LOCATION)
                    );
                const { latitude, longitude } =
                    oldLocation === null
                        ? TEMP_LOCATION
                        : JSON.parse(oldLocation);
                setLocation({
                    lat: latitude ? latitude : TEMP_LOCATION.lat,
                    lng: longitude ? longitude : TEMP_LOCATION.lng,
                });
                const data = await getQuestList({
                    lat: !Number(latitude)
                        ? TEMP_LOCATION.lat
                        : Number(latitude),
                    lng: !Number(longitude)
                        ? TEMP_LOCATION.lng
                        : Number(longitude),
                });
                if (data.rows && data.rows.length > 0) {
                    setQuestList(data.rows);
                    dispatch(
                        questActions.setQuest({
                            list: data.rows,
                            region: data.currentRegion,
                        })
                    );
                }
                setRegion(data.currentRegion);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            },
            { ...geolocationOptions }
        );
    }, []);

    return {
        questList,
        loading,
        questType,
        setQuestType,
        location,
        region,
    };
};

export { useMainData };
