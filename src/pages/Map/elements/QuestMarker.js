import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { Grid } from "../../../elements";
import { getUpdatedDistance } from "../../../modules/location";
import ClickBalloon from "../../../assets/images/png/active-balloon-default.png";
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
                />
                {distance <= 0.03 && (
                    <CustomOverlayMap
                        position={{ lat: Props.lat, lng: Props.lng }}
                    >
                        <ClickBubble>
                            <img src={ClickBalloon} alt={"click"} />
                            {/* <p>Click!</p> */}
                        </ClickBubble>
                    </CustomOverlayMap>
                )}
            </MarkerWrapper>
        </>
    );
}

const MarkerWrapper = styled.div`
    width: 20px;
    height: 20px;
    background: none !important;
    border: none !important;
    & div {
        background: none !important;
        border: none !important;
        & div {
            background: none !important;
            border: none !important;
            & div {
                background: none !important;
                border: none !important;
            }
        }
    }
`;

const ClickBubble = styled.div`
    position: absolute;
    width: 40px;
    height: 23px;
    top: -35px;
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
