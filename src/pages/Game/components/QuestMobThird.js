import { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "../../../elements";
import { questFragment } from "../../../modules/fragment";
import { keyframes } from "styled-components";

export default function QuestMobThird({ setProgress, progress, RSPIndex }) {
  const [ready, setReady] = useState(true);
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }
  const list = [
    {
      text: "가위",
      img:'',
    },
    {
      text: "바위",
      img:'',
    },
    {
      text: "보",
      img:'',
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setReady(false);
    }, 5000 )
  }, [])

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
        <></>
      )}

    </Grid>
  )
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
  animation: ${FadeIn} 2s 500ms forwards ease;
`;

const Text2 = styled.div`
  width: 100%;
  font-size: 40px;
  line-height: 1.15;
  text-align: center;
  font-weight: 700;
  color: #273938;
  opacity: 0;
  animation: ${FadeIn} 2s 1500ms forwards ease;
`;

const Text3 = styled.div`
  width: 100%;
  font-size: 40px;
  line-height: 1.15;
  text-align: center;
  font-weight: 700;
  color: #273938;
  opacity: 0;
  animation: ${FadeIn} 2s 2500ms forwards ease;
`;

const MobRAPItem = styled.div`

`;
const MyRAPItem = styled.div`

`;
