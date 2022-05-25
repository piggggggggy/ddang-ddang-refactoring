import { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Grid } from "../elements";

export default function KakaoMapDefault({ children, fullSize }) {
    const [currentMapPosition, setCurrentMapPosition] = useState({
        lat: 0,
        lng: 0,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentMapPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    return (
        <MapWrapper>
            <Map
                center={currentMapPosition}
                draggable={false}
                level={6}
                zoomable={false}
                style={{ width: "100%", height: fullSize ? "100vh" : "100%" }}
            >
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
