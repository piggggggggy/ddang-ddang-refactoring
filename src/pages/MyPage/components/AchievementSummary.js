import React from "react";
import { Grid, Text } from "../elements/index";

export default function AchievementSummary(props) {
    const userData = props.userData;
    const feed = props.feed;

    return (
        <>
            <Grid
                flex
                direction="row"
                mystyles="margin-top: 30px; height: 90px; background: white; border-radius: 4px; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); "
            >
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="border: none; margin: 16px 0"
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; color: #266137;">
                        점령한 땅
                    </Text>
                    <Text mystyles="font-weight: 800; font-size: 18px; margin-top: 10px; color: #266137">
                        {userData.profile[0].completes.length}땅
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="border-left: 1px solid #a6a6a64d; border-right: 1px solid #a6a6a64d; margin: 16px 0;"
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; color: #266137;">
                        누적 포인트
                    </Text>
                    <Text mystyles="font-weight: 800; font-size: 18px; margin-top: 10px; color: #266137">
                        {userData.profile[0].points}P
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="border: none; margin: 16px 0"
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; color: #266137;">
                        작성한 피드
                    </Text>
                    <Text mystyles="font-weight: 800; font-size: 18px; margin-top: 10px; color: #014A83;">
                        {feed.length}개
                    </Text>
                </Grid>
            </Grid>
        </>
    );
}
