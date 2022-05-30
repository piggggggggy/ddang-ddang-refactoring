import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import KakaoService from "../../../services/kakao.service";
import { Grid, Button, Text } from "../elements/index";

export default function MapView({ tabIndex, changeTab }) {
    const [currentMapPosition, setCurrentMapPosition] = React.useState(null);
    // console.log(currentMapPosition);
    const getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position);
            setCurrentMapPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });

        const tempLocation = {
            lat: 37.5172363,
            lng: 127.0473248,
        };

        // console.log(getPosition())
        const data = KakaoService.getAddress({ locatoin: tempLocation });
    };

    React.useEffect(() => {
        getPosition();
    }, []);
    return (
        <>
            <Grid mystyles="margin-top: 40px;">
                <Grid flex alignItems="center" justifyContent="center">
                    <Button
                        onClick={() => changeTab(0)}
                        mystyles={`background: ${
                            tabIndex === 0 ? "#5DED86" : "#fff"
                        }; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);  border-radius: 100px; padding: 5px; font-weight: 400; font-size: 12px; border: none; width: 82px;`}
                    >
                        점령한 땅
                    </Button>
                    <Button
                        onClick={() => changeTab(1)}
                        mystyles={`background: ${
                            tabIndex === 1 ? "#5DED86" : "#fff"
                        }; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);  border-radius: 100px; padding: 5px; font-weight: 400; font-size: 12px; border: none;  margin-left:100px; width: 82px `}
                    >
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
