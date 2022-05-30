import React from "react";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ProgressBar from "../elements/ProgressBar";
import { Grid, Text } from "../elements/index";
import ProfilePreview from "../elements/ProfilePreview";

export default function Profile(props) {
    const userData = props.userData;
    console.log(props.profile);

    return (
        <>
            <Grid
                flex
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                mystyles="width: 350px; margin-top: 20px; margin-right: -40px"
            >
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
                                height: "25px",
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
                        mystyles="position: absolute; width: 75px; height: 75px; border-radius: 50%; object-fit: cover;"
                        src={props.profile}
                    />
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="width: 100%; height: 20px; position: absolute; background: rgba(44, 44, 44, 0.5); bottom: 0; left: 0; pointer: cursor;"
                        onClick={props.openModal}
                    >
                        <Text
                            onClick={props.profileOpen}
                            mystyles="font-weight: 400; font-size: 8px; color: white; cursor: pointer"
                        >
                            편집
                        </Text>
                    </Grid>
                </Grid>
                <Grid mystyles="width: 210px; height: 80px;">
                    <Grid flex mystyles="margin-top: 10px; margin-bottom: 8px;">
                        <Text mystyles="color: #5DEB85; width: 55px; font-weight: 700;font-size: 16px;">
                            Lv. {userData.profile[0].level}
                        </Text>
                        <Text mystyles="color: white; width: 155px; font-weight: 700; font-size: 16px;">
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
                    <Grid mystyles="margin-bottom: 4px;">
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
                                    width: `${
                                        userData.profile[0].expPoints * 2
                                    }px`,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
