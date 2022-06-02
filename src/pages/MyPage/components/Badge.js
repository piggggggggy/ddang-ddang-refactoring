import React from "react";
import { Grid, Text } from "../elements/index";
import styled from "styled-components";
import { motion } from "framer-motion";
import monsterIron from "../../../assets/images/png/mypage/monsterIron.png";
import monsterBronze from "../../../assets/images/png/mypage/monsterBronze.png";
import monsterSilver from "../../../assets/images/png/mypage/monsterSilver.png";
import monsterGold from "../../../assets/images/png/mypage/monsterGold.png";
import monsterPlatinum from "../../../assets/images/png/mypage/monsterPlatinum.png";
import monsterDiamond from "../../../assets/images/png/mypage/monsterDiamond.png";

import feedIron from "../../../assets/images/png/mypage/feedIron.png";
import feedBronze from "../../../assets/images/png/mypage/feedBronze.png";
import feedSilver from "../../../assets/images/png/mypage/feedSilver.png";
import feedGold from "../../../assets/images/png/mypage/feedGold.png";
import feedPlatinum from "../../../assets/images/png/mypage/feedPlatinum.png";
import feedDiamond from "../../../assets/images/png/mypage/feedDiamond.png";

import timeIron from "../../../assets/images/png/mypage/timeIron.png";
import timeBronze from "../../../assets/images/png/mypage/timeBronze.png";
import timeSilver from "../../../assets/images/png/mypage/timeSilver.png";
import timeGold from "../../../assets/images/png/mypage/timeGold.png";
import timePlatinum from "../../../assets/images/png/mypage/timePlatinum.png";
import timeDiamond from "../../../assets/images/png/mypage/timeDiamond.png";

export default function Badge(props) {
    console.log(props.userData);

    const FeedBadges = {
        iron: feedIron,
        bronze: feedBronze,
        silver: feedSilver,
        gold: feedGold,
        platinum: feedPlatinum,
        dia: feedDiamond,
    };
    const MonsterBadges = {
        iron: monsterIron,
        bronze: monsterBronze,
        silver: monsterSilver,
        gold: monsterGold,
        platinum: monsterPlatinum,
        dia: monsterDiamond,
    };
    const TimeBadges = {
        iron: timeIron,
        bronze: timeBronze,
        silver: timeSilver,
        gold: timeGold,
        platinum: timePlatinum,
        dia: timeDiamond,
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
                        <BadgeIcon
                            src={MonsterBadges[props.userData.badge.mob]}
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
                        <BadgeIcon
                            src={TimeBadges[props.userData.badge.time]}
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
                        <BadgeIcon
                            src={FeedBadges[props.userData.badge.time]}
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
