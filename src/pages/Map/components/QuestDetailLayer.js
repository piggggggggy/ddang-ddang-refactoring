import styled from "styled-components";
import { Grid } from "../../../elements";
import SelectedQuestCard from "../elements/SelectedQuestCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { getUpdatedDistance } from "../../../modules/location";
import ToastPageMsg from "../../../elements/ToastMsgPage";
import { useState } from "react";

export default function QuestDetailLayer({ open, setClose, item, position }) {
    const navigate = useNavigate();
    const [onToast, setOnToast] = useState(false);

    return (
        <>
            {open && <Dimmed onClick={setClose} />}
            {open && (
                <SlidWrapper>
                    <Slider
                        infinite={false}
                        centerMode={true}
                        // slidesToShow={2}
                        arrows={false}
                        centerPadding={"20px"}
                    >
                        <SelectedQuestCard
                            {...item}
                            onClick={setClose}
                            openToast={() => setOnToast(true)}
                            selectQuest={() => {
                                if (item.type === "time") {
                                    navigate(
                                        `/quest/${item.type}/${item.id}?time=${item.timeUntil}`
                                    );
                                } else {
                                    navigate(`/quest/${item.type}/${item.id}`);
                                }
                            }}
                            isInCircle={
                                getUpdatedDistance({
                                    lat: position.lat,
                                    lng: position.lng,
                                    _lat: item.lat,
                                    _lng: item.lng,
                                }) <= 0.03
                            }
                        />
                    </Slider>
                </SlidWrapper>
            )}
            <ToastPageMsg onToast={onToast} setOnToast={setOnToast}>
                이미 실패한 퀘스트에요!
            </ToastPageMsg>
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

const SlidWrapper = styled.div`
    position: fixed;
    z-index: 3000;
    top: calc(50vh - 180px);
    left: 0;
    overflow: hidden;
    width: 100%;
    /* width: 1000px; */
`;
