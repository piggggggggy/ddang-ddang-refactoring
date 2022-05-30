import styled from "styled-components";
import { Grid } from "../../../elements";
import { questFragment } from "../../../modules/fragment";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";
import Bubble from "../../../assets/images/png/mob-bubble.png";
import Mob from "../../../assets/images/png/mob-group.png";

export default function QuestMobFirst({ setProgress, progress }) {
    const fragment = questFragment("mob");

    return (
        <Grid
            flex
            container
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mystyles={
                "position: relative; height: 100%; width: 100%; padding: 20px 0"
            }
        >
            <Content>
                <p>
                    나랑 게임해서 이기면
                    <br />
                    <span>포인트</span>와 <span>점령 도장</span>을 줄게
                    <br />
                    <br />
                    단, 무조건 <span>한 판에 이겨야 해!</span>
                    <br />
                    비기는 것도 지는 거야
                </p>
                <img src={Bubble} alt={"bubble"} />
            </Content>
            <MobGroup>
                <img src={Mob} alt={"mob"} />
            </MobGroup>

            <QuestPaperBottomButton
                text={"시작하기"}
                color={fragment.subColor}
                onClick={() => setProgress(1)}
                isOn={true}
            />
        </Grid>
    );
}

const Content = styled.div`
    position: relative;
    width: 220px;
    height: 160px;
    & p {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        font-size: 14px;
        line-height: 1.15;
        text-align: center;
        padding-top: 20px;
        & span {
            font-weight: 700;
        }
    }
    & img {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const MobGroup = styled.div`
    height: calc(100% - 220px);
    & img {
        height: 100%;
        object-fit: contain;
    }
`;
