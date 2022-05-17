import { useState } from "react";
import styled from "styled-components";
import KakaoMapDefault from "../../components/KakaoMapDefault";
import MapSideTab from "./components/MapSideTab";
import { Container, Grid } from "../../elements";

export default function MapPage() {
  const [tabOpen, setTabOpen] = useState(false);
  const closeTab = () => {
    setTabOpen(false);
  }
  return (
    <Container>
      <KakaoMapDefault fullSize>

      </KakaoMapDefault>

      <MapSideTab 
        open={tabOpen}
        setClose={closeTab}
      />

      <UserInfo onClick={()=>setTabOpen(true)}>
        <p><span>Lv.77</span>강윤지</p>
      </UserInfo>

      <Grid
        mystyles={
          'position: absolute; bottom: 0; padding: 0 20px 50px; z-index: 500;'
        }
      >
        <Grid 
          flex
          justifyContent={"space-between"}
        >
          <BottomCategoryButton>
            <img/>
            <p></p>
          </BottomCategoryButton>
          <BottomCategoryButton>
            <img/>
            <p></p>
          </BottomCategoryButton>
          <BottomCategoryButton>
            <img/>
            <p></p>
          </BottomCategoryButton>
          <BottomCategoryButton>
            <img/>
            <p></p>
          </BottomCategoryButton>
        </Grid>

        <Grid 
          flex
          justifyContent={"space-between"}
          mystyles={'padding-top: 8px;'}
        >
          <BottomFooterButton>
            <p>Lv.77</p>
            <span>다음 레벨까지 12,000P</span>
            <Grid
              mystyles={
                'position: relative; width: calc(100% - 30px); height: 8px; background: #D7D7D7;'
              }
            >
              <LevelProgressBar style={{width: '70%'}}/>
            </Grid>
          </BottomFooterButton>
          <BottomFooterButton style={{background: '#EBEBEB'}}>
            <p>땅땅 시작</p>
          </BottomFooterButton>
        </Grid>
      </Grid>
    </Container>
  )
}

const UserInfo = styled.div`
  position: absolute;
  z-index: 500;
  top: 45px;
  left: 30px;
  width: 152px;
  height: 48px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
    & span {
      color: #266137;
      padding-right: 7px;
    }
  }
`;

const BottomCategoryButton = styled.div`
  width: 22%;
  height: calc(22vw - 10px);
  max-height: 80px;
  background: #fff;
  box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
  border-radius: 10px;
`;

const BottomFooterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 49%;
  height: calc(22vw - 10px);
  max-height: 80px;
  background: #fff;
  box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
  border-radius: 10px;
  & p {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
  }
  & span {
    font-size: 8px;
    line-height: 1.15;
    color: #05240E;
    opacity: 0.5;
    padding-bottom: 8px;
  }
`;

const LevelProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100px;
  height: 8px;
  background: #5DEB85;
`;