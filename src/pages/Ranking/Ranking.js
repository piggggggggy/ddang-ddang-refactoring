import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Grid, Button, Input, Text } from "../Ranking/elements/index";
import Container from "../../elements/Container";
import Navigation from "../../components/Navigation";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

export default function Ranking() {
    const data = {
        currentRegion: {
            regionSi: "서울시",
            regionGu: "강남구",
            regionDong: "삼성동",
        },
    };

    React.useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () => {
        await axios
            .post("http://diasm.mooo.com:3000/api/ranks", { data: { data } })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const tabList = [
        {
            name: "전체",
            color: "2px solid rgba(97, 248, 140, 1)",
            opacity: "0.2",
            type: "total",
        },
        {
            name: "몬스터",
            color: "2px solid rgba(97, 248, 140, 1)",
            opacity: "0.2",
            type: "mob",
        },
        {
            name: "타임어택",
            color: "2px solid rgba(97, 248, 140, 1)",
            opacity: "0.2",
            type: "time",
        },
        {
            name: "땅문서",
            color: "2px solid rgba(97, 248, 140, 1)",
            opacity: "0.2",
            type: "docs",
        },
    ];

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const [tabIndex, setTabIndex] = React.useState(0);

    const total = Mockup.ranks.total;
    console.log(total);
    const mob = Mockup.ranks.mob;
    console.log(mob);
    const time = Mockup.ranks.time;
    console.log(time);
    const docs = Mockup.ranks.docs;
    console.log(docs);

    return (
        <Container>
            <Grid
                flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                mystyles="margin-bottom: 150px;"
            >
                <Grid
                    flex
                    justifyContent="center"
                    alignItems="center"
                    mystyles="margin-top:68px;"
                >
                    <Text mystyles="font-size: 20px; font-weight: 700;">
                        RANK
                    </Text>
                </Grid>
                <Grid
                    flex
                    justifyContent="space-between"
                    alignItems="center"
                    mystyles="margin-top:50px; width: 300px"
                >
                    {tabList.map((item, idx) => (
                        <TabCard
                            onClick={() => setTabIndex(idx)}
                            style={
                                tabIndex === idx
                                    ? {
                                          borderBottom: item.color,
                                      }
                                    : {}
                            }
                        >
                            <TabText
                                style={
                                    tabIndex === idx
                                        ? {}
                                        : { opacity: item.opacity }
                                }
                            >
                                {item.name}
                            </TabText>
                        </TabCard>
                    ))}
                </Grid>
                <Grid
                    flex
                    justifyContent="center"
                    alignItems="center"
                    mystyles="border: 1px solid #61F88C;; margin-top: 60px; width: 195px; height: 195px; border-radius: 168px; position: relative;"
                >
                    <Grid
                        flex
                        justifyContent="center"
                        alignItems="center"
                        mystyles="position: absolute; left: 10px; top: 10px; height: 12px; width: 12px"
                    >
                        <StarIcon
                            sx={{
                                width: "12px",
                                height: "12px",
                                color: "#58F5AA",
                            }}
                        />
                    </Grid>
                    <Grid
                        flex
                        justifyContent="center"
                        alignItems="center"
                        mystyles="position: absolute; left: -30px; top: 80px; height: 25px; width: 25px"
                    >
                        <StarIcon
                            sx={{
                                width: "25px",
                                height: "25px",
                                color: "#58F5AA",
                            }}
                        />
                    </Grid>
                    <Grid
                        flex
                        justifyContent="center"
                        alignItems="center"
                        mystyles="position: absolute; left: -10px; top: 30px; width: 44px; height: 44px; background: #58F5AA; border-radius: 44px"
                    >
                        <Text mystyles="font-weight: 700; font-size: 30px; margin-bottom: 2px;">
                            1
                        </Text>
                    </Grid>
                    <Grid
                        flex
                        justifyContent="center"
                        alignItems="center"
                        mystyles="position: absolute; right: 15px; bottom: 20px; width: 41px; height: 41px"
                    >
                        <StarIcon
                            sx={{
                                width: "41px",
                                height: "41px",
                                color: "#58F5AA",
                            }}
                        />
                    </Grid>
                    <Grid mystyles="width: 168px; height: 168px; border-radius: 168px; border: 2px solid red;"></Grid>
                </Grid>

                <Grid
                    flex
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    mystyles="margin-top: 24px; padding-left: 65px;"
                >
                    <Text mystyles="font-size: 17px; font-weight: 800; margin-right: 5px;">
                        {tabIndex === 0 && total[0].nickname}
                        {tabIndex === 1 && mob[0].nickname}
                        {tabIndex === 2 && time[0].nickname}
                        {tabIndex === 3 && docs[0].nickname}
                    </Text>
                    <Text mystyles="font-weight: 400; font-size: 12px; color: #266137; margin-top: 3px;">
                        {tabIndex === 0 && `점령률 ${total[0].ratio}`}
                        {tabIndex === 1 && `점령률 ${mob[0].ratio}`}
                        {tabIndex === 2 && `점령률 ${time[0].ratio}`}
                        {tabIndex === 3 && `점령률 ${docs[0].ratio}`}
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    mystyles="margin-top: 5px"
                >
                    <Text mystyles="font-weight: 400; font-size: 15px; margin-right: 9px">
                        Total
                    </Text>
                    <Text mystyles="color: #58F5AA; font-weight: 700; font-size: 17px;">
                        {tabIndex === 0 && `${total[0].points}P`}
                        {tabIndex === 1 && `${mob[0].points}P`}
                        {tabIndex === 2 && `${time[0].points}P`}
                        {tabIndex === 3 && `${docs[0].points}P`}
                    </Text>
                </Grid>
                <Grid mystyles="margin-top: 19px ;margin-bottom: 20px;">
                    {tabIndex === 0 && (
                        <>
                            {total.slice(1).map((item, idx) => (
                                <Grid
                                    flex
                                    direction="row"
                                    alignItems="center"
                                    initial={{ x: -250, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    key={idx}
                                    mystyles="border-top: 1px solid #DDDDDD ; padding: 14px "
                                >
                                    <Grid
                                        flex
                                        justifyContent="center"
                                        alignItems="center"
                                        mystyles={
                                            idx === 0 || idx === 1
                                                ? "background-color:#18D5A3;  width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                                : "width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                        }
                                    >
                                        <Text
                                            mystyles={
                                                idx === 0 || idx === 1
                                                    ? "color: white"
                                                    : "color: black"
                                            }
                                        >
                                            {idx + 2}
                                        </Text>
                                    </Grid>
                                    <Grid mystyles="background: #C4C4C4; width: 50px; height: 50px; border-radius:50px; margin-right: 20px"></Grid>
                                    <Grid
                                        flex
                                        direction="column"
                                        mystyles="width: 180px;"
                                    >
                                        <Grid
                                            flex
                                            direction="row"
                                            mystyles="width: 180px;"
                                        >
                                            <Text mystyles="font-weight: 700; font-size: 15px;">
                                                {item.nickname}
                                            </Text>
                                            <Text mystyles="font-weight: 400; font-size: 12px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                정령률{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {item.ratio}
                                                </span>
                                            </Text>
                                        </Grid>
                                        <Grid>
                                            <Text mystyles="font-weight: 400;font-size: 12px;">
                                                Total:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                        fontSize: "15px",
                                                        color: "#58F5AA",
                                                    }}
                                                >
                                                    {item.points}
                                                </span>
                                            </Text>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    )}
                    {tabIndex === 1 && (
                        <>
                            {mob.slice(1).map((item, idx) => (
                                <Grid
                                    flex
                                    direction="row"
                                    alignItems="center"
                                    initial={{ x: -250, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    key={idx}
                                    mystyles="border-top: 1px solid #DDDDDD ; padding: 14px "
                                >
                                    <Grid
                                        flex
                                        justifyContent="center"
                                        alignItems="center"
                                        mystyles={
                                            idx === 0 || idx === 1
                                                ? "background-color:#18D5A3;  width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                                : "width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                        }
                                    >
                                        <Text
                                            mystyles={
                                                idx === 0 || idx === 1
                                                    ? "color: white"
                                                    : "color: black"
                                            }
                                        >
                                            {idx + 2}
                                        </Text>
                                    </Grid>
                                    <Grid mystyles="background: #C4C4C4; width: 50px; height: 50px; border-radius:50px; margin-right: 20px"></Grid>
                                    <Grid
                                        flex
                                        direction="column"
                                        mystyles="width: 180px;"
                                    >
                                        <Grid
                                            flex
                                            direction="row"
                                            mystyles="width: 180px;"
                                        >
                                            <Text mystyles="font-weight: 700; font-size: 15px;">
                                                {item.nickname}
                                            </Text>
                                            <Text mystyles="font-weight: 400; font-size: 12px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                정령률{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {item.ratio}
                                                </span>
                                            </Text>
                                        </Grid>
                                        <Grid>
                                            <Text mystyles="font-weight: 400;font-size: 12px;">
                                                Total:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                        fontSize: "15px",
                                                        color: "#58F5AA",
                                                    }}
                                                >
                                                    {item.points}
                                                </span>
                                            </Text>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    )}
                    {tabIndex === 2 && (
                        <>
                            {time.slice(1).map((item, idx) => (
                                <Grid
                                    flex
                                    direction="row"
                                    alignItems="center"
                                    initial={{ x: -250, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    key={idx}
                                    mystyles="border-top: 1px solid #DDDDDD ; padding: 14px "
                                >
                                    <Grid
                                        flex
                                        justifyContent="center"
                                        alignItems="center"
                                        mystyles={
                                            idx === 0 || idx === 1
                                                ? "background-color:#18D5A3;  width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                                : "width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                        }
                                    >
                                        <Text
                                            mystyles={
                                                idx === 0 || idx === 1
                                                    ? "color: white"
                                                    : "color: black"
                                            }
                                        >
                                            {idx + 2}
                                        </Text>
                                    </Grid>
                                    <Grid mystyles="background: #C4C4C4; width: 50px; height: 50px; border-radius:50px; margin-right: 20px"></Grid>
                                    <Grid
                                        flex
                                        direction="column"
                                        mystyles="width: 180px;"
                                    >
                                        <Grid
                                            flex
                                            direction="row"
                                            mystyles="width: 180px;"
                                        >
                                            <Text mystyles="font-weight: 700; font-size: 15px;">
                                                {item.nickname}
                                            </Text>
                                            <Text mystyles="font-weight: 400; font-size: 12px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                정령률{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {item.ratio}
                                                </span>
                                            </Text>
                                        </Grid>
                                        <Grid>
                                            <Text mystyles="font-weight: 400;font-size: 12px;">
                                                Total:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                        fontSize: "15px",
                                                        color: "#58F5AA",
                                                    }}
                                                >
                                                    {item.points}
                                                </span>
                                            </Text>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    )}
                    {tabIndex === 3 && (
                        <>
                            {docs.slice(1).map((item, idx) => (
                                <Grid
                                    flex
                                    direction="row"
                                    alignItems="center"
                                    initial={{ x: -250, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    key={idx}
                                    mystyles="border-top: 1px solid #DDDDDD ; padding: 14px "
                                >
                                    <Grid
                                        flex
                                        justifyContent="center"
                                        alignItems="center"
                                        mystyles={
                                            idx === 0 || idx === 1
                                                ? "background-color:#18D5A3;  width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                                : "width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                        }
                                    >
                                        <Text
                                            mystyles={
                                                idx === 0 || idx === 1
                                                    ? "color: white"
                                                    : "color: black"
                                            }
                                        >
                                            {idx + 2}
                                        </Text>
                                    </Grid>
                                    <Grid mystyles="background: #C4C4C4; width: 50px; height: 50px; border-radius:50px; margin-right: 20px"></Grid>
                                    <Grid
                                        flex
                                        direction="column"
                                        mystyles="width: 180px;"
                                    >
                                        <Grid
                                            flex
                                            direction="row"
                                            mystyles="width: 180px;"
                                        >
                                            <Text mystyles="font-weight: 700; font-size: 15px;">
                                                {item.nickname}
                                            </Text>
                                            <Text mystyles="font-weight: 400; font-size: 12px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                정령률{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {item.ratio}
                                                </span>
                                            </Text>
                                        </Grid>
                                        <Grid>
                                            <Text mystyles="font-weight: 400;font-size: 12px;">
                                                Total:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                        fontSize: "15px",
                                                        color: "#58F5AA",
                                                    }}
                                                >
                                                    {item.points}
                                                </span>
                                            </Text>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    )}
                </Grid>
            </Grid>
            <Navigation />
        </Container>
    );
}

const TabCard = styled(motion.div)``;

const TabText = styled(motion.p)`
    cursor: pointer;
    font-weight: 400;
    font-size: 15px;
`;

export const Mockup = {
    ok: true,
    ranks: {
        total: [
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
        ],
        mob: [
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
        ],
        time: [
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
        ],
        docs: [
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
            {
                nickname: "박재철",
                profileImg: "이미지 url",
                ratio: "30%",
                points: "1000",
            },
        ],
    },
};
