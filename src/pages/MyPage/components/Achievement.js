import React from "react";
import { Grid, Text } from "../elements/index";
import styled from "styled-components";
import { motion } from "framer-motion";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Iron from "../../../assets/images/png/mypage/iron.png";
import Silver from "../../../assets/images/png/mypage/silver.png";
import Gold from "../../../assets/images/png/mypage/gold.png";
import Platinum from "../../../assets/images/png/mypage/platinum.png";
import Diamond from "../../../assets/images/png/mypage/diamond.png";
import Feed from "../../../assets/images/png/feed-medium.png";
import Monster from "../../../assets/images/png/mob-medium.png";
import Time from "../../../assets/images/png/time-medium.png";

export default function Achievement(props) {
    return (
        <>
            <Grid>
                <Grid flex direction="row" mystyles="margin-top: 30px;">
                    <TabCard
                        style={
                            props.tabIndex === false
                                ? {
                                      background: "#266137",
                                      color: "white",
                                      zIndex: 2,
                                      boxShadow:
                                          "1px 1px 0 3px rgba(0, 0, 0, 0.05)",
                                  }
                                : {
                                      background: "white",
                                      boxShadow:
                                          "1px 1px 0 3px rgba(0, 0, 0, 0.05)",
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
                                      background: "#266137",
                                      color: "white",
                                      marginLeft: "-10px",
                                      zIndex: 2,
                                      boxShadow:
                                          "-3px 1px 0 3px rgba(0, 0, 0, 0.05)",
                                  }
                                : {
                                      background: "white",
                                      marginLeft: "-10px",
                                      boxShadow:
                                          "1px 1px 1px 0 rgba(0, 0, 0, 0.05)",
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
                    mystyles="box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05); width: 100%; height: 440px; border-radius: 10px; margin-top:-5px; padding: 10px; overflow: scroll"
                >
                    {props.tabIndex === false && (
                        <>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="border: 2px solid red; padding: 30px;"
                            >
                                <Badge src={Iron} alt="" />
                                <Grid mystyles="margin-left: 9px;">
                                    <Text mystyles="font-weight: 700; font-size: 12px;">
                                        몬스터랑 한번 싸워봄
                                    </Text>
                                    <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px">
                                        몬스터 1마리 처치
                                    </Text>
                                </Grid>
                            </Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="border: 2px solid red; padding: 30px;"
                            >
                                <Badge src={Silver} alt="" />
                                <Grid mystyles="margin-left: 9px;">
                                    <Text mystyles="font-weight: 700; font-size: 12px;">
                                        몬스터랑 한번 싸워봄
                                    </Text>
                                    <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px">
                                        몬스터 1마리 처치
                                    </Text>
                                </Grid>
                            </Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="border: 2px solid red; padding: 30px;"
                            >
                                <Badge src={Gold} alt="" />
                                <Grid mystyles="margin-left: 9px;">
                                    <Text mystyles="font-weight: 700; font-size: 12px;">
                                        몬스터랑 한번 싸워봄
                                    </Text>
                                    <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px">
                                        몬스터 1마리 처치
                                    </Text>
                                </Grid>
                            </Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="border: 2px solid red; padding: 30px;"
                            >
                                <Badge src={Platinum} alt="" />
                                <Grid mystyles="margin-left: 9px;">
                                    <Text mystyles="font-weight: 700; font-size: 12px;">
                                        몬스터랑 한번 싸워봄
                                    </Text>
                                    <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px">
                                        몬스터 1마리 처치
                                    </Text>
                                </Grid>
                            </Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="border: 2px solid red; padding: 30px;"
                            >
                                <Badge src={Diamond} alt="" />
                                <Grid mystyles="margin-left: 9px;">
                                    <Text mystyles="font-weight: 700; font-size: 12px;">
                                        몬스터랑 한번 싸워봄
                                    </Text>
                                    <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px">
                                        몬스터 1마리 처치
                                    </Text>
                                </Grid>
                            </Grid>
                        </>
                    )}
                    {props.tabIndex === true && <></>}
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

const Badge = styled(motion.img)`
    width: 35px;
    height: 35px;
`;
