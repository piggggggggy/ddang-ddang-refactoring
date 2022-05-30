import React from "react";
import { Grid, Text } from "../elements/index";
import styled from "styled-components";
import { motion } from "framer-motion";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

export default function Achievement(props) {
    return (
        <>
            <Grid>
                <Grid
                    flex
                    direction="row"
                    mystyles="margin-top: 30px; margin-left: 10px;"
                >
                    <TabCard
                        style={
                            props.tabIndex === false
                                ? {
                                      background: "#266137",
                                      color: "white",
                                      zIndex: 2,
                                      boxShadow:
                                          "1px 1px 1px 3px rgba(0, 0, 0, 0.05)",
                                  }
                                : { background: "white" }
                        }
                        onClick={props.changeTab}
                    >
                        <Text>달성업적</Text>
                    </TabCard>
                    <TabCard
                        onClick={props.changeTab}
                        style={
                            props.tabIndex === true
                                ? {
                                      background: "#266137",
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
                <Grid
                    flex
                    alignItems="center"
                    direction="column"
                    mystyles="box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05); width: 340px; height: 440px; border-radius: 10px; margin-top:-5px; margin-left: 15px; padding: 10px;"
                >
                    {/* {props.tabIndex === false && (
                        <>
                            {achievedMission?.map((items, idx) => (
                                <Grid
                                    flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                    direction="row"
                                    mystyles="height: 100px; margin-top: 20px; box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05); border-radius: 10px;"
                                    initial={{ x: -250, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Grid
                                        flex
                                        alignItems="center"
                                        justifyContent="center"
                                        direction="column"
                                        mystyles="background-color: white; width: 120px; height: 77px; border-radius: 10px; "
                                    >
                                        <MilitaryTechIcon
                                            sx={{
                                                fontSize: "40px",
                                                color: "silver",
                                            }}
                                        />
                                        <Text mystyles="font-size: 12px; font-size: 800; color: #F3AC9C; ">
                                            {items.title}
                                        </Text>
                                    </Grid>
                                    <Grid mystyles="width: 185px;">
                                        <Text mystyles="font-size: 14px; color:#A3D4FB;">
                                            미션:
                                        </Text>
                                        <Text mystyles="font-size: 14px; color:#A3D4FB ">
                                            {items.description}
                                        </Text>
                                        <Text mystyles="font-size: 14px; color: #EDEA50;">
                                            퀘스트: {items.type}
                                        </Text>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    )}
                    {props.tabIndex === true && (
                        <>
                            {notAchievedMission?.map((items, idx) => (
                                <Grid
                                    flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                    direction="row"
                                    mystyles="height: 100px; margin-top: 20px; box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05); border-radius: 10px;"
                                    initial={{ x: -250, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Grid
                                        flex
                                        alignItems="center"
                                        justifyContent="center"
                                        direction="column"
                                        mystyles="background-color: white; width: 125px; height: 77px; border-radius: 10px; "
                                    >
                                        <MilitaryTechIcon
                                            sx={{
                                                fontSize: "40px",
                                                color: "silver",
                                            }}
                                        />
                                        <Text mystyles="font-size: 12px; font-size: 800; color: #F3AC9C; ">
                                            {items.title}
                                        </Text>
                                    </Grid>
                                    <Grid mystyles="width: 180px; margin-left: 6px;">
                                        <Text mystyles="font-size: 14px; color:#A3D4FB;">
                                            미션:
                                        </Text>
                                        <Text mystyles="font-size: 14px; color:#A3D4FB ">
                                            {items.description}
                                        </Text>
                                        <Text mystyles="font-size: 14px; color: #EDEA50;">
                                            퀘스트: {items.type}
                                        </Text>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    )} */}
                </Grid>
            </Grid>
        </>
    );
}

const TabCard = styled(motion.div)`
    width: 116px;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
