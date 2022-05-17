import { Grid } from "../../../elements/index";
import styled from "styled-components";
import QuestItemForCarousel from "../elements/QuestItemForCarousel";
import QuestListContainer from "./QuestListContainer";

export default function LocalQuestSummary() {
  

  return (
    <Grid
      mystyles={'padding-bottom: 200px;'}
    >
      <Title>
        지금 <span>보광동</span> 퀘스트
      </Title>

      <Grid
        mystyles={'width: 100%; max-width: 100%;'}
      >
        <Carousel>
          <QuestItemForCarousel/>
          <QuestItemForCarousel/>
          <QuestItemForCarousel/>
          <QuestItemForCarousel/>
          <QuestItemForCarousel/>
        </Carousel>
      </Grid>

      <Grid mystyles={'padding: 34px 30px 39px'}>
        <QuestListContainer/>
      </Grid>

    </Grid>
  )
}

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.15;
  padding: 0 34px;
  margin-bottom: 22px;
  & span {
    color: #266137;
  }
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  max-width: 592px;
  padding: 20px 0 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;