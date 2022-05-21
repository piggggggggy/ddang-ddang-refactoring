import styled from 'styled-components';
import { MapMarker } from "react-kakao-maps-sdk";
import KakaoMapDefault from '../../../components/KakaoMapDefault';
import { useNavigate } from 'react-router-dom';

export default function MainMapContainer({ type, questList }) {
  const navigate = useNavigate();

  const minmapFragment = (() => {
    switch (type) {
      case "all": 
        return {
          text: "내 땅 점령하기",
          color: "#266137",
        }
      case "mob":
        return {
          text: "몬스터 대전하러 가기",
          color: "#EB6042",
        }
      case "time":
        return {
          text: "타임어택하러 가기",
          color: "#61B7FA",
        }
      case "feed":
        return {
          text: "내 땅 점령하기",
          color: "#266137",
        }
      default:
        return {
          text: "내 땅 점령하기",
          color: "#266137",
        }
    }
  })()

  return (
    <MapWrapper>
      <KakaoMapDefault>
        {type === "all" ? (
          questList.map(item => {
            return (
              <MapMarker 
                key={item.questId} 
                position={{lat: item.lat, lng: item.lng}}
              />
            )
          })
        ) : (
          questList.map(item => {
            if (type === item.type) {
              return (
                <MapMarker 
                  key={item.questId} 
                  position={{lat: item.lat, lng: item.lng}}
                />
              )
            }
          })
        ) }
      </KakaoMapDefault>
      <MapFooter 
        style={{background: minmapFragment.color}}
        onClick={() => navigate("/quest")}
      >
        <p>{minmapFragment.text}</p>
      </MapFooter>
    </MapWrapper>
  )
}

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 35px;
  background: #fff;
  box-shadow: 1px 1px 1px 2px rgba(137, 142, 139, 0.05);
`

const MapFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 48px;
  background: #266137;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
    color: #fff;
  }
`;