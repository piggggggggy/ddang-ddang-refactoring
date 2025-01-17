import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import KakaoService from "../../../services/kakao.service";
import { Grid, Button, Text } from "../elements/index";
import Red from "../../../assets/images/png/red-marker-circle.png";
import Yellow from "../../../assets/images/png/yellow-marker-circle.png";
import Blue from "../../../assets/images/png/blue-marker-circle.png";

export default function MapView({ tabIndex, changeTab, userData }) {
    const completed = userData.profile[0].completes;

    const [feeds, setFeeds] = React.useState([]);
    console.log(feeds);
    console.log(tabIndex);
    console.log(completed);
    const [currentMapPosition, setCurrentMapPosition] = React.useState(null);

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentMapPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });

        const tempLocation = {
            lat: 37.5172363,
            lng: 127.0473248,
        };

        const data = KakaoService.getAddress({ locatoin: tempLocation });
    };

    React.useEffect(() => {
        getPosition();
        setFeeds(
            completed.filter((value) => {
                return value.quest.type === "feed";
            })
        );
    }, []);
    return (
        <>
            <Grid mystyles="margin-top: 40px;">
                <Grid flex alignItems="center" justifyContent="center">
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="width: 164px; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); border-radius: 100px; background: #fff "
                    >
                        <Button
                            onClick={() => changeTab(0)}
                            mystyles={`background: ${
                                tabIndex === 0 ? "#5DED86" : "#fff"
                            }; border-radius: 100px; padding: 5px; font-weight: 400; font-size: 12px; border: none; width: 82px; height: 32px;`}
                        >
                            점령한 땅
                        </Button>
                        <Button
                            onClick={() => changeTab(1)}
                            mystyles={`background: ${
                                tabIndex === 1 ? "#5DED86" : "#fff"
                            };border-radius: 100px; padding: 5px; font-weight: 400; font-size: 12px; border: none; width: 82px; height: 32px; `}
                        >
                            작성한 피드
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    mystyles="overflow: hidden; margin-top:23px; border-radius: 20px;"
                    animate={{ opacity: 1 }}
                >
                    {currentMapPosition !== null && userData !== null && (
                        <Map
                            center={{
                                lat: currentMapPosition.lat,
                                lng: currentMapPosition.lng,
                            }}
                            level={6}
                            style={{
                                width: "368px",
                                height: "240px",
                                position: "relative",
                                boxShadow:
                                    "1px 1px 4px 1px rgba(155, 155, 155, 0.15)",
                            }}
                        >
                            {tabIndex === 0 && (
                                <>
                                    {completed.map((item, idx) => {
                                        console.log(item);
                                        if (item.quest.type === "mob") {
                                            return (
                                                <MapMarker // 마커를 생성합니다
                                                    position={{
                                                        // 마커가 표시될 위치입니다
                                                        lat: Number(
                                                            item.quest.lat
                                                        ),
                                                        lng: Number(
                                                            item.quest.lng
                                                        ),
                                                    }}
                                                    image={{
                                                        src: Red,
                                                        size: {
                                                            width: 14,
                                                            height: 14,
                                                        },
                                                        options: {
                                                            offset: {
                                                                x: 27,
                                                                y: 69,
                                                            },
                                                        },
                                                    }}
                                                />
                                            );
                                        }
                                        if (item.quest.type === "time") {
                                            return (
                                                <MapMarker // 마커를 생성합니다
                                                    position={{
                                                        // 마커가 표시될 위치입니다
                                                        lat: Number(
                                                            item.quest.lat
                                                        ),
                                                        lng: Number(
                                                            item.quest.lng
                                                        ),
                                                    }}
                                                    image={{
                                                        src: Yellow,
                                                        size: {
                                                            width: 14,
                                                            height: 14,
                                                        },
                                                        options: {
                                                            offset: {
                                                                x: 27,
                                                                y: 69,
                                                            },
                                                        },
                                                    }}
                                                />
                                            );
                                        }
                                        if (item.quest.type === "feed") {
                                            return (
                                                <MapMarker // 마커를 생성합니다
                                                    position={{
                                                        // 마커가 표시될 위치입니다
                                                        lat: Number(
                                                            item.quest.lat
                                                        ),
                                                        lng: Number(
                                                            item.quest.lng
                                                        ),
                                                    }}
                                                    image={{
                                                        src: Blue,
                                                        size: {
                                                            width: 14,
                                                            height: 14,
                                                        },
                                                        options: {
                                                            offset: {
                                                                x: 27,
                                                                y: 69,
                                                            },
                                                        },
                                                    }}
                                                />
                                            );
                                        }
                                    })}
                                </>
                            )}
                            {tabIndex === 1 && (
                                <>
                                    {feeds.map((item, idx) => {
                                        if (item.quest.type === "feed") {
                                            return (
                                                <MapMarker // 마커를 생성합니다
                                                    position={{
                                                        // 마커가 표시될 위치입니다
                                                        lat: Number(
                                                            item.quest.lat
                                                        ),
                                                        lng: Number(
                                                            item.quest.lng
                                                        ),
                                                    }}
                                                    image={{
                                                        src: Blue,
                                                        size: {
                                                            width: 14,
                                                            height: 14,
                                                        },
                                                        options: {
                                                            offset: {
                                                                x: 27,
                                                                y: 69,
                                                            },
                                                        },
                                                    }}
                                                />
                                            );
                                        }
                                    })}
                                </>
                            )}
                        </Map>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
