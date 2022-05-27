import React from "react";
import { Grid, Text } from "../elements/index";

export default function AchievementHeader(props) {
    const userData = props.userData;
    const feed = props.feed;

    return (
        <>
            <Grid
                flex
                direction="row"
                mystyles="border: 2px solid red; margin-top: 20px; height: 100px; padding: 10px; background: white;"
            >
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="border: none; background: white; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; color: #266137">
                        점령한 땅
                    </Text>
                    <Text mystyles="font-weight: 700; font-size: 18px; margin-top: 5px; color: #266137">
                        {userData.profile[0].completes.length}땅
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="border-left: 2px solid red; border-right: 2px solid red; background: white; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; color: #266137">
                        누적 포인트
                    </Text>
                    <Text mystyles="font-weight: 700; font-size: 18px; margin-top: 5px; color: #266137">
                        {userData.profile[0].expPoints}P
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="border: none; background: white;box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; color: #266137">
                        작성한 피드
                    </Text>
                    <Text mystyles="font-weight: 700; font-size: 18px; margin-top: 5px; color: #014A83;">
                        {feed?.length}개
                    </Text>
                </Grid>
            </Grid>
        </>
    );
}
