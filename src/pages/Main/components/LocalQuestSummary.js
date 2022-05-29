import { Grid } from "../../../elements/index";
import styled from "styled-components";
import QuestItemForCarousel from "../elements/QuestItemForCarousel";
import QuestListContainer from "./QuestListContainer";
import { useNavigate } from "react-router-dom";
import { getUpdatedDistance } from "../../../modules/location";

export default function LocalQuestSummary({
    questList,
    location,
    isQuestPage,
    region,
}) {
    const navigate = useNavigate();
    const moveToQusetPage = () => {
        navigate("/quest");
    };
    // console.log(location);

    return (
        <Grid
            mystyles={
                isQuestPage
                    ? "padding: 65px 0 100px;"
                    : "padding-bottom: 200px;"
            }
        >
            <Title>
                지금 <span>{region.regionDong}</span> 퀘스트
            </Title>

            <Grid mystyles={"width: 100%; max-width: 100%;"}>
                <Carousel>
                    {questList.map((item, index) => {
                        // if (!isQuestPage && index > 9) return;
                        return (
                            <QuestItemForCarousel
                                key={item.id}
                                {...item}
                                location={location}
                            />
                        );
                    })}
                    {!isQuestPage && (
                        <MoreButton onClick={moveToQusetPage}>
                            <p>더 보기</p>
                        </MoreButton>
                    )}
                </Carousel>
            </Grid>

            <Grid mystyles={"padding: 34px 30px 39px"}>
                <QuestListContainer
                    questList={questList}
                    isQuestPage={isQuestPage}
                    moveToQusetPage={moveToQusetPage}
                />
            </Grid>
        </Grid>
    );
}

const Title = styled.p`
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
    padding: 0 34px;
    margin-bottom: 22px;
    & span {
        color: #266137;
    }
`;

const Carousel = styled.div`
    display: flex;
    align-items: center;
    overflow-x: scroll;
    max-width: 592px;
    padding: 20px 0 0;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const MoreButton = styled.div`
    width: 100px;
    min-width: 100px;
    height: 106px;
    margin: 0px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    & p {
        font-size: 20px;
        font-weight: 700;
    }
`;
