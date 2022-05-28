import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid, Text } from "../../../elements";
import SideTabButtons from "../../Map/elements/SideTabButtons";
import QuestListConatiner from "../../Map/components/QuestListContainer";

export default function MapSideTab({ open, setClose, userData }) {
    const navigate = useNavigate();
    console.log(userData);
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
                    <img src={userData.profile[0].profileImg} alt={"profile"} />
                    <Grid mystyles={"width: auto; padding-left: 13px;"}>
                        <UserText>
                            <span>Lv.{userData.profile[0].level}</span>
                            {userData.profile[0].nickname}
                        </UserText>
                        <Grid
                            mystyles={
                                "position: relative; width: 100px; height: 5px; background: #D7D7D7;margin-top: 8px;"
                            }
                        >
                            <LevelProgressBar
                                style={{ width: userData.profile[0].expPoints }}
                            />
                        </Grid>
                    </Grid>
                </UserInfo>

                <SideTabButtons />

                <Grid
                    mystyles={"height: calc(100% - 144px); overflow: scroll; "}
                >
                    <Grid mystyles="margin-left: 30px; border-bottom: 1px solid rgba(39, 57, 56, 0.1); width: 85%; padding: 10px;">
                        <Text mystyles="font-weight: 700; font-size: 12px;">
                            홈
                        </Text>
                    </Grid>
                    <Grid mystyles="margin-left: 30px; border-bottom: 1px solid rgba(39, 57, 56, 0.1); width: 85%; padding: 10px;">
                        <Text mystyles="font-weight: 700; font-size: 12px;">
                            랭킹
                        </Text>
                    </Grid>
                    <Grid mystyles="margin-left: 30px; border-bottom: 1px solid rgba(39, 57, 56, 0.1); width: 85%; padding: 10px;">
                        <Text mystyles="font-weight: 700; font-size: 12px;">
                            퀘스트
                        </Text>
                    </Grid>
                    <Grid mystyles="margin-left: 30px; border-bottom: 1px solid rgba(39, 57, 56, 0.1); width: 85%; padding: 10px;">
                        <Text mystyles="font-weight: 700; font-size: 12px;">
                            동네
                        </Text>
                    </Grid>
                    <Grid mystyles="margin-left: 30px; border-bottom: 1px solid rgba(39, 57, 56, 0.1); width: 85%; padding: 10px;">
                        <Text mystyles="font-weight: 700; font-size: 12px;">
                            My
                        </Text>
                    </Grid>
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
    background: white;
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
