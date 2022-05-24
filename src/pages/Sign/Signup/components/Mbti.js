import React from "react";
import { Grid, Text, Image, Button } from "../../elements/index";

export default function Mbti() {
    const mbtiData = [
        { name: "ENTP", src: "" },
        { name: "INTP", src: "" },
        { name: "ENTJ", src: "" },
        { name: "INTJ", src: "" },
        { name: "ISFP", src: "" },
        { name: "ESPT", src: "" },
        { name: "ISTP", src: "" },
        { name: "ESFP", src: "" },
        { name: "ISTJ", src: "" },
        { name: "ISFJ", src: "" },
        { name: "ESTJ", src: "" },
        { name: "ESFJ", src: "" },
        { name: "INFJ", src: "" },
        { name: "INFP", src: "" },
        { name: "ENFP", src: "" },
        { name: "ENFJ", src: "" },
    ];

    const MbtiClick = (idx) => {
        console.log(idx);
        console.log(mbtiData[idx].name);
    };

    return (
        <>
            <Grid
                flex
                alignItems="center"
                justifyContent="center"
                direction="column"
                mystyles="border-bottom: 1px solid rgba(180, 189, 183, 0.5); margin: 71px auto 0px auto; width: 300px; padding: 11px;"
            >
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="width: 212px;"
                >
                    <Text mystyles="font-weight: 400; font-size: 14px;">
                        내 MBTI
                    </Text>
                </Grid>
            </Grid>
            <Grid flex mystyles="flex-wrap: wrap; padding: 50px">
                {mbtiData.map((mbti, idx) => (
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        key={idx}
                        mystyles="width: 50%;"
                        onClick={() => {
                            MbtiClick(idx);
                        }}
                    >
                        <Image
                            src={mbti.src}
                            alt=""
                            mystyles="border: 2px solid red; width: 100%;  height: 120px; margin: 10px;"
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid
                flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                mystyles="position: fixed; bottom: 0; z-index: 1000; display: flex; max-width: 428px; width: 100%; height: 64px; background: #fff; padding: 0; border: 2px solid red;"
            >
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="border: 2px solid red;"
                >
                    <Grid mystyles="width: 8px; height: 8px;  border-radius: 8px; border: 0.5px solid #05240E;"></Grid>
                    <Grid mystyles="margin-left: 16px; width: 8px; height: 8px; border-radius: 8px; border: 0.5px solid #05240E; background: #05240E;"></Grid>
                </Grid>
                <Button mystyles="height: 40px; width: 300px; border: none; border: 1.5px solid #5CEB84; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); background: white; font-weight: 700; font-size: 14px;">
                    다음
                </Button>
            </Grid>
        </>
    );
}
