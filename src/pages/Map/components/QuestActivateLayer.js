import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "../../../elements";
import SelectedQuestCard from "../elements/SelectedQuestCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

export default function QuestActivateLayer({ open, setClose, list }) {
    const navigate = useNavigate();

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
                        {list.map((item, index) => (
                            <SelectedQuestCard
                                {...item}
                                onClick={setClose}
                                selectQuest={() =>
                                    navigate(`/quest/${item.type}/${item.id}`)
                                }
                            />
                        ))}
                    </Slider>
                </SlidWrapper>
            )}
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

const SlidWrapper = styled.div`
    position: fixed;
    z-index: 3000;
    top: calc(50vh - 180px);
    left: 0;
    overflow: hidden;
    width: 100%;
    /* width: 1000px; */
`;
