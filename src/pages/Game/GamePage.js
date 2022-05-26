import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/images/icon/CloseIcon";
import QuestPaperBottomButton from "./elements/QuestPaperBottomButton";
import QuestMobFirst from "./components/QuestMobFirst";
import QuestMobSecond from "./components/QuestMobSecond";
import QuestMobThird from "./components/QuestMobThird";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../elements";
import { questFragment } from "../../modules/fragment";
import QuestMobFourth from "./components/QuestMobFourth";
import MobPaper from "./components/MobPaper";

export default function GamePage() {
    const navigate = useNavigate();
    const { type, questId } = useParams();

    const fragment = questFragment(type);

    const Wrapper = styled.div`
        width: 100%;
        height: 100vh;
        background: ${fragment.color};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    return (
        <Container>
            <Wrapper>
                <CloseButton onClick={() => navigate(-1)}>
                    <CloseIcon color={"#fff"} />
                </CloseButton>
                <Title>{fragment.text}</Title>
                {type === "mob" && <MobPaper type={type} questId={questId} />}
            </Wrapper>
        </Container>
    );
}

const CloseButton = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
`;
const Title = styled.p`
    font-size: 28px;
    font-weight: 700;
    line-height: 1.15;
    color: #fff;
    padding-bottom: 20px;
`;
