import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postQuest } from "../../../apis/questApi";
import { Grid } from "../../../elements";
import { questFragment } from "../../../modules/fragment";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";
import RockScissorsPaperItem from "../elements/RockScissorsPaperItem";
import CompleteModal from "./CompleteModal";

export default function QuestMobFourth({ setProgress, progress, setRSPIndex, result, questId }) {
  const navigate = useNavigate();
  const fragment = questFragment("mob")
  const [popupOpen, setPopupOpen] = useState(false);

  const setConfirm = () => {
    if (result === "Win") {
      setPopupOpen(true);
    } else {
      // navigate(-1);
      setRSPIndex(null)
      setProgress(1)
    }
  }

  const completeQuest = async () => {
    const data = await postQuest({
      request: {}, 
      type: "mob", 
      questId: questId,
    });
    if (data.ok) {
      navigate(-1);
    }
  }

  const resultHandler = (() => {
    switch (result) {
      case "Draw":
        return {
          text: "다음에 다시 와!",
          title: "You LOSE",
          // buttonText: <>다시 도전하기 <span>최대 2번</span></>,
          buttonText: "내일 다시 도전하세요!",
        }
      case "Lose":
        return {
          text: "다음에 다시 와!",
          title: "You LOSE",
          buttonText: "내일 다시 도전하세요!",
        }
      case "Win":
        return {
          text: "내가 졌다...",
          title: "You WIN",
          buttonText: "포인트 받기",
        }
      default:
        return {
          text: "다음에 다시 와!",
          title: "You LOSE",
          buttonText: "내일 다시 도전하세요!",
        }
    }
  })();

  return (
    <Grid
      mystyles={"position: relative; height: 100%; width: 100%; padding: 40px 30px 0"}
    >
      <Title>{resultHandler.title}</Title>
      <Baloon>{resultHandler.text}</Baloon>

      <CompleteModal
        open={popupOpen}
        setComfirm={completeQuest}
      />
      <QuestPaperBottomButton
        text={resultHandler.buttonText}
        color={fragment.subColor}
        onClick={setConfirm}
      />
    </Grid>
  )
}

const Title = styled.div`
  width: 100%;
  font-size: 40px;
  line-height: 1.15;
  text-align: center;
  font-weight: 700;
  color: #EB6042;
  text-align: center;
  padding: 100px 0 40px;
`;

const Baloon = styled.div`
  width: 60%;
  height: 40px;
  background: #EBEBEB;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 14px;
    line-height: 1.15;
    text-align: center;
    color: #273938;
    text-align: center;
  }
`;
