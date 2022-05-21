import styled from "styled-components";
import CloseIcon from "../../../assets/images/icon/CloseIcon";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";
import QuestMobFirst from "./QuestMobFirst";
import QuestMobSecond from "../components/QuestMobSecond";
import { questFragment } from "../../../modules/fragment";
import React, { useState } from "react";
import QuestMobThird from "./QuestMobThird";

export function QuestModal({ open, setClose, type }) {
  const [progress, setProgress] = useState(0);
  const [RSPIndex, setRSPIndex] = useState(null);

  const fragment = questFragment(type)

  const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    right: -100%;
    z-index: 1000;
    width: 100vw;
    max-width: 428px;
    height: 100vh;
    transition: all 500ms ease;
    background: ${fragment.color};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  return (
    <ModalWrapper
      style={open ? {right: 0} : {}}
    >
      <CloseButton onClick={setClose}>
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
      
    </ModalWrapper>  
  )
}

export const MemoizedQuestModal = React.memo(QuestModal);

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
