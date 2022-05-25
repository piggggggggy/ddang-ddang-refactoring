import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { Grid } from "../../../elements";
import { getUpdatedDistance } from "../../../modules/location";

export default function QuestMarker(Props) {
    const [open, setOpen] = useState(false);
    const distance = getUpdatedDistance({
        lat: Props.currentPosition.lat,
        lng: Props.currentPosition.lng,
        _lat: Number(Props.lat),
        _lng: Number(Props.lng),
    });
    return (
        <>
            {open && <Dimmed onClick={() => setOpen(false)} />}
            {open && (
                <DeatilWrapper>
                    <Grid mystyles={"width: 120px;"}>
                        <Title>{Props.title}</Title>
                        <Description>{Props.description}</Description>
                    </Grid>
                    <Reward>{Props.reward},000P</Reward>
                </DeatilWrapper>
            )}
            <MapMarker
                zIndex={301}
                position={{ lat: Props.lat, lng: Props.lng }}
                onClick={() => setOpen(true)}
            >
                {distance <= 0.03 && <p>click</p>}
            </MapMarker>
        </>
    );
}

const Dimmed = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    width: 100vw;
    max-width: 428px;
    height: 100vh;
    background: rgba(132, 132, 132, 0.3);
`;

const DeatilWrapper = styled.div`
    position: fixed;
    top: calc(50vh - 30px);
    left: calc(50vw - 100px);
    z-index: 301;
    width: 200px;
    height: 60px;
    border-radius: 10px;
    border: 2px solid #5deb85;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
`;

const Title = styled.p`
    width: 100%;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Description = styled.p`
    width: 100%;
    font-size: 8px;
    line-height: 1.15;
    margin-bottom: 4px;
    color: #bababa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Reward = styled.span`
    font-size: 12px;
    font-weight: 700;
    line-height: 1.15;
`;
