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
    const [location, setLocation] = useState({});
    const [region, setRegion] = useState({
        regionDong: "",
        regionGu: "",
        regionSi: "",
    });

    useEffect(() => {
        setLoading(true);

        navigator.geolocation.getCurrentPosition(async (res) => {
            const { latitude, longitude } = res.coords;
            //사용자의 위치를 가져온다.
            console.log(latitude, longitude);
            setLocation({
                lat: latitude,
                lng: longitude,
            });

            console.log(location);
            const userdata = await KakaoService.getAddress({
                location: location,
            });
            console.log(userdata);

            setRegion({
                regionSi: userdata.si,
                regionGu: userdata.gu,
                regionDong: userdata.dong,
            });

            const data = await getQuestList({ location: location });

            if (data.rows.length > 0) {
                setQuestList(data.rows);
                dispatch(
                    userActions.setQuest({
                        list: data.rows,
                        region: data.currentRegion,
                    })
                );
            }
            // 현재 지역 설정
            setRegion(data.currentRegion);
        });

        setTimeout(() => {
            setLoading(false);
        }, 200);
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
