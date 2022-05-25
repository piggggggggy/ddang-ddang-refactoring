import styled from "styled-components";
import { Grid } from "../../../elements";
import { questFragment } from "../../../modules/fragment";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";

export default function QuestMobFirst({ setProgress, progress }) {
    const fragment = questFragment("mob");

    return (
        <Grid
            flex
            container
            justifyContent={"center"}
            alignItems={"center"}
            mystyles={"position: relative; height: 100%; width: 100%;"}
        >
            <Content>
                <span>가위바위보</span> 라고 아니?
                <br />
                나랑 게임해서 이기면
                <br />
                <span>포인트</span>와 <span>점령 도장</span>을 줄게
                <br />
                <br />
                단, 무조건 <span>한 판에 이겨야 해!</span>
                <br />
                비기는 것도 지는 거야
            </Content>

            <QuestPaperBottomButton
                text={"시작하기"}
                color={fragment.subColor}
                onClick={() => setProgress(1)}
            />
        </Grid>
    );
}

const Content = styled.div`
    font-size: 14px;
    line-height: 1.15;
    text-align: center;
    & span {
        font-weight: 700;
    }
`;
