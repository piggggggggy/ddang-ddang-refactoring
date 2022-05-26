import React from "react";
import styled from "styled-components";
import axios from "axios";
import env from "react-dotenv";

import Container from "../../elements/Container";
import Navigation from "../../components/Navigation";
import { Grid, Button, Text } from "../Feed/elements/index";
import Tablist from "../Feed/components/Tablist";

export default function Feed() {
    const [currentMapPosition, setCurrentMapPosition] = React.useState({});
    console.log(currentMapPosition);

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            setCurrentMapPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
        getmyAddress();
    };

    const getmyAddress = () => {
        axios
            .get(
                `${env.MAP_KAKAO_BASE_URL}/geo/coord2address.json?x=127.4147562&y=36.3298522&input_coord=WGS84`,
                {
                    headers: {
                        Accept: "*/*",
                        Authorization: `KakaoAK ${env.MAP_KAKAO_API_KEY}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [tabIndex, setTabIndex] = React.useState(0);

    return (
        <Container>
            <BackgroundPaper />
            <Grid
                mystyles={"position: relative; z-index: 100; padding: 0 30px;"}
            >
                <Tablist />
            </Grid>
        </Container>
    );
}

const BackgroundPaper = styled.div`
    position: absolute;
    top: -1130px;
    left: calc(50% - 750px);
    z-index: 0;
    width: 1500px;
    height: 1500px;
    background: #5deb85;
    border-radius: 50%;
`;
