import React from "react";
import { Grid, Text } from "../elements/index";
import ProgressDonut from "../elements/ProgressDonut";
import ProgressBar from "../elements/ProgressBar";

export default function MyRecord(props) {
    const { address } = props;

    return (
        <>
            <Grid mystyles="margin-top: 40px; ">
                <Grid mystyles="margin-bottom: 15px;">
                    <Text mystyles="font-weight: 700; font-size: 16px; color: #05240E;">
                        나의 기록
                    </Text>
                </Grid>

                <Grid flex mystyles="height: 180px; margin: auto;">
                    <Grid mystyles="box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); border-radius: 4px;">
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="center"
                            mystyles="height: 32px; border-radius: 4px 4px 0 0; background: #266137;"
                        >
                            <Text mystyles="font-weight: 700; font-size: 12px; color: white;">
                                가장 많이 점령한 지역
                            </Text>
                        </Grid>

                        <Grid
                            flex
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            mystyles="margin-top: 10px; border-radius: 0 0 4px 4px; border: 2px solid red;"
                        >
                            <Text mystyles="font-weight: 700; font-size: 16px; color: #266137; width: 100%; border: 2px solid red;">
                                {address.gu} {address.dong}
                            </Text>
                            <Grid
                                flex
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Grid mystyles="position: relative; height: 10px;width: 30px; height:100px; border-radius: 4px;">
                                    <ProgressBar
                                        mystyles="position: absolute; bottom: 0; height: 10px; width: 30px; background: #5DEB85; border-radius: 4px;"
                                        transition={{ delay: 0.6, duration: 1 }}
                                        animate={{ height: "70px" }}
                                    />
                                </Grid>
                                <Grid mystyles="position: relative; height: 10px; width: 30px; height:100px; margin-left: 10px; border-radius: 4px;">
                                    <ProgressBar
                                        mystyles="position: absolute; bottom: 0;height: 10px; width: 30px; background: #B3FCC8; border-radius: 4px;"
                                        transition={{ delay: 0.6, duration: 1 }}
                                        animate={{ height: "20px" }}
                                    />
                                </Grid>
                                <Grid mystyles="position: relative; height: 10px; width: 30px; height:100px; margin-left: 10px; border-radius: 4px;">
                                    <ProgressBar
                                        mystyles="position: absolute; bottom: 0;height: 10px; width: 30px; background: #D9FFE4; border-radius: 4px;"
                                        transition={{ delay: 0.6, duration: 1 }}
                                        animate={{ height: "10px" }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid mystyles="margin-left: 15px; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); border-radius: 4px;">
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="center"
                            mystyles="height: 32px; background: #266137; border-radius: 4px 4px 0 0"
                        >
                            <Text mystyles="font-weight: 700;  font-size: 12px; color: white;">
                                이번달 최고 포인트
                            </Text>
                        </Grid>

                        <Grid
                            flex
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            mystyles="border-radius: 0 0 4px 4px; padding: 16px"
                        >
                            <Text mystyles="font-weight: 700; font-size: 16px; color: #266137;">
                                32,600P
                            </Text>
                            <ProgressDonut
                                progress={30}
                                size={60}
                                strokeWidth={30}
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
