import { useState } from "react";
import styled from "styled-components";
import { questFragment } from "../../../modules/fragment";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";

export default function TimePaper({ type, questId }) {
    // const [progress, setProgress] = useState(0);

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
            <ContentWrapper>
                <ImgBox>
                    <img src={fragment.img} alt={"time"} />
                </ImgBox>
                <QuestPaperBottomButton
                    text={"체크인 하기"}
                    color={fragment.subColor}
                    onClick={() => {}}
                    isOn={true}
                />
            </ContentWrapper>
            {/* <DotContainer>
                {Array.from({ length: type === "mob" ? 4 : 2 }, () => 0).map(
                    (item, index) => (
                        <Dot
                            style={
                                progress === index ? { background: "#fff" } : {}
                            }
                        />
                    )
                )}
            </DotContainer> */}
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

const ContentWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
`;

const ImgBox = styled.div`
    width: 200px;
    height: 200px;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
