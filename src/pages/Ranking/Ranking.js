import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Grid, Text, Image } from "../Ranking/elements/index";
import Container from "../../elements/Container";
import Navigation from "../../components/Navigation";
import StarIcon from "@mui/icons-material/Star";
import noData from "../../assets/images/png/Ranking/noData.png";
import KakaoService from "../../services/kakao.service";
import RankingService from "../../services/ranking.service";
import ProgressDonut from "./components/ProgressDonut";

export default function Ranking() {
    const [address, setAddress] = React.useState({});
    const [group, setGroup] = React.useState([]);
    const [individual, setIndividual] = React.useState([]);
    const [tabIndex, setTabIndex] = React.useState(0);

    // 랭킹 조회 (개인별, 그룹별)
    function getRanking() {
        return navigator.geolocation.getCurrentPosition(async (res) => {
            const region = await KakaoService.getAddress({
                location: {
                    lat: res.coords.latitude,
                    lng: res.coords.longitude,
                },
            });

            setAddress(region);

            const result = await RankingService.getRanking(region);
            setGroup(result.data.ranks.group);
            setIndividual(result.data.ranks.individual);
        });
    }

    // 메뉴 리스트
    const tabList = [
        {
            name: "개인",
            color: "3px solid rgba(97, 248, 140, 1)",
            opacity: "0.2",
        },
        {
            name: "그룹",
            color: "3px solid rgba(97, 248, 140, 1)",
            opacity: "0.2",
        },
    ];

    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    React.useEffect(() => {
        getRanking();
    }, []);

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
                <Text mystyles="margin-top:10px; font-size: 16px; font-weight: 500;">
                    {address.si} {address.gu} {address.dong}
                </Text>
                <Grid
                    flex
                    alignItems="center"
                    mystyles="margin-top:30px; width: 36%;"
                >
                    {tabList.map((item, idx) => (
                        <TabCard
                            onClick={() => setTabIndex(idx)}
                            style={
                                tabIndex === idx
                                    ? {
                                          borderBottom: item.color,
                                          margin: "auto",
                                          paddingBottom: "3px",
                                      }
                                    : {
                                          borderBottom:
                                              "3px solid rgba(0, 0, 0, 0)",
                                          margin: "auto",
                                          paddingBottom: "3px",
                                      }
                            }
                        >
                            <TabText
                                style={
                                    tabIndex === idx
                                        ? {
                                              paddingRight: "5px",
                                              paddingLeft: "5px",
                                          }
                                        : {
                                              paddingRight: "5px",
                                              paddingLeft: "5px",
                                              opacity: item.opacity,
                                          }
                                }
                            >
                                {item.name}
                            </TabText>
                        </TabCard>
                    ))}
                </Grid>
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 30px;"
                />
                {group.length === 0 && (
                    <Grid
                        flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        mystyles="margin-bottom: 362px;"
                    >
                        <img
                            src={noData}
                            alt=""
                            style={{
                                width: "250px",
                                height: "210px",
                                marginTop: "161px",
                            }}
                        />
                        <Text mystyles="font-weight: 400; font-size: 16px; margin-top: 45px">
                            아직 아무도 점령을 시작하지 않았네요.
                        </Text>
                        <Text mystyles="font-weight: 700; font-size: 24px;">
                            첫번째 점령자가 되어보세요!
                        </Text>
                    </Grid>
                )}
                {group.length !== 0 && (
                    <>
                        <Grid
                            flex
                            justifyContent="center"
                            alignItems="center"
                            mystyles="border: 1px solid #61F88C; margin-top: 20px; width: 195px; height: 195px; border-radius: 168px; position: relative;"
                        >
                            {tabIndex === 0 && (
                                <>
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
                                    <Grid mystyles="width: 168px; height: 168px; border-radius: 168px;">
                                        <Image
                                            mystyles="width: 168px; height: 168px; border-radius: 168px;"
                                            src=""
                                        />
                                    </Grid>
                                </>
                            )}
                            {tabIndex === 1 && (
                                <>
                                    <Grid
                                        flex
                                        justifyContent="center"
                                        alignItems="center"
                                        mystyles="position: absolute; left: -15px; top: 40px; height: 20px; width: 20px"
                                    >
                                        <StarIcon
                                            sx={{
                                                width: "15px",
                                                height: "15px",
                                                color: "#58F5AA",
                                            }}
                                        />
                                    </Grid>
                                    <ProgressDonut
                                        progress={100 - group[0].ratio}
                                        size={180}
                                        strokeWidth={90}
                                        circleOneStroke="#5DED86"
                                        circleTwoStroke="#B3FCC8"
                                    />
                                </>
                            )}
                        </Grid>
                        <Grid
                            flex
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            mystyles="margin-top: 20px; margin-bottom: 20px;"
                        >
                            {tabIndex === 0 && (
                                <>
                                    <Grid
                                        flex
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        mystyles="margin-top: 5px"
                                    >
                                        <Text mystyles="font-weight: 700; font-size: 17px;">
                                            {individual[0].nickname}
                                        </Text>
                                        <Text mystyles="margin-left: 5px; font-weight: 400; font-size: 12.8038px;">
                                            점령률 {individual[0].ratio}%
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
                                            {numberWithCommas(
                                                individual[0].points
                                            )}
                                            P
                                        </Text>
                                    </Grid>
                                </>
                            )}
                            {tabIndex === 1 && (
                                <Grid
                                    flex
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    initial={{ x: -250, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Text mystyles="font-size: 17px; font-weight: 800; margin-right: 5px;">
                                        이땅은 {group?.[0]?.mbti}가 점령했습니다
                                    </Text>
                                    <Text mystyles="font-weight: 400; font-size: 27.3147px;color: #266137; margin-top: 3px; ">
                                        {`점령률 ${group?.[0]?.ratio}%`}
                                    </Text>
                                </Grid>
                            )}
                        </Grid>

                        <Grid mystyles="margin-top: 19px ;margin-bottom: 20px;">
                            {tabIndex === 0 && (
                                <>
                                    {individual.slice(1).map((item, idx) => (
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
                                            <Grid mystyles="background: #C4C4C4; width: 50px; height: 50px; border-radius:50px; margin-right: 20px" />
                                            <Grid
                                                flex
                                                direction="column"
                                                mystyles="width: 220px;"
                                            >
                                                <Grid
                                                    flex
                                                    direction="row"
                                                    mystyles="width: 180px;"
                                                >
                                                    <Text mystyles="width: 150px; font-weight: 700; font-size: 15px;">
                                                        {item.nickname}
                                                    </Text>
                                                    <Text mystyles="width: 100px; font-weight: 400; font-size: 10px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                        정령률 {item.ratio} %
                                                    </Text>
                                                </Grid>
                                                <Grid>
                                                    <Text mystyles="font-weight: 400;font-size: 12px;">
                                                        Total
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    "700",
                                                                fontSize:
                                                                    "15px",
                                                                color: "#58F5AA",
                                                                marginLeft:
                                                                    "10px",
                                                            }}
                                                        >
                                                            {item.points}P
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
                                    {group.slice(1).map((item, idx) => (
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
                                            <Grid mystyles="background: #C4C4C4; width: 50px; height: 50px; border-radius:50px; margin-right: 20px" />
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
                                                        {item.mbti}
                                                    </Text>
                                                    <Text mystyles="font-weight: 400; font-size: 12px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                        정령률{" "}
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    "700",
                                                            }}
                                                        >
                                                            {item.ratio} %
                                                        </span>
                                                    </Text>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </>
                            )}
                        </Grid>
                    </>
                )}
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
