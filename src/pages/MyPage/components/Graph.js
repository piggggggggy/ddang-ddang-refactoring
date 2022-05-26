import React from "react";
import { Grid, Text } from "../elements/index";
import ProgressDonut from "../elements/ProgressDonut";

export default function Graph(props) {
    return (
        <>
            <Grid mystyles="border: 2px solid red; margin-top: 40px; ">
                <Grid mystyles="margin-bottom: 15px; margin-left: 15px">
                    <Text mystyles="font-weight: 700; font-size: 16px; color: #05240E;">
                        나의 기록
                    </Text>
                </Grid>
                <Grid
                    flex
                    mystyles="border: 2px solid red; height: 170px; margin: auto;"
                >
                    <Grid mystyles="border: 2px solid red;">
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="center"
                            mystyles="border: 2px solid red; height: 32px; border-radius: 4px 4px 0px 0px; background: #266137; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                        >
                            <Text mystyles="font-weight: 700; font-size: 12px; color: white;">
                                가장 많이 점령한 지역
                            </Text>
                        </Grid>
                        <Grid></Grid>
                    </Grid>
                    <Grid mystyles="border: 2px solid red; margin-left: 15px;">
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="center"
                            mystyles="border: 2px solid red; height: 32px; border-radius: 4px 4px 0px 0px;background: #266137; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                        >
                            <Text mystyles="font-weight: 700;  font-size: 12px; color: white;">
                                이번달 최고 포인트
                            </Text>
                        </Grid>
                        <Grid>
                            <ProgressDonut
                                progress={30}
                                size={100}
                                strokeWidth={50}
                                circleOneStroke="#5DED86"
                                circleTwoStroke="#B3FCC8"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
