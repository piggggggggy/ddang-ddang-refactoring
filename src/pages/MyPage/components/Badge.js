import React from "react";
import { Grid, Text } from "../elements/index";
import styled from "styled-components";
import { motion } from "framer-motion";
import Iron from "../../../assets/images/png/mypage/iron.png";
import Bronze from "../../../assets/images/png/mypage/bronze.png";
import Silver from "../../../assets/images/png/mypage/silver.png";
import Gold from "../../../assets/images/png/mypage/gold.png";
import Platinum from "../../../assets/images/png/mypage/platinum.png";
import Diamond from "../../../assets/images/png/mypage/diamond.png";
import Feed from "../../../assets/images/png/feed-medium.png";
import Monster from "../../../assets/images/png/mob-medium.png";
import Time from "../../../assets/images/png/time-medium.png";

export default function Badge(props) {
    console.log(props.userData);
    const Badges = {
        iron: Iron,
        bronze: Bronze,
        silver: Silver,
        gold: Gold,
        platinum: Platinum,
        dia: Diamond,
    };

    return (
        <Grid mystyles="padding-top: 49px; padding-bottom:16px">
            <Text mystyles="font-weight: 700; font-size: 16px;">업적</Text>
            <Text mystyles="font-weight: 400; font-size: 12px; margin-top:16px; margin-bottom:8px">
                가장 최근에 달성한 땅땅벳지
            </Text>
            <Grid flex>
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    mystyles="box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);border-radius: 8px; width: 112px; width: 112px; height: 90px;"
                >
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="position: relative;"
                    >
                        <BadgeIcon src={Badges[props.userData.badge.mob]} />
                        <img
                            src={Monster}
                            alt=""
                            style={{
                                height: "20px",
                                width: "20px",
                                position: "absolute",
                                left: 0,
                                marginLeft: "42px",
                                marginTop: "12px",
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    mystyles="box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);border-radius: 8px; width: 112px; height: 90px; margin-left:5px; margin-right:5px"
                >
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="position: relative;"
                    >
                        <BadgeIcon src={Badges[props.userData.badge.time]} />
                        <img
                            src={Time}
                            alt=""
                            style={{
                                height: "20px",
                                width: "20px",
                                position: "absolute",
                                left: 0,
                                marginLeft: "42px",
                                marginTop: "15px",
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    mystyles="box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);border-radius: 8px; width: 112px; height: 90px;"
                >
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="position: relative;"
                    >
                        <img
                            src={Badges[props.userData.badge.feed]}
                            alt=""
                            style={{
                                width: "55px",
                                height: "55px",
                                marginTop: "10px",
                            }}
                        />
                        <img
                            src={Feed}
                            alt=""
                            style={{
                                height: "20px",
                                width: "20px",
                                position: "absolute",
                                left: 0,
                                marginLeft: "45px",
                                marginTop: "12px",
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

const BadgeIcon = styled(motion.img)`
    width: 60px;
    height: 65px;
`;
