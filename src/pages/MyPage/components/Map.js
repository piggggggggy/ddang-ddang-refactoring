import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import KakaoService from "../../../services/kakao.service";
import { Grid, Button, Text } from "../elements/index";

export default function MapView() {
    const [currentMapPosition, setCurrentMapPosition] = React.useState({});
    const [currentAddress, setCurrentAddress] = React.useState({});

    const getPosition = async () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            setCurrentMapPosition({
                lat: latitude,
                lng: longitude,
            });
        });
        // 카카오에서 좌표값을 가지고 주소 가져오기
        const getAddress = await KakaoService.getAddress({
            location: currentMapPosition,
        });

        setCurrentAddress(getAddress);
    };

    React.useEffect(() => {
        getPosition();
    }, []);
    return (
        <>
            <Grid mystyles="margin-top: 40px;">
                <Grid flex alignItems="center" justifyContent="center">
                    <Button mystyles="background: #5DED86; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);  border-radius: 100px; padding: 5px; font-weight: 400; font-size: 12px; border: none; width: 82px;">
                        점령한 땅
                    </Button>
                    <Button mystyles="background: #5DED86; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);  border-radius: 100px; padding: 5px; font-weight: 400; font-size: 12px; border: none;  margin-left:100px; width: 82px ">
                        작성한 피드
                    </Button>
                </Grid>
                <Grid
                    mystyles="overflow: hidden; margin-top:23px; border-radius: 20px; border: 2px solid red;"
                    animate={{ opacity: 1 }}
                >
                    {currentMapPosition !== null && (
                        <Map
                            center={{
                                lat: currentMapPosition.lat,
                                lng: currentMapPosition.lng,
                            }}
                            level={2}
                            style={{
                                width: "368px",
                                height: "240px",
                                position: "relative",
                                boxShadow:
                                    "1px 1px 4px 1px rgba(155, 155, 155, 0.15)",
                            }}
                        ></Map>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
