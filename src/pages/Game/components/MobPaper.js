import { useState } from "react";
import styled from "styled-components";
import { questFragment } from "../../../modules/fragment";
import QuestMobFirst from "./QuestMobFirst";
import QuestMobFourth from "./QuestMobFourth";
import QuestMobSecond from "./QuestMobSecond";
import QuestMobThird from "./QuestMobThird";

export default function MobPaper({ type, questId }) {
    const [progress, setProgress] = useState(0);
    const [RSPIndex, setRSPIndex] = useState(null);
    const [result, setResult] = useState("");
    const [tryCount, setTryCount] = useState(0);

    const fragment = questFragment(type);

    const Dot = styled.div`
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin: 0 8px;
        background: ${fragment.subColor};
    `;
    return (
        <Paper>
            {progress === 0 && (
                <QuestMobFirst progress={progress} setProgress={setProgress} />
            )}
            {progress === 1 && (
                <QuestMobSecond
                    progress={progress}
                    setProgress={setProgress}
                    RSPIndex={RSPIndex}
                    setRSPIndex={setRSPIndex}
                />
            )}
            {progress === 2 && (
                <QuestMobThird
                    progress={progress}
                    setProgress={setProgress}
                    RSPIndex={RSPIndex}
                    result={result}
                    setResult={setResult}
                />
            )}
            {progress === 3 && (
                <QuestMobFourth
                    progress={progress}
                    setProgress={setProgress}
                    setRSPIndex={setRSPIndex}
                    result={result}
                    questId={questId}
                    tryCount={tryCount}
                    setTryCount={setTryCount}
                />
            )}

            <DotContainer>
                {Array.from({ length: type === "mob" ? 4 : 2 }, () => 0).map(
                    (item, index) => (
                        <Dot
                            key={`key-${index}`}
                            style={
                                progress === index ? { background: "#fff" } : {}
                            }
                        />
                    )
                )}
            </DotContainer>
        </Paper>
    );
}

const Paper = styled.div`
    position: relative;
    width: 90%;
    height: 70%;
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
`;

const DotContainer = styled.div`
    position: absolute;
    bottom: -5%;
    width: 100%;
    display: flex;
    justify-content: center;
`;
