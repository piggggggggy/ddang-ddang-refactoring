import { useState } from "react";
import styled from "styled-components";
import { Grid } from "../../../elements";
import { questFragment, RSPFragmentList } from "../../../modules/fragment";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";
import RockScissorsPaperItem from "../elements/RockScissorsPaperItem";

export default function QuestMobSecond({
    setProgress,
    progress,
    RSPIndex,
    setRSPIndex,
}) {
    const fragment = questFragment("mob");

    return (
        <Grid
            mystyles={
                "position: relative; height: 100%; width: 100%; padding: 20px 0 20px"
            }
        >
            {RSPFragmentList.map((item, index) => (
                <RockScissorsPaperItem
                    key={item.text}
                    text={item.text}
                    img={item.activeImg}
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
