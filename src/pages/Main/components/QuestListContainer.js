import { Grid } from "../../../elements/index";
import styled from "styled-components";
import { useState } from "react";
import QuestItemForList from "../elements/QuestItemForList";

export default function QuestListContainer({
    questList,
    isQuestPage,
    moveToQusetPage,
}) {
    const [tabIndex, setTabIndex] = useState(0);
    let count = 0;
    const tabList = [
        {
            name: "전체",
            color: "#999fAB",
            type: "all",
        },
        {
            name: "몬스터",
            color: "#EB6042",
            type: "mob",
        },
        {
            name: "타임어택",
            color: "#61B7FA",
            type: "time",
        },
        {
            name: "땅문서",
            color: "#EDEA50",
            type: "feed",
        },
    ];

    return (
        <Grid>
            <Grid
                flex
                justifyContent={"space-between"}
                alignItems={"center"}
                mystyles={"margin-bottom: 20px"}
            >
                <Grid flex alignItems={"center"} mystyles={"width: auto;"}>
                    {tabList.map((item, index) => (
                        <TabCard
                            key={item.name}
                            style={
                                tabIndex === index
                                    ? { background: item.color }
                                    : {}
                            }
                            onClick={() => setTabIndex(index)}
                        >
                            <p>{item.name}</p>
                        </TabCard>
                    ))}
                </Grid>

                <Grid mystyles={"width: auto;"}>
                    <Filter>거리순</Filter>
                </Grid>
            </Grid>

            <Grid>
                {tabIndex === 0
                    ? questList.map((item, index) => {
                          if (!isQuestPage && index > 3) return;
                          return <QuestItemForList key={item.id} {...item} />;
                      })
                    : questList.map((item, index) => {
                          if (
                              item.type === tabList[tabIndex].type &&
                              count < 4
                          ) {
                              if (!isQuestPage) count += 1;
                              return (
                                  <QuestItemForList key={item.id} {...item} />
                              );
                          }
                      })}
            </Grid>

            {!isQuestPage && (
                <QuestListButton onClick={moveToQusetPage}>
                    <p>전체 퀘스트 보러가기</p>
                </QuestListButton>
            )}
        </Grid>
    );
}

const TabCard = styled.div`
    width: 51px;
    height: 24px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 1px 1px 4px rgba(155, 155, 155, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    & p {
        font-size: 10px;
        font-weight: 700;
        line-height: 1.15;
        text-align: center;
    }
`;

const Filter = styled.p`
    font-size: 10px;
    line-height: 1.15;
`;

const QuestListButton = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(155, 155, 155, 0.15);
    border-radius: 4px;
    background: #5ded86;
    margin: 3px 0 0;
    & p {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        color: #fff;
    }
`;
