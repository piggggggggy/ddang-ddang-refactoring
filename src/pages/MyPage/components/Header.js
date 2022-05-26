import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ProgressBar from "../elements/ProgressBar";
import { Grid, Text } from "../elements/index";

export default function Header(props) {
    const userData = props.userData;
    return (
        <>
            <Grid
                flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mystyles="width: 350px; margin-top: 20px;"
            >
                <Grid>
                    <IconButton>
                        <MenuIcon
                            sx={{
                                width: "25px",
                                height: "18px",
                                color: "white",
                            }}
                        />
                    </IconButton>
                </Grid>
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="width: 55px;"
                >
                    <IconButton>
                        <SettingsIcon
                            sx={{
                                width: "25px",
                                height: "18px",
                                color: "white",
                            }}
                        />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid
                flex
                alignItems="center"
                justifyContent="space-between"
                mystyles="margin-top: 10px; width: 300px; margin-left: -25px;"
            >
                <Grid mystyles="width: 80px; height: 80px; border: 2px solid red; border-radius: 80px;"></Grid>
                <Grid mystyles="width: 210px; height: 80px;">
                    <Grid flex mystyles="margin-top: 10px; margin-bottom: 5px;">
                        <Text mystyles="color: #5DEB85; width: 45px; font-weight: 700;font-size: 16px;">
                            Lv. {userData?.profile?.[0]?.level}
                        </Text>
                        <Text mystyles="color: white; width: 140px; font-weight: 700; font-size: 16px;">
                            {userData?.profile?.[0]?.nickname}{" "}
                            <span
                                style={{
                                    fontWeight: 100,
                                    marginLeft: "-5px",
                                    fontSize: "15px",
                                }}
                            >
                                님
                            </span>
                        </Text>
                    </Grid>
                    <Grid>
                        <Text mystyles="font-weight: 400; font-size: 12px; color: white;">
                            {userData?.profile?.[0]?.mbti?.toUpperCase()}의
                            자랑! 정복하러 떠나요!
                        </Text>
                    </Grid>
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="height: 25px; margin-left: -7px;"
                    >
                        <Grid mystyles="position: absolute; height: 10px; background: #E3E3E3;; border-radius: 50px; width: 200px;">
                            <ProgressBar
                                mystyles="position: absolute; left: 0;height: 10px; border-radius: 50px; background: #5DEB85;"
                                transition={{ delay: 0.6, duration: 1 }}
                                animate={{ width: "100px" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
