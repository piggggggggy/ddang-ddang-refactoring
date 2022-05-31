import React from "react";
import { Grid, Text } from "../elements/index";
import styled from "styled-components";
import { motion } from "framer-motion";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Iron from "../../../assets/images/png/mypage/iron.png";
import Bronze from "../../../assets/images/png/mypage/bronze.png";
import Silver from "../../../assets/images/png/mypage/silver.png";
import Gold from "../../../assets/images/png/mypage/gold.png";
import Platinum from "../../../assets/images/png/mypage/platinum.png";
import Diamond from "../../../assets/images/png/mypage/diamond.png";
import Feed from "../../../assets/images/png/feed-medium.png";
import Monster from "../../../assets/images/png/mob-medium.png";
import Time from "../../../assets/images/png/time-medium.png";

export default function Achievement(props) {
    const Badges = {
        iron: Iron,
        bronze: Bronze,
        silver: Silver,
        gold: Gold,
        platinum: Platinum,
        dia: Diamond,
    };

    console.log(props.userData.achievedMission);
    console.log(props.userData.notAchievedMission);
    return (
        <>
            <Grid>
                <Grid
                    flex
                    direction="row"
                    mystyles="margin-top: 30px; position: relative; z-index:1001"
                >
                    <TabCard
                        style={
                            props.tabIndex === false
                                ? {
                                      background: "white",
                                      color: "black",
                                      zIndex: 2,
                                      height: "43px",
                                  }
                                : {
                                      color: "white",
                                      background: "#266137",
                                  }
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
                                      background: "white",
                                      color: "black",
                                      marginLeft: "-10px",
                                      zIndex: 2,
                                      height: "43px",
                                  }
                                : {
                                      color: "white",
                                      background: "#266137",
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
                    mystyles="box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); width: 100%; height: 440px; border-radius: 10px; margin-top:-5px; padding: 10px; overflow: scroll; position: relative; z-index: 1002"
                >
                    {props.tabIndex === false && (
                        <>
                            {props.userData.achievedMission.map(
                                (item, index) => {
                                    return (
                                        <Grid
                                            flex
                                            alignItems="center"
                                            justifyContent="center"
                                            initial={{ x: -250, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            mystyles="padding: 30px;"
                                        >
                                            <Grid mystyles="position: relative; width: 30%;">
                                                <Badge
                                                    src={Badges[item.badge]}
                                                    alt=""
                                                />
                                            </Grid>
                                            <Grid mystyles="margin-left: 9px;">
                                                <Text mystyles="font-weight: 700; font-size: 12px;">
                                                    {item.title}
                                                </Text>
                                                <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px">
                                                    {item.description}
                                                </Text>
                                            </Grid>
                                        </Grid>
                                    );
                                }
                            )}
                        </>
                    )}
                    {props.tabIndex === true && (
                        <>
                            {props.userData.notAchievedMission.map(
                                (item, index) => {
                                    return (
                                        <Grid
                                            flex
                                            alignItems="center"
                                            justifyContent="center"
                                            initial={{ x: -250, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            mystyles="padding: 30px;"
                                        >
                                            <Grid mystyles="position: relative; width: 30%;">
                                                <Badge
                                                    src={Badges[item.badge]}
                                                    alt=""
                                                    style={{ opacity: 0.2 }}
                                                />
                                            </Grid>
                                            <Grid mystyles="margin-left: 9px;">
                                                <Text mystyles="font-weight: 700; font-size: 12px;">
                                                    {item.title}
                                                </Text>
                                                <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px">
                                                    {item.title}
                                                </Text>
                                            </Grid>
                                        </Grid>
                                    );
                                }
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
}

const TabCard = styled(motion.div)`
    width: 116px;
    height: 40px;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Badge = styled(motion.img)`
    width: 70px;
    height: 70px;
`;
