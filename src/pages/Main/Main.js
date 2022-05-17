import { Container, Grid } from "../../elements/index";
import styled from "styled-components";
import UserInfoContainer from "./components/UserInfoContainer";
import QuestButtonContainer from "./components/QuestButtonContainer";
import LocalQuestSummary from "./components/LocalQuestSummary";
import MainMapContainer from "./components/MainMapContainer";
import Navigation from "../../components/Navigation";
import { useState } from "react";

export default function Main() {
  const [questType, setQuestType] = useState('all');

  return (
    <Container>

      <BackgroundPaper/>

      <Grid
        mystyles={
          'position: relative; z-index: 100; padding: 0 30px;'
        }
      >
        <Address>서울특별시 용산구 보광동</Address>
        <UserInfoContainer/>  
        
        <MainMapContainer
          type={questType}
        />

        <QuestButtonContainer
          setType={setQuestType}
        />
      </Grid>

      <LocalQuestSummary/>


      <Navigation/>
    </Container>
  )
}

const BackgroundPaper = styled.div`
  position: absolute;
  top: -928px;
  left: calc(50% - 750px);
  z-index: 0;
  width: 1500px;
  height: 1500px;
  background: #5DEB85;
  border-radius: 50%;
`
const Address = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.15;
  text-align: center;
  color: #fff;
  padding: 50px 0 30px;
`;