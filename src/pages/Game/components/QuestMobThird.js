import { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "../../../elements";
import { questFragment } from "../../../modules/fragment";
import { keyframes } from "styled-components";
import RockScissorsPaperItem from "../elements/RockScissorsPaperItem";

export default function QuestMobThird({
    setProgress,
    progress,
    RSPIndex,
    result,
    setResult,
}) {
    const [ready, setReady] = useState(true);
    const [randomIndex, setRandonIndex] = useState(
        Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0))) +
            Math.ceil(0)
    );
    const list = [
        {
            text: "가위",
            img: "",
        },
        {
            text: "바위",
            img: "",
        },
        {
            text: "보",
            img: "",
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setReady(false);
        }, 2500);
        setTimeout(() => {
            setProgress(3);
        }, 6000);

        if (randomIndex === RSPIndex) {
            setResult("Draw");
        } else if (randomIndex === 0) {
            if (RSPIndex === 1) setResult("Win");
            else if (RSPIndex === 2) setResult("Lose");
        } else if (randomIndex === 1) {
            if (RSPIndex === 0) setResult("Lose");
            else if (RSPIndex === 2) setResult("Win");
        } else if (randomIndex === 2) {
            if (RSPIndex === 0) setResult("Win");
            else if (RSPIndex === 1) setResult("Lose");
        }
    }, []);

    return (
        <Grid
            flex
            direction={"column"}
            justifyContent={"center"}
            mystyles={"position: relative; height: 100%; width: 100%;"}
        >
            {ready ? (
                <TextWrapper>
                    <Text1>가위</Text1>
                    <Text2>바위</Text2>
                    <Text3>보</Text3>
                </TextWrapper>
            ) : (
                <>
                    <MobRAPItem>
                        <RockScissorsPaperItem
                            text={list[randomIndex].text}
                            reverse
                            isResult
                        />
                    </MobRAPItem>
                    <MyRAPItem>
                        <RockScissorsPaperItem
                            text={list[RSPIndex].text}
                            isSelected
                            isResult
                        />
                    </MyRAPItem>
                    <ResultText>
                        <p>{result}</p>
                        <div />
                    </ResultText>
                </>
            )}

            <LeftSideFakeBar />
            <RightSideFakeBar />
        </Grid>
    );
}
const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;
const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const TextWrapper = styled.div`
    animation: ${FadeOut} 500ms 4000ms forwards ease;
`;
const Text1 = styled.div`
    width: 100%;
    font-size: 40px;
    line-height: 1.15;
    text-align: center;
    font-weight: 700;
    color: #273938;
    opacity: 0;
    animation: ${FadeIn} 1000ms 300ms forwards ease;
`;

const Text2 = styled.div`
    width: 100%;
    font-size: 40px;
    line-height: 1.15;
    text-align: center;
    font-weight: 700;
    color: #273938;
    opacity: 0;
    animation: ${FadeIn} 1000ms 800ms forwards ease;
`;

const Text3 = styled.div`
    width: 100%;
    font-size: 40px;
    line-height: 1.15;
    text-align: center;
    font-weight: 700;
    color: #273938;
    opacity: 0;
    animation: ${FadeIn} 1000ms 1300ms forwards ease;
`;

const LeftSideFakeBar = styled.div`
    position: absolute;
    top: 0;
    left: -50px;
    z-index: 1001;
    width: 50px;
    height: 100%;
    background: #eb6042;
`;
const RightSideFakeBar = styled.div`
    position: absolute;
    top: 0;
    right: -50px;
    z-index: 1001;
    width: 50px;
    height: 100%;
    background: #eb6042;
`;
const SlideLeft = keyframes`
  0% {
    left: -400px;
  }
  20% {
    left: -400px;
  }
  100% {
    left: -10px;
  }
`;
const SlideRight = keyframes`
  0% {
    right: -400px;
  }
  20% {
    right: -400px;
  }
  100% {
    right: -10px;
  }
`;
const Result = keyframes`
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;
const MobRAPItem = styled.div`
    position: absolute;
    top: 10%;
    left: -400px;
    z-index: 900;
    width: calc(100% - 60px);
    animation: ${SlideLeft} 1s 300ms forwards ease;
`;
const MyRAPItem = styled.div`
    position: absolute;
    top: calc(10% + 140px);
    right: -400px;
    z-index: 900;
    width: calc(100% - 60px);
    animation: ${SlideRight} 1s 300ms forwards ease;
`;
const ResultText = styled.div`
    position: absolute;
    top: calc(10% + 300px);
    left: calc(50% - 60px);
    width: 120px;
    opacity: 0;
    animation: ${Result} 1200ms 1800ms forwards ease;
    & p {
        width: 100%;
        font-size: 40px;
        font-weight: 700;
        line-height: 1.15;
        text-align: center;
        color: #eb6042;
    }
    & div {
        width: 90%;
        height: 4px;
        background: #eb6042;
        margin: auto;
    }
`;
