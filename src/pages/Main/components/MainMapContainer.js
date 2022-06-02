import styled from "styled-components";
import { MapMarker } from "react-kakao-maps-sdk";
import KakaoMapDefault from "../../../components/KakaoMapDefault";
import { useNavigate } from "react-router-dom";
import { questFragment } from "../../../modules/fragment";

export default function MainMapContainer({
    type,
    questList,
    location,
    setLocation,
}) {
    const navigate = useNavigate();

    const minmapFragment = (() => {
        switch (type) {
            case "all":
                return {
                    text: "내 땅 점령하기",
                    color: "#266137",
                };
            case "mob":
                return {
                    text: "몬스터 대전하러 가기",
                    color: "#EB6042",
                };
            case "time":
                return {
                    text: "타임어택하러 가기",
                    color: "#EDEA50",
                };
            case "feed":
                return {
                    text: "땅문서 작성하기",
                    color: "#61B7FA",
                };
            default:
                return {
                    text: "내 땅 점령하기",
                    color: "#266137",
                };
        }
    })();

    return (
        <MapWrapper>
            <KakaoMapDefault location={location} setLocation={setLocation}>
                {type === "all"
                    ? questList.map((item) => {
                          return (
                              <MapMarker
                                  key={item.questId}
                                  position={{ lat: item.lat, lng: item.lng }}
                                  image={{
                                      src: questFragment(item.type).icon,
                                      size: {
                                          width: 14,
                                          height: 14,
                                      },
                                  }}
                              />
                          );
                      })
                    : questList.map((item) => {
                          if (type === item.type) {
                              return (
                                  <MapMarker
                                      key={item.questId}
                                      position={{
                                          lat: item.lat,
                                          lng: item.lng,
                                      }}
                                      image={{
                                          src: questFragment(item.type).icon,
                                          size: {
                                              width: 14,
                                              height: 14,
                                          },
                                      }}
                                  />
                              );
                          }
                      })}
            </KakaoMapDefault>
            <MapFooter
                style={{ background: minmapFragment.color }}
                onClick={() => navigate("/quest")}
            >
                <p>{minmapFragment.text}</p>
            </MapFooter>
        </MapWrapper>
    );
}

const MapWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 240px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 35px;
    background: #fff;
    box-shadow: 1px 1px 1px 2px rgba(137, 142, 139, 0.05);
`;

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
    border-radius: 0 0 8px 8px;
    & p {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        text-align: center;
        color: #fff;
    }
`;
