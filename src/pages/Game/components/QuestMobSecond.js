import { useState } from "react";
import styled from "styled-components";
import { Grid } from "../../../elements";
import { questFragment } from "../../../modules/fragment";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";
import RockScissorsPaperItem from "../elements/RockScissorsPaperItem";

export default function QuestMobSecond({
    setProgress,
    progress,
    RSPIndex,
    setRSPIndex,
}) {
    const fragment = questFragment("mob");
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

    return (
        <Grid
            mystyles={
                "position: relative; height: 100%; width: 100%; padding: 20px 0 20px"
            }
        >
            {list.map((item, index) => (
                <RockScissorsPaperItem
                    key={item.text}
                    text={item.text}
                    isSelected={RSPIndex === index || RSPIndex === null}
                    onClick={() => setRSPIndex(index)}
                />
            ))}

            <QuestPaperBottomButton
                text={"선택하기"}
                color={fragment.subColor}
                onClick={() => {
                    if (RSPIndex === null) return;
                    setProgress(2);
                }}
                isOn={RSPIndex !== null}
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
