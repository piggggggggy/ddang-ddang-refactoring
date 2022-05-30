import styled, { keyframes } from "styled-components";
import { Grid } from "../elements";
import Area from "../assets/images/png/area-landonly.png";

export default function Spinner() {
    return (
        <Wrapper>
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
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    max-width: 428px;
    height: 100vh;
    z-index: 10000;
    background: #0000006c;
    display: flex;
    justify-content: center;
    align-items: center;
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
    top: calc(50% - 71px);
    left: calc(50% - 68.5px);
    width: 142px;
    height: 137px;
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
