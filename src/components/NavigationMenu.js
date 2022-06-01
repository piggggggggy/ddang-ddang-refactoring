import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";

export default function NavigationMenu({ index, isSelected }) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.user);
    // const [roomName, setRoomName] = useState(null);
    const [si, setSi] = useState(null);
    const [gu, setGu] = useState(null);
    const [dong, setDong] = useState(null);

    useEffect(() => {
        getPosition();
    }, []);

    // 좌표 찾기
    const [currentMapPosition, setCurrentMapPosition] = React.useState({});
    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setCurrentMapPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            await getmyAddress(
                position.coords.latitude,
                position.coords.longitude
            );
        });
    };

    // 카카오 api 로 시, 구, 동 정보 받기
    const getmyAddress = async (lat, lng) => {
        try {
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

            // console.log(`성공했음 ${data.si} ${data.gu} ${data.dong}`);
            const { si, gu, dong } = data;
            // setRoomName(si + gu + dong);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    /* */

    const menuList = [
        { title: "홈" },
        { title: "랭킹" },
        { title: "피드" },
        { title: "채팅" },
        { title: "MY" },
    ];
    const currentMenu = menuList[index];

    const moveToPageTop = () => {
        window.scrollTo(0, 0);
    };

    const moveToPage = () => {
        switch (index) {
            case 0:
                navigate("/");
                return;
            case 1:
                navigate("/ranking");
                return;
            case 2:
                navigate("/feed");
                return;
            case 3:
                console.log(userData.playerId)
                console.log(userData.nickname)
                console.log(si)
                console.log(gu)
                console.log(dong)
                if (userData.playerId && userData.nickname && si && gu && dong) {
                    navigate(`/chat/${userData.playerId}/${userData.nickname}/${si}/${gu}/${dong}`);
                }
                return;
            case 4:
                navigate("/myPage");
                return;
            default:
                navigate("/");
                return;
        }
    };

    return (
        <MenuItem
            onClick={() => {
                moveToPage();
                moveToPageTop();
            }}
        >
            <span style={isSelected ? { color: "#5DED86" } : {}}>
                {currentMenu.title}
            </span>
        </MenuItem>
    );
}

const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 64px;
    & span {
        font-size: 16px;
        line-height: 1.15;
        text-align: center;
        color: #dddddd;
    }
`;
