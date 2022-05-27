import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ProgressBar from "../elements/ProgressBar";
import { Grid, Text } from "../elements/index";
import { useSelector } from "react-redux";
import ProfilePreview from "../elements/ProfilePreview";

export default function Header(props) {
    const userData = props.userData;
    console.log(props.profile);

    return (
        <>
            <Grid
                flex
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                mystyles="width: 350px; margin-top: 20px;"
            >
                {/* <Grid>
                    <IconButton onClick={props.openSideMenu}>
                        <MenuIcon
                            sx={{
                                width: "25px",
                                height: "18px",
                                color: "white",
                            }}
                        />
                    </IconButton>
                </Grid> */}
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="width: 55px;"
                >
                    <IconButton onClick={props.settingsOpen}>
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
                <Grid mystyles="position: relative; width: 75px; height: 75px; border-radius: 50%; overflow: hidden;">
                    <ProfilePreview
                        mystyles="position: absolute; width: 100%; height: 100%; border-radius: 75px;"
                        src={props.profile}
                    />
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="width: 100%; height: 20px; position: absolute; background: rgba(44, 44, 44, 0.5); bottom: 0; left: 0; pointer: cursor;"
                        onClick={props.openModal}
                    >
                        <Text mystyles="font-weight: 400; font-size: 8px; color: white;">
                            편집
                        </Text>
                    </Grid>
                </Grid>
                <Grid mystyles="width: 210px; height: 80px;">
                    <Grid flex mystyles="margin-top: 10px; margin-bottom: 5px;">
                        <Text mystyles="color: #5DEB85; width: 45px; font-weight: 700;font-size: 16px;">
                            Lv. {userData.profile[0].level}
                        </Text>
                        <Text mystyles="color: white; width: 140px; font-weight: 700; font-size: 16px;">
                            {userData.profile[0].nickname}
                            <span
                                style={{
                                    fontWeight: 100,
                                    fontSize: "15px",
                                }}
                            >
                                님
                            </span>
                        </Text>
                    </Grid>
                    <Grid>
                        <Text mystyles="font-weight: 400; font-size: 12px; color: white;">
                            {userData.profile[0].mbti.toUpperCase()}의 자랑!
                            정복하러 떠나요!
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
                                animate={{
                                    width: userData.profile[0].expPoints,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
