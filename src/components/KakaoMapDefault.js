import { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Grid } from "../elements";
import MyMarker from "../assets/images/png/logo-small.png";

export default function KakaoMapDefault({
    children,
    fullSize,
    location,
    setLocation,
}) {
    // const [currentMapPosition, setCurrentMapPosition] = useState({
    //     lat: 0,
    //     lng: 0,
    // });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    return (
        <MapWrapper>
            <Map
                center={location}
                draggable={false}
                level={6}
                zoomable={false}
                style={{ width: "100%", height: fullSize ? "100vh" : "100%" }}
            >
                <MapMarker
                    position={location}
                    image={{
                        src: MyMarker,
                        size: {
                            width: 22,
                            height: 22,
                        },
                        options: {
                            offset: {
                                x: 11,
                                y: 11,
                            },
                        },
                    }}
                />
                {children}
            </Map>
        </MapWrapper>
    );
}

const MapWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
