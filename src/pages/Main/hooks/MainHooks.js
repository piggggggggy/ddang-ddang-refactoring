import { FlashOnOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import KakaoService from "../../../services/kakao.service";
import { getQuestList } from "../../../services/main.service";
import { questActions } from "../../../store/slices/questSlice";
import { userActions } from "../../../store/slices/userSlice";
const geolocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 2000,
    timeout: 2000,
};
const useMainData = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [questList, setQuestList] = useState([]);
    const [questType, setQuestType] = useState("all");
    const [location, setLocation] = useState({
        lat: 0,
        lng: 0,
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
                const newLocation = JSON.stringify(res.coords);
                localStorage.setItem("location", newLocation);

                setLocation({
                    lat: res.coords.latitude,
                    lng: res.coords.longitude,
                });
                console.log(res);
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

                    const tempLocation = {
                        lat: 37.5172363,
                        lng: 127.0473248,
                    };

                    const data = await getQuestList(tempLocation);
                    const { regionDong, regionGu, regionSi } =
                        data.currentRegion;
                    console.log(data);
                    console.log(regionDong, regionGu, regionSi);

                    if (data.rows.length > 0) {
                        setQuestList(data.rows);
                        dispatch(
                            userActions.setQuest({
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
                const oldLocation = localStorage.getItem("location");
                const { latitude, longitude } = JSON.parse(oldLocation);
                const data = await getQuestList({
                    lat: Number(latitude),
                    lng: Number(longitude),
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
