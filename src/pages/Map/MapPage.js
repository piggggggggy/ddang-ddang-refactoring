import { useEffect, useState } from "react";
import styled from "styled-components";
import MapSideTab from "./components/MapSideTab";
import { Container, Grid } from "../../elements";
import MapComponent from "./components/MapComponent";
import LandingModal from "./components/LandingModal";
import QuestActivateLayer from "./components/QuestActivateLayer";
import { useWatchLocation } from "./hooks/locationHooks";
import { getQuestList } from "../../services/main.service";
import { useNavigate } from "react-router-dom";
import { questFragment } from "../../modules/fragment";
import BackArrow from "../../assets/images/png/back-arrow.png";
import MenuIcon from "../../assets/images/icon/MenuIcon";
import CenterButton from "./elements/CenterButton";
import QuestDetailLayer from "./components/QuestDetailLayer";
import { useSelector } from "react-redux";

export default function MapPage() {
    const navigate = useNavigate();
    const [tabOpen, setTabOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailState, setDetailState] = useState(null);
    const [questActive, setQuestActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [questList, setQuestList] = useState([]);
    const [questType, setQuestType] = useState("all");
    const [color, setColor] = useState("#EBEBEB");
    const [questModalState, setQuestModalState] = useState({
        open: false,
        type: "",
    });
    const [region, setRegion] = useState({
        regionDong: "땅땅동",
        regionGu: "땅땅구",
        regionSi: "땅땅",
    });

    const userData = useSelector((state) => state.user.user);

    const {
        currentMapPosition,
        setCurrentMapPosition,
        position,
        setPosition,
        cancelWatchPosition,
        isDrag,
        setIsDrag,
        inCircleList,
    } = useWatchLocation(questList, questType);

    const openQuestModal = (type) => {
        closeQuestActive();
        setQuestModalState({
            open: true,
            type: type,
        });
    };
    const closeQuestModal = () => {
        setQuestModalState({
            ...questModalState,
            open: false,
        });
    };
    const setDdangDdang = () => {
        if (inCircleList.length === 0) return;
        setQuestActive(true);
    };
    const closeTab = () => {
        setTabOpen(false);
    };
    const closeQuestActive = () => {
        setQuestActive(false);
    };
    const selectQuestInSideTab = ({ lat, lng }) => {
        setTabOpen(false);
        setIsDrag(true);
        setCurrentMapPosition({
            lat: lat,
            lng: lng,
        });
    };

    const moveToCenter = () => {
        setIsDrag(false);
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("center move", position);
            setPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
    };

    const activateDetail = (item) => {
        setDetailState({
            type: item.type,
            id: item.id,
            lat: item.lat,
            lng: item.lng,
        });
        setDetailOpen(true);
    };

    useEffect(() => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (res) => {
            setCurrentMapPosition({
                lat: res.coords.latitude,
                lng: res.coords.longitude,
            });
            const data = await getQuestList(
                res.coords.latitude,
                res.coords.longitude
            );
            console.log(res);
            if (data.rows.length > 0) {
                setQuestList(data.rows);
            }
            setRegion(data.currentRegion);
            setTimeout(() => {
                setLoading(false);
            }, 200);
        });
    }, []);

    const list = [
        {
            id: 11,
            type: "time",
            let: 0,
            lng: 0,
        },
        {
            id: 12,
            type: "mob",
            let: 0,
            lng: 0,
        },
    ];
    //     {
    //         id: 11,
    //         type: "feed",
    //     },
    //     {
    //         id: 11,
    //         type: "time",
    //     },
    // ];

    useEffect(() => {
        if (questType === "mob") {
            setColor("#FA5A54");
        } else if (questType === "time") {
            setColor("#EDEA50");
        } else if (questType === "feed") {
            setColor("#61B7FA");
        } else {
            setColor("#EBEBEB");
        }

        if (inCircleList.length > 0) {
            setColor("#5DEB85");
        }
    }, [inCircleList, questType]);

    return (
        <Container>
            <LandingModal
                loading={loading}
                region={region}
                questLength={questList.length}
                userData={userData}
            />

            <MapComponent
                questList={questList}
                questType={questType}
                currentMapPosition={currentMapPosition}
                setCurrentMapPosition={setCurrentMapPosition}
                position={position}
                setPosition={setPosition}
                cancelWatchPosition={cancelWatchPosition}
                isDrag={isDrag}
                setIsDrag={setIsDrag}
                setDetail={setDetailState}
                openDetail={() => setDetailOpen(true)}
            />

            <MapSideTab
                open={tabOpen}
                setClose={closeTab}
                questList={questList}
                selectQuest={selectQuestInSideTab}
                userData={userData}
                activateDetail={activateDetail}
            />

            <UserInfo
                style={
                    questActive || detailOpen
                        ? { display: "none" }
                        : { display: "flex" }
                }
                onClick={() => setTabOpen(true)}
            >
                <MenuIcon size={"small"} />
                <p>
                    <span>Lv.{userData === null ? 0 : userData.level}</span>
                    {userData === null ? "땅땅" : userData.nickname}
                </p>
            </UserInfo>

            <ButtonWrapper
                style={
                    questActive || detailOpen
                        ? { display: "none" }
                        : { display: "block" }
                }
            >
                <CenterButton onClick={moveToCenter} />

                <Grid flex justifyContent={"space-between"}>
                    <BottomCategoryButton onClick={() => setQuestType("mob")}>
                        <img src={questFragment("mob").img} alt={"mob img"} />
                        <p>몬스터대전</p>
                    </BottomCategoryButton>
                    <BottomCategoryButton onClick={() => setQuestType("time")}>
                        <img src={questFragment("time").img} alt={"time img"} />
                        <p>타임어택</p>
                    </BottomCategoryButton>
                    <BottomCategoryButton onClick={() => setQuestType("feed")}>
                        <img src={questFragment("feed").img} alt={"feed img"} />
                        <p>땅문서작성</p>
                    </BottomCategoryButton>
                    <BottomCategoryButton onClick={() => setQuestType("all")}>
                        <img src={questFragment("all").img} alt={"all img"} />
                        <p>전체리스트</p>
                    </BottomCategoryButton>
                </Grid>

                <Grid
                    flex
                    justifyContent={"space-between"}
                    mystyles={"padding-top: 8px;"}
                >
                    <BottomFooterButton
                        style={{ width: "22%" }}
                        onClick={() => navigate(-1)}
                    >
                        <img src={BackArrow} alt={"back arrow"} />
                        <span>뒤로 가기</span>
                    </BottomFooterButton>
                    <BottomFooterButton
                        style={{ background: color, width: "74%" }}
                        onClick={setDdangDdang}
                    >
                        <p>땅땅 시작</p>
                    </BottomFooterButton>
                </Grid>
            </ButtonWrapper>
            <QuestDetailLayer
                open={detailOpen}
                setClose={() => setDetailOpen(false)}
                item={detailState}
                position={position}
            />
            <QuestActivateLayer
                open={questActive}
                setClose={closeQuestActive}
                // list={inCircleList}
                position={position}
                list={list}
            />
        </Container>
    );
}

const UserInfo = styled.div`
    position: absolute;
    z-index: 500;
    top: 45px;
    left: 30px;
    width: 152px;
    height: 48px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    & p {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        & span {
            color: #266137;
            padding-right: 7px;
        }
    }
`;

const BottomCategoryButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 22%;
    height: calc(22vw - 10px);
    max-height: 80px;
    background: #fff;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    border-radius: 10px;
    & p {
        font-size: 12px;
        font-weight: 700;
        line-height: 1.15;
        padding-top: 5%;
    }
    & img {
        width: 50%;
        height: 50%;
        object-fit: cover;
    }
`;

const BottomFooterButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 49%;
    height: calc(22vw - 10px);
    max-height: 80px;
    background: #fff;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    border-radius: 10px;
    & p {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        color: #273938;
    }
    & span {
        font-size: 12px;
        font-weight: 700;
        line-height: 1.15;
        color: #273938;
    }
`;

const LevelProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100px;
    height: 8px;
    background: #5deb85;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 0;
    padding: 0 20px 50px;
    z-index: 500;
    width: 100%;
`;
