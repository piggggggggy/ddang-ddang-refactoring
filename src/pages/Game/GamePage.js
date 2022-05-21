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

export default function GamePage() {
  const navigate = useNavigate();
  const { type, questId } = useParams();
  const [progress, setProgress] = useState(0);
  const [RSPIndex, setRSPIndex] = useState(null);
  const fragment = questFragment(type)

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
        <CloseButton onClick={()=>navigate(-1)}>
          <CloseIcon color={'#fff'}/>
        </CloseButton>
        <Title>{fragment.text}</Title>
        <Paper>
          {/* <QuestMobFirst
            progress={progress}
            setProgress={setProgress}
          /> */}
          {/* <QuestMobSecond
            progress={progress}
            setProgress={setProgress}
            RSPIndex={RSPIndex}
            setRSPIndex={setRSPIndex}
          /> */}
          <QuestMobThird
            progress={progress}
            setProgress={setProgress}
            RSPIndex={RSPIndex}
          />


        </Paper>
        
      </Wrapper>  
    </Container>
  )
}

const CloseButton = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
`;
const Title = styled.p`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
  padding-bottom: 20px;
`;

const Paper = styled.div`
  position: relative;
  width: 90%;
  height: 70%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
`;
