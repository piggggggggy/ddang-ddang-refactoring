import { useEffect, useState } from "react";
import styled from "styled-components";
import MapSideTab from "./components/MapSideTab";
import { Container, Grid } from "../../elements";
import MapComponent from "./components/MapComponent";
import LandingModal from "./components/LandingModal";
import QuestActivateLayer from "./components/QuestActivateLayer";
import { QuestModal, MemoizedQuestModal } from "../Game/components/QuestModal";
import { useWatchLocation } from "./hooks/locationHooks";
import { getQuestList } from "../../apis/mainApi";

export default function MapPage() {
  const [tabOpen, setTabOpen] = useState(false);
  const [questActive, setQuestActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questList, setQuestList] = useState([]);
  const [questType, setQuestType] = useState('all');
  const [color, setColor] = useState('#EBEBEB')
  const [questModalState, setQuestModalState] = useState({
    open: false,
    type: '',
  });
  
  const { 
    currentMapPosition,
    setCurrentMapPosition,
    position, 
    setPosition, 
    cancelWatchPosition, 
    isDrag, 
    setIsDrag,
    inCircleList,
  } = useWatchLocation(questList, questType);

  const openQuestModal = (type) => {
    closeQuestActive();
    setQuestModalState({
      open: true,
      type: type,
    })
  }
  const closeQuestModal = () => {
    setQuestModalState({
      ...questModalState, open: false,
    })
  }
  const setDdangDdang = () => {
    if (inCircleList.length === 0) return;
    setQuestActive(true)
  }
  const closeTab = () => {
    setTabOpen(false);
  }
  const closeQuestActive = () => {
    setQuestActive(false);
  }
  const selectQuestInSideTab = ({lat, lng}) => {
    setTabOpen(false);
    setIsDrag(true);
    setCurrentMapPosition({
      lat: lat,
      lng: lng,
    })
  }

  const moveToCenter = () => {
    setIsDrag(false);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('center move', position);
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })    
  }

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition( async (res) => {
      setCurrentMapPosition({
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      })
      const data = await getQuestList(res.coords.latitude, res.coords.longitude);
      console.log(res);
      if (data.rows.length > 0) {
        setQuestList(data.rows)
      }
      setTimeout(() => {
        setLoading(false)
      }, 200)
    });
  }, [])


  useEffect(() => {

    if (questType === "mob") { 
      setColor('#FA5A54');
    } else if (questType === "time") {
      setColor('#EDEA50');
    } else if (questType === "feed") {
      setColor('#61B7FA');
    } else {
      setColor('#EBEBEB');
    }

    if (inCircleList.length > 0) {
      setColor('#5DEB85');
    } 
  }, [inCircleList, questType])

  return (
    <Container>
      <LandingModal
        loading={loading}
      />

      <MapComponent
        questList={questList}
        questType={questType}
        currentMapPosition={currentMapPosition}
        setCurrentMapPosition={setCurrentMapPosition}
        position={position}
        setPosition={setPosition}
        cancelWatchPosition={cancelWatchPosition}
        isDrag={isDrag}
        setIsDrag={setIsDrag}
        // inCircleList={inCircleList}
      />

      <MapSideTab 
        open={tabOpen}
        setClose={closeTab}
        questList={questList}
        selectQuest={selectQuestInSideTab}
      />

      <UserInfo 
        style={questActive ? {display: "none"} : {display: "flex"}}
        onClick={()=>setTabOpen(true)}
      >
        <p><span>Lv.77</span>강윤지</p>
      </UserInfo>

      <ButtonWrapper style={questActive ? {display: "none"} : {display: "block"}}>
        <CenterButton onClick={moveToCenter}/>

        <Grid 
          flex
          justifyContent={"space-between"}
        >
          <BottomCategoryButton
            onClick={() => setQuestType("mob")}
          >
            <img/>
            <p>몬스터대전</p>
          </BottomCategoryButton>
          <BottomCategoryButton
            onClick={() => setQuestType("time")}        
          >
            <img/>
            <p>타임어택</p>
          </BottomCategoryButton>
          <BottomCategoryButton
            onClick={() => setQuestType("feed")}
          >
            <img/>
            <p>땅문서작성</p>
          </BottomCategoryButton>
          <BottomCategoryButton
            onClick={() => setQuestType("all")}
          >
            <img/>
            <p>전체리스트</p>
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
          <BottomFooterButton 
            style={{background: color}}
            onClick={setDdangDdang}
          >
            <p>땅땅 시작</p>
          </BottomFooterButton>
        </Grid>
      </ButtonWrapper>

      <QuestActivateLayer
        open={questActive}
        setClose={closeQuestActive}
        list={inCircleList}
      />
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 22%;
  height: calc(22vw - 10px);
  max-height: 80px;
  background: #fff;
  box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
  border-radius: 10px;
  & p {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.15;
  }
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

const ButtonWrapper = styled.div`
  position: absolute; 
  bottom: 0; 
  padding: 0 20px 50px; 
  z-index: 500;
  width: 100%;
`;

const CenterButton = styled.div`
  position: absolute;
  right: 30px;
  top: -50px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #000;
`;
