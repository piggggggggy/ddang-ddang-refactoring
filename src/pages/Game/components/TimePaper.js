import { useState } from "react";
import styled from "styled-components";
import { questFragment } from "../../../modules/fragment";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";
import QueryString from "qs";
import Timer from "./Timer";
import FailModal from "./FailModal";
import { useNavigate } from "react-router-dom";
import { postQuest } from "../../../services/quest.service";
import CompleteModal from "./CompleteModal";

export default function TimePaper({ type, questId }) {
    const navigate = useNavigate();
    const [failModalOpen, setFailModalOpen] = useState(false);
    const [completeModalOpen, setCompleteModalOpen] = useState(false);
    const time = QueryString.parse(window.location.search, {
        ignoreQueryPrefix: true,
    }).time;
    const fragment = questFragment(type);
    const submitFeed = async () => {
        try {
            const data = await postQuest({
                request: {},
                questId,
                type,
            });
            console.log(data);
            if (data.ok) {
                setCompleteModalOpen(true);
            }
        } catch {
            navigate(-1);
        }
    };

    const completeQuest = (type) => {
        if (type === "point") {
            navigate("/myPage");
        } else {
            navigate(-1);
        }
    };
    return (
        <Paper>
            <ContentWrapper>
                <ImgBox>
                    <img src={fragment.img} alt={"time"} />
                </ImgBox>
                <Timer
                    time={time}
                    openFailModal={() => setFailModalOpen(true)}
                />
                <QuestPaperBottomButton
                    text={"체크인 하기"}
                    color={fragment.subColor}
                    onClick={submitFeed}
                    isOn={true}
                />
            </ContentWrapper>
            <FailModal
                open={failModalOpen}
                setComfirm={() => navigate(-1)}
                type={"time"}
                title={"시간이 지났어요!"}
            />
            <CompleteModal
                open={completeModalOpen}
                setComfirm={completeQuest}
                type={"time"}
            />
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
