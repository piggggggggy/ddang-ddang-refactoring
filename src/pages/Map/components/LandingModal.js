import { useEffect, useState } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { Grid } from "../../../elements";
import { localNameHandlerForSi } from "../../../modules/help";
import Area from "../../../assets/images/png/area.png";
import { useSelector } from "react-redux";
import { setDataToSessionStorage } from "../../../shared/utils";
export default function LandingModal({
    loading,
    region,
    questLength = 0,
    userData,
}) {
    const [landingOpen, setLandingOpen] = useState(false);
    const regions = useSelector((state) => state.quest.region);

    useEffect(() => {
        const landingCheck = sessionStorage.getItem("landingCheck");
        if (!landingCheck) {
            setLandingOpen(true);
        }
    }, []);
    return (
        <FixedWrapper
            style={!landingOpen ? { transform: "translateX(-100%)" } : {}}
        >
            <Title>
                <span>
                    {regions.regionDong === ""
                        ? region.regionDong
                        : regions.regionDong}{" "}
                </span>
                땅먹기
            </Title>
            <Address>
                <p>
                    {localNameHandlerForSi(
                        regions.regionSi === ""
                            ? region.regionSi
                            : regions.regionSi
                    )}{" "}
                    {regions.regionGu === ""
                        ? region.regionGu
                        : regions.regionGu}{" "}
                    {regions.regionDong === ""
                        ? region.regionDong
                        : regions.regionDong}
                </p>
            </Address>

            <Info>
                {localNameHandlerForSi(
                    regions.regionSi === "" ? region.regionSi : regions.regionSi
                )}{" "}
                <span>
                    {regions.regionGu === ""
                        ? region.regionGu
                        : regions.regionGu}{" "}
                    {regions.regionDong === ""
                        ? region.regionDong
                        : regions.regionDong}
                </span>
                에서
                <br />
                재미있는 미션이 {userData === null ? "땅땅" : userData.nickname}
                님을 기다려요
            </Info>

            <Grid
                flex
                justifyContent={"center"}
                alignItems={"center"}
                mystyles={
                    "position: relative; width: 80vw; height: 64vw; max-width: 340px; max-height: 275px; min-height: 220px"
                }
            >
                <MapImg src={Area} />
                <Circle />
            </Grid>

            <SubInfo>
                현재 <span>{questLength}개</span>의 땅을 먹을 수 있어요
            </SubInfo>

            <BottomButton
                style={{ background: loading ? "#909090" : "#5EEF87" }}
                onClick={() => {
                    if (loading) return;
                    setDataToSessionStorage("landingCheck", 1);
                    setLandingOpen(false);
                }}
            >
                <p>{loading ? "땅 불러오는 중..." : "시작하기"}</p>
            </BottomButton>
        </FixedWrapper>
    );
}

const FixedWrapper = styled.div`
    position: fixed;
    width: 100vw;
    max-width: 428px;
    height: 100vh;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    transition: all 300ms ease;
    padding: 30px 0;
`;

const Title = styled.p`
    font-size: 40px;
    font-weight: 700;
    line-height: 1.15;
    padding-bottom: 13px;
    & span {
        color: #5eef87;
    }
`;
const Address = styled.div`
    width: 280px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    & p {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        color: #05240e;
    }
`;
const Info = styled.p`
    font-size: 14px;
    line-height: 1.3;
    color: #05240e;
    /* padding: 35px 0 40px; */
    & span {
        font-weight: 700;
    }
`;

const SubInfo = styled.p`
    font-size: 16px;
    line-height: 1.15;
    color: #05240e;
    /* padding: 43px 0 22px; */
    & span {
        font-weight: 700;
    }
`;

const BottomButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 272px;
    height: 45px;
    border-radius: 120px;
    /* background: #59E280; */
    & p {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        color: #05240e;
    }
`;

const CircleMotion = keyframes`
  0% {
    width: 64vw;
    height: 64vw;
  }
  50% {
    width: 48vw;
    height: 48vw;
  }
  100% {
    width: 64vw;
    height: 64vw;
  }
`;
const MapImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const Circle = styled.div`
    position: relative;

    width: 64vw;
    max-width: 275px;
    height: 64vw;
    max-height: 275px;
    border-radius: 50%;
    background: #59e280;
    opacity: 0.1;
    animation: ${CircleMotion} 1500ms infinite ease;
`;
