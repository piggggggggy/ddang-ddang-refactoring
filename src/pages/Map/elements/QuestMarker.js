import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { Grid } from "../../../elements";
import { getUpdatedDistance } from "../../../modules/location";
import ClickBalloon from "../../../assets/images/png/active-balloon.png";
import { questFragment } from "../../../modules/fragment";

export default function QuestMarker(Props) {
    const distance = getUpdatedDistance({
        lat: Props.currentPosition.lat,
        lng: Props.currentPosition.lng,
        _lat: Number(Props.lat),
        _lng: Number(Props.lng),
    });

    const activateDetail = () => {
        Props.setDetail({
            type: Props.type,
            id: Props.id,
            lat: Props.lat,
            lng: Props.lng,
            timeUntil: Props.timeUntil,
        });
        Props.openDetail();
    };
    return (
        <>
            <MarkerWrapper>
                <MapMarker
                    zIndex={301}
                    position={{ lat: Props.lat, lng: Props.lng }}
                    image={{
                        src: questFragment(Props.type).icon,
                        size: {
                            width: 14,
                            height: 14,
                        },
                    }}
                    onClick={activateDetail}
                >
                    {distance <= 0.03 && (
                        <CustomOverlayMap
                            position={{ lat: Props.lat, lng: Props.lng }}
                        >
                            <ClickBubble>
                                <img src={ClickBalloon} alt={"click"} />
                                <p>Click!</p>
                            </ClickBubble>
                        </CustomOverlayMap>
                    )}
                </MapMarker>
            </MarkerWrapper>
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
    background: rgba(39, 57, 56, 0.5);
`;
const MarkerWrapper = styled.div`
    & div {
        background: none !important;
        border: none !important;
    }
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

const ClickBubble = styled.div`
    position: absolute;
    width: 50px;
    height: 29px;
    top: -40px;
    left: -35px;
    z-index: 302;
    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    & p {
        position: absolute;
        z-index: 303;
        top: 5px;
        left: 10px;
        font-size: 4px;
        color: #fff;
    }
`;
