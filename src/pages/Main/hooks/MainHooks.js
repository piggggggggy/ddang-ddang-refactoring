import { FlashOnOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import KakaoService from "../../../services/kakao.service";
import { getQuestList } from "../../../services/main.service";
import { userActions } from "../../../store/slices/userSlice";

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

        navigator.geolocation.getCurrentPosition(async (res) => {
            //사용자의 위치를 가져온다.
            setLocation({
                lat: res.coords.latitude,
                lng: res.coords.longitude,
            });

            console.log(location.lat, location.lng);

            // 만약에 사용자의 위치에서 시구동을 못가져오면 현재 가능한지 않는 지역에 있습니다.
            const userdata = await KakaoService.getAddress(
                location.lat,
                location.lng
            );


            // 주소가 아무것도 없다고 나오면 강제로 주소를 정해준다.
            if (
                userdata.si === undefined &&
                userdata.gu === undefined &&
                userdata.dong === undefined
            ) {
                //이상한 주소
                const tempLocation = {
                    lat: 37.566,
                    lng: 126.978,
                };
                const data = await getQuestList(tempLocation);

                if (data.rows.length > 0) {
                    setQuestList(data.rows);
                    dispatch(
                        userActions.setQuest({
                            list: data.rows,
                            region: data.currentRegion,
                        })
                    );
                }

                setRegion(data.currentRegion);

                return alert("현재 가능한 지역이 아닙니다.");
            } else {
                //  퀘스트를 가져온다
                const data = await getQuestList(
                    res.coords.latitude,
                    res.coords.longitude
                );

                if (data.rows.length > 0) {
                    setQuestList(data.rows);
                    dispatch(
                        userActions.setQuest({
                            list: data.rows,
                            region: data.currentRegion,
                        })
                    );
                }
                setRegion(data.currentRegion);
            }
            console.log(userdata);

            setTimeout(() => {
                setLoading(false);
            }, 200);
        });
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
