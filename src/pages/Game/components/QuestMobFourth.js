import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postQuest } from "../../../services/quest.service";
import { Grid } from "../../../elements";
import { questFragment } from "../../../modules/fragment";
import QuestPaperBottomButton from "../elements/QuestPaperBottomButton";
import RockScissorsPaperItem from "../elements/RockScissorsPaperItem";
import CompleteModal from "./CompleteModal";
import Bubble from "../../../assets/images/png/mob-bubble-small.png";
import MobLarge from "../../../assets/images/png/mob-large.png";
import MobLargeDimmed from "../../../assets/images/png/mob-large-dimmed.png";
import WinCardMob from "../../../assets/images/png/mob-win.png";
import { setCookieDay } from "../../../shared/utils";

export default function QuestMobFourth({
    setProgress,
    progress,
    setRSPIndex,
    result,
    questId,
    tryCount,
    setTryCount,
}) {
    const navigate = useNavigate();
    const fragment = questFragment("mob");
    const [popupOpen, setPopupOpen] = useState(false);

    const setConfirm = () => {
        if (result === "Win") {
            setPopupOpen(true);
        } else if (result === "draw") {
            if (tryCount >= 2) {
                navigate(-1);
            } else {
                setTryCount((prev) => prev + 1);
                setRSPIndex(null);
                setProgress(1);
            }
        } else {
            setCookieDay("mobCheck", questId);
            navigate(-1);
        }
    };

    const completeQuest = async (type) => {
        try {
            const data = await postQuest({
                request: {},
                type: "mob",
                questId: questId,
            });
            if (data.ok) {
                if (type === "point") {
                    navigate("/myPage");
                } else {
                    navigate(-1);
                }
            }
        } catch {
            navigate(-1);
        }
    };

    const resultHandler = (() => {
        switch (result) {
            case "Draw":
                return {
                    text: "다음에 다시 와!",
                    title: "You LOSE",
                    buttonText:
                        tryCount === 2 ? (
                            "내일 다시 도전하세요!"
                        ) : (
                            <>
                                다시 도전하기 <span>최대 2번</span>
                            </>
                        ),
                    img: MobLarge,
                };
            case "Lose":
                return {
                    text: "다음에 다시 와!",
                    title: "You LOSE",
                    buttonText: "내일 다시 도전하세요!",
                    img: MobLarge,
                };
            case "Win":
                return {
                    text: "내가 졌다...",
                    title: "You WIN",
                    buttonText: "포인트 받기",
                    img: MobLargeDimmed,
                };
            default:
                return {
                    text: "다음에 다시 와!",
                    title: "You LOSE",
                    buttonText: "내일 다시 도전하세요!",
                    img: MobLarge,
                };
        }
    })();

    return (
        <Grid
            flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mystyles={
                "position: relative; height: 100%; width: 100%; padding: 40px 0 20px"
            }
        >
            {result === "Win" && (
                <WinCard>
                    <img src={WinCardMob} alt={"card"} />
                </WinCard>
            )}
            <Title>{resultHandler.title}</Title>
            <Baloon>
                <p>{resultHandler.text}</p>
                <img src={Bubble} alt={"bubble"} />
            </Baloon>
            <MobImg>
                <img src={resultHandler.img} alt={"mob"} />
            </MobImg>

            <CompleteModal
                open={popupOpen}
                setComfirm={completeQuest}
                type={"mob"}
            />
            <QuestPaperBottomButton
                text={resultHandler.buttonText}
                color={fragment.subColor}
                onClick={setConfirm}
                isOn={true}
            />
        </Grid>
    );
}

const WinCard = styled.div`
    width: 190px;
    height: 52px;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const Title = styled.div`
    width: 100%;
    font-size: 40px;
    line-height: 1.15;
    text-align: center;
    font-weight: 500;
    color: #eb6042;
    text-align: center;
`;

const Baloon = styled.div`
    position: relative;
    width: 200px;
    height: 58px;
    & p {
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 10;
        width: 100%;
        font-size: 16px;
        line-height: 1.15;
        text-align: center;
        color: #273938;
        text-align: center;
    }
    & img {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const MobImg = styled.div`
    width: 160px;
    height: 160px;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
