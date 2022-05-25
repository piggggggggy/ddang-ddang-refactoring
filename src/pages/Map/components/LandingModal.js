import { useState } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { Grid } from "../../../elements";
import { localNameHandlerForSi } from "../../../modules/help";

export default function LandingModal({ loading, region, questLength = 0 }) {
    const [landingOpen, setLandingOpen] = useState(true);

    return (
        <FixedWrapper
            style={!landingOpen ? { transform: "translateX(-100%)" } : {}}
        >
            <Title>
                <span>{region.regionDong} </span>땅먹기
            </Title>
            <Address>
                <p>
                    {localNameHandlerForSi(region.regionSi)} {region.regionGu}{" "}
                    {region.regionDong}
                </p>
            </Address>

            <Info>
                {localNameHandlerForSi(region.regionSi)}{" "}
                <span>
                    {region.regionGu} {region.regionDong}
                </span>
                에서
                <br />
                재미있는 미션이 윤지님을 기다려요
            </Info>

            <Grid
                flex
                justifyContent={"center"}
                alignItems={"center"}
                mystyles={"width: 100%; height: 300px;"}
            >
                <Circle />
            </Grid>

            <SubInfo>
                현재 <span>{questLength}개</span>의 땅을 먹을 수 있어요
            </SubInfo>

            <BottomButton
                style={{ background: loading ? "#909090" : "#5EEF87" }}
                onClick={() => {
                    if (loading) return;
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
    justify-content: center;
    transition: all 500ms ease;
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
    padding: 35px 0 40px;
    & span {
        font-weight: 700;
    }
`;

const SubInfo = styled.p`
    font-size: 16px;
    line-height: 1.15;
    color: #05240e;
    padding: 43px 0 22px;
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
    width: 293px;
    height: 293px;
  }
  50% {
    width: 200px;
    height: 200px;
  }
  100% {
    width: 293px
    height: 293px;
  }
`;

const Circle = styled.div`
    width: 293px;
    height: 293px;
    border-radius: 50%;
    background: #59e280;
    opacity: 0.1;
    animation: ${CircleMotion} 1500ms infinite ease;
`;
