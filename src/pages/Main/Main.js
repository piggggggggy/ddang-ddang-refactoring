import { Container, Grid } from "../../elements/index";
import styled from "styled-components";
import UserInfoContainer from "./components/UserInfoContainer";
import QuestButtonContainer from "./components/QuestButtonContainer";
import LocalQuestSummary from "./components/LocalQuestSummary";
import MainMapContainer from "./components/MainMapContainer";
import Navigation from "../../components/Navigation";
import { useState } from "react";
import { useMainData } from "./hooks/MainHooks";
import { localNameHandlerForSi } from "../../modules/help";
import MenuIcon from "../../assets/images/icon/MenuIcon";
import Location from "../../assets/images/icon/Location";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const navigate = useNavigate();
    const { questList, loading, questType, setQuestType, location, region } =
        useMainData();

    return (
        <Container>
            {loading && <Spinner />}
            <BackgroundPaper />

            <Grid
                mystyles={"position: relative; z-index: 100; padding: 0 30px;"}
            >
                <Grid
                    mystyles={
                        "position: absolute; top: 52px; left: 30px; width: 24px; height: 18px"
                    }
                    // onClick={() => navigate("/quest?open=side")}
                >
                    <MenuIcon size={"medium"} />
                </Grid>
                <Address>
                    <Location />
                    {localNameHandlerForSi(region.regionSi)} {region.regionGu}{" "}
                    {region.regionDong}
                </Address>
                <UserInfoContainer region={region} loading={loading} />

                <MainMapContainer type={questType} questList={questList} />

                <QuestButtonContainer setType={setQuestType} />
            </Grid>

            <LocalQuestSummary
                region={region}
                questList={questList}
                location={location}
            />

            <Navigation />
        </Container>
    );
}

const BackgroundPaper = styled.div`
    position: absolute;
    top: -928px;
    left: calc(50% - 750px);
    z-index: 0;
    width: 1500px;
    height: 1500px;
    background: linear-gradient(
        169.59deg,
        #58e07e 4.25%,
        #61f88c 50.84%,
        #58e07e 99.4%
    );
    border-radius: 50%;
`;
const Address = styled.p`
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
    color: #fff;
    padding: 50px 0 30px;
`;
