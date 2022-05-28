import { useState } from "react";
import styled from "styled-components";
import { questFragment } from "../../../modules/fragment";
import FeedInput from "../elements/FeedInput";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";
import { Grid } from "../../../elements";
import { postFeed, postQuest } from "../../../services/quest.service";

export default function FeedPaper({ type, questId }) {
    // const [progress, setProgress] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [text, setText] = useState("");
    const textHandler = (e) => {
        setText(e.target.value);
    };
    const fragment = questFragment(type);

    const submitFeed = async () => {
        if (text.length < 20) return;
        const request = {
            content: text,
            img: [""],
        };
        const data = await postQuest({
            request,
            questId,
            type,
        });
        console.log(data);
    };

    return (
        <Paper>
            <ContentWrapper>
                <Grid mystyles={"padding: 30px"}>
                    <FeedInput
                        text={"이 곳에 대해 후기를 남긴다면?"}
                        placeholder={
                            "최소 20자 이상 작성해주세요 \n이 곳에 처음 오시는 분들도 알 수 있도록 설명을 붙여주시면 더욱 좋아요"
                        }
                        value={text}
                        valueHandler={textHandler}
                    />
                </Grid>
                <QuestPaperBottomButton
                    text={"작성하기"}
                    color={fragment.subColor}
                    onClick={submitFeed}
                    isOn={text.length >= 20}
                />
            </ContentWrapper>
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
