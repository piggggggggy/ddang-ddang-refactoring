import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "../../../elements";
import SideTabButtons from "../elements/SideTabButtons";
import QuestListConatiner from "./QuestListContainer";

export default function MapSideTab({
    open,
    setClose,
    questList,
    selectQuest,
    userData,
    activateDetail,
}) {
    const navigate = useNavigate();

    if (userData === null) return;
    return (
        <TabWrapper
            style={
                open
                    ? { transform: "translateX(100%)" }
                    : { transform: "translateX(-100%)" }
            }
        >
            <Back onClick={setClose} />
            <TabPaper>
                <UserInfo onClick={() => navigate("/myPage")}>
                    <img src={userData.profileImg} alt={"profile"} />
                    <Grid mystyles={"width: auto; padding-left: 13px;"}>
                        <UserText>
                            <span>Lv.{userData.level}</span>
                            {userData.nickname}
                        </UserText>
                        <Grid
                            mystyles={
                                "position: relative; width: 100px; height: 5px; background: #D7D7D7;margin-top: 8px;"
                            }
                        >
                            <LevelProgressBar
                                style={{ width: `${userData.expPoints}%` }}
                            />
                        </Grid>
                    </Grid>
                </UserInfo>

                <SideTabButtons />

                <Grid
                    mystyles={"height: calc(100% - 144px); overflow: scroll; "}
                >
                    <QuestListConatiner
                        title={"완료한 퀘스트"}
                        list={questList.filter(
                            (item) => item.completed === true
                        )}
                        selectQuest={selectQuest}
                        activateDetail={activateDetail}
                    />

                    <QuestListConatiner
                        title={"진행 중인 퀘스트"}
                        list={questList.filter(
                            (item) => item.completed === false
                        )}
                        selectQuest={selectQuest}
                        activateDetail={activateDetail}
                    />
                </Grid>
            </TabPaper>
        </TabWrapper>
    );
}
const TabWrapper = styled.div`
    position: fixed;
    left: -100%;
    top: 0;
    z-index: 800;
    width: 100vw;
    height: 100vh;
    transition: all 300ms ease;
`;

const TabPaper = styled.div`
    position: relative;
    z-index: 802;
    width: 280px;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    padding: 45px 24px;
`;

const Back = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 801;
    width: 100vw;
    height: 100vh;
`;
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    padding: 0 23px;
    & img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #999fab;
    }
`;
const UserText = styled.p`
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
    & span {
        color: #266137;
        margin-right: 6px;
    }
`;
const LevelProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100px;
    height: 5px;
    background: #5deb85;
`;
