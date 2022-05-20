import React from "react";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";

import { Container } from "../../elements/index";
import Navigation from "../../components/Navigation";
import { Grid, Button, Text } from "../MyPage/elements/index";
import ProfilePreview from "../MyPage/components/ProfilePreview";

export default function MyPageFinal() {
    const [tabIndex, setTabIndex] = React.useState(false);

    return (
        <Container>
            <BackgroundPaper />
            <Grid
                mystyles={
                    "position: relative; z-index: 100; padding: 0 30px; margin-bottom: 200px;"
                }
            >
                <Grid
                    flex
                    justifyContent="space-between"
                    alignItems="center"
                    mystyles="margin-top: 100px"
                >
                    <Grid mystyles="width: 200px;">
                        <Text mystyles="font-weight: 700; font-size: 30px; color: white;">
                            강윤지
                        </Text>
                        <Text mystyles="font-weight: 400; font-size: 14px; color: white;">
                            신당동 ENFP
                        </Text>
                    </Grid>
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="space-between"
                        mystyles="width: 101px"
                    >
                        <ProfilePreview mystyles="width: 101px; height: 101px; border-radius: 101px; background-color: white;"></ProfilePreview>
                    </Grid>
                </Grid>

                <Grid mystyles="position: relative; height: 20px; background-color: #D9D9D9; border-radius: 50px; width: 150px; margin-top: 35px; margin-left: 5px;">
                    <ProgressBar
                        transition={{ delay: 0.6, duration: 1 }}
                        animate={{ width: "100px" }}
                        style={{ backgroundColor: "#EDEA50" }}
                    ></ProgressBar>
                    <Text mystyles="position: absolute; right: -35px; color: white; font-size: 18px; font-weight: 600">
                        Lv.2
                    </Text>
                </Grid>
                <Grid mystyles="margin-top: 38px;">
                    <Text mystyles="font-weight: 400; font-size: 16px; color: white;">
                        가장 최근에 달성한 땅땅뱃지
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mystyles="width: 320px; margin-top: 20px;"
                >
                    <Grid mystyles="background-color: white; width: 100px; height: 77px; border-radius: 10px;"></Grid>
                    <Grid mystyles="background-color: white; width: 100px; height: 77px; border-radius: 10px;"></Grid>
                    <Grid mystyles="background-color: white; width: 100px; height: 77px; border-radius: 10px;"></Grid>
                </Grid>
                <Grid>
                    <Grid flex direction="row" mystyles="margin-top: 30px;">
                        <TabCard
                            style={
                                tabIndex === false
                                    ? {
                                          background: "#16CE9E",
                                          color: "white",
                                          zIndex: 2,
                                          boxShadow:
                                              "1px 1px 1px 3px rgba(0, 0, 0, 0.05)",
                                      }
                                    : { background: "white" }
                            }
                            onClick={() => {
                                setTabIndex(false);
                            }}
                        >
                            <Text>달성업적</Text>
                        </TabCard>
                        <TabCard
                            onClick={() => {
                                setTabIndex(true);
                            }}
                            style={
                                tabIndex === true
                                    ? {
                                          background: "#16CE9E",
                                          color: "white",
                                          marginLeft: "-10px",
                                          zIndex: 2,
                                          boxShadow:
                                              "-3px 1px 1px 3px rgba(0, 0, 0, 0.05)",
                                      }
                                    : {
                                          background: "white",
                                          marginLeft: "-10px",
                                      }
                            }
                        >
                            <Text>미달성 업적</Text>
                        </TabCard>
                    </Grid>
                    <Grid mystyles="box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05); width: 300px; height: 440px; border-radius: 10px; margin-top:-5px; margin-left: 5px"></Grid>
                </Grid>
            </Grid>
            <Navigation />
        </Container>
    );
}
const BackgroundPaper = styled.div`
    position: absolute;
    top: -1020px;
    left: calc(50% - 750px);
    z-index: 0;
    width: 1500px;
    height: 1500px;
    background: #5deb85;
    border-radius: 50%;
`;

const ProgressBar = styled(motion.div)`
    position: absolute;
    left: 0;
    height: 20px;
    border-radius: 50px;
`;

const TabCard = styled(motion.div)`
    width: 116px;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
