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
                mystyles="margin-bottom: 150px; padding-left: 10px; padding-right: 10px"
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
                        mystyles="margin-top: 80px;"
                    >
                        <img
                            src={noData}
                            alt=""
                            style={{
                                width: "240px",
                            }}
                        />
                        <Text mystyles="font-weight: 400; font-size: 14px; margin-top: 45px">
                            아직 아무도 점령을 시작하지 않았네요.
                        </Text>
                        <Text mystyles="font-weight: 700; font-size: 21px;">
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
                            mystyles="border: 1px solid #61F88C; margin-top: 20px; width: 174px; height: 174px; border-radius: 168px; position: relative;"
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
                                        <Text mystyles="font-weight: 700; font-size: 28px; color: white; margin-top: 2px;">
                                            1
                                        </Text>
                                    </Grid>
                                    <Grid
                                        flex
                                        justifyContent="center"
                                        alignItems="center"
                                        mystyles="position: absolute; right: 5px; bottom: 5px; width: 41px; height: 41px"
                                    >
                                        <StarIcon
                                            sx={{
                                                width: "41px",
                                                height: "41px",
                                                color: "#58F5AA",
                                            }}
                                        />
                                    </Grid>
                                    <Grid mystyles="width: 158px; height: 158px; border-radius: 168px;">
                                        <Image
                                            mystyles="width: 158px; height: 158px; border-radius: 168px; object-fit: cover;"
                                            src={
                                                individual[0].profileImg === "0"
                                                    ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACACAMAAAC2o+JuAAAAM1BMVEX39/eysbDp6emrqqn6+vqvrq3z8/O5uLfw8PDm5ubV1dTt7e3DwsHNzMy8u7rb2trg4OCVpRZYAAAECUlEQVR4nO2b7ZKrIAyG1QYRUPD+r/aAX+t2awskxHrG98e2O7M7fRpIIPBaVbdu3br1fwoA/I/55Uvl0To1Ou3lRmWqL0SFqm10L0Vdi0n+VfZaddU3oQKoQdYBbi//uxzU14BCp+XjCfEHVeruG0Ch0vKAcSGV+gsi6uq3kBNo7c4Fha7/CDmpNydyQkQot4Cex6kjIScN5zBCFTnga0Bte0ZA2zRKz3nKBE2lPCee6ZQhni0vJAwZlIGTNZyQlON7Ts1J2eRBBim+eLY2H1N2XJTZQx4kBqZwQoOg9JwND2dmlm+YPQtlpVCUXiNHOJHBZAonGGwwa8GwtqPSfMFkSHZMzVxlyy/tCk/JkEQEY84x6iDxlH7FLD45CYLpw1l4YQd0bZ8xC09OcDSYuvCoY5egBbN0N5zTAr1Q6fWSoLgHFS7wFGsQAyZZNAtXpBuTUFeZm/1FMK9RN6+xCl1kTUceJWyYxbfvNJilmyEgqUjFd+8X6YUu0lmSLJeyfJ9OcepRusUI6i5xhkRwIsdzXmywwVQclOjTYqbDd8CFk2VmTpyY/QdLmi+y2ZyCoWauwgw703XLzJk77ILXS5F7A8x1xbYph5Pr5mqvDHfCCZRVmxpPdm/CrMT5eUosJ6Xku3DseGCWV/XexbeDlOuGnc/kY4b1OACqIcZ+JuphtfYMTG4kgGCE3I4tYPwcUB/K9a/9dBa1Lm/nXbGEXYICMNpnH+wvRmHHBQu6eS/wMwOKSW8fb1cPDLTuENRDunW8ofnZsRR1noLZj/BDbwBgtH3lLbbawPZl9r2ekOW2IM/zUNjtswDaxg0yZMtk1J7sz65pt1kI5nnzV2gTAi+WcTHs0hY8q1Gj8xqVafcWffDF4fmfxVDC2AcvjZBCDt0+b2HT/vt1L13Soqf3cK9Z+vfD6vfedoDmqLYKSV1CfyfPM2ivXz/aEB5/cP3xAiAkrWMOmg/edk86dtXPYE/vWqX7+vH+/ygTHj4fw4UMsb12SjVeSjndWyne1f1ZhPGELtI5IcT60IN/E7cpETXV/Hw3LwlEVeghvyuPkbA0CyfRjdUxJ0XzAfrzB2E58W0xjIVjOXGiN3aGxB71SdIgMUtPzFnIrpPoijKCE+OHRx64JglTPXmGPAgx7DByQQZl7+apjB1xyj1GJrlFjVfuoTxPydwpq3gyBzN3zWx5Ies8jyxbZd9hZsxO3jSflf4sEW/NXJR+HVN4y34gm4hJ8IBIjlKvXdmr0YKZWJPOSKCgRCciiY0nR0nOhZPGPHXUaSxmOUqypeFNPLlKyXWWrvcAM6UXpvG8ZmGm+GT5eqA/SuiJYg8Kiyh+c4x4rhuv6MoJ7nGi4jedXXOi2J5fv3Xr1q0s/QP8eTmKWRVH6QAAAABJRU5ErkJggg=="
                                                    : individual[0].profileImg
                                            }
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
                                        size={158}
                                        strokeWidth={79}
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
                                        alignItems="end"
                                        mystyles="margin-top: 5px"
                                    >
                                        <Text mystyles="font-weight: 700; font-size: 17px;">
                                            {individual[0].nickname}
                                        </Text>
                                        <Text mystyles="margin-left: 5px; font-weight: 400; font-size: 13px; color: #266137; padding-bottom: 2px">
                                            점령률
                                        </Text>
                                        <Text mystyles="margin-left: 5px; font-weight: 700; font-size: 13px; color: #266137; padding-bottom: 2px">
                                            {individual[0].ratio}%
                                        </Text>
                                    </Grid>
                                    <Grid
                                        flex
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        mystyles="margin-top: 5px"
                                    >
                                        <Text mystyles="font-weight: 400; font-size: 13px; margin-right: 9px">
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
                                    <Text mystyles="font-size: 17px; font-weight: 500; margin-right: 5px;">
                                        이 지역은 {group[0].mbti}가 점령했습니다
                                    </Text>
                                    <Grid
                                        flex
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Text mystyles="font-weight: 500; font-size: 24px;color: #266137; margin-top: 3px; margin-right: 5px">
                                            {"점령률"}
                                        </Text>
                                        <Text mystyles="font-weight: 700; font-size: 24px;color: #266137; margin-top: 3px; ">
                                            {`${group[0].ratio}%`}
                                        </Text>
                                    </Grid>
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
                                                    idx === 0
                                                        ? "background-color:#18D4A3;  width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                                        : idx === 1
                                                        ? "background-color:#12A47D;  width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
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
                                            <Grid mystyles="width: 50px; height: 50px; border-radius:50px; margin-right: 20px;">
                                                <Image
                                                    mystyles="width: 50px; height: 50px; border-radius:50px; margin-right: 20px; object-fit: cover;"
                                                    src={
                                                        item.profileImg === "0"
                                                            ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACACAMAAAC2o+JuAAAAM1BMVEX39/eysbDp6emrqqn6+vqvrq3z8/O5uLfw8PDm5ubV1dTt7e3DwsHNzMy8u7rb2trg4OCVpRZYAAAECUlEQVR4nO2b7ZKrIAyG1QYRUPD+r/aAX+t2awskxHrG98e2O7M7fRpIIPBaVbdu3br1fwoA/I/55Uvl0To1Ou3lRmWqL0SFqm10L0Vdi0n+VfZaddU3oQKoQdYBbi//uxzU14BCp+XjCfEHVeruG0Ch0vKAcSGV+gsi6uq3kBNo7c4Fha7/CDmpNydyQkQot4Cex6kjIScN5zBCFTnga0Bte0ZA2zRKz3nKBE2lPCee6ZQhni0vJAwZlIGTNZyQlON7Ts1J2eRBBim+eLY2H1N2XJTZQx4kBqZwQoOg9JwND2dmlm+YPQtlpVCUXiNHOJHBZAonGGwwa8GwtqPSfMFkSHZMzVxlyy/tCk/JkEQEY84x6iDxlH7FLD45CYLpw1l4YQd0bZ8xC09OcDSYuvCoY5egBbN0N5zTAr1Q6fWSoLgHFS7wFGsQAyZZNAtXpBuTUFeZm/1FMK9RN6+xCl1kTUceJWyYxbfvNJilmyEgqUjFd+8X6YUu0lmSLJeyfJ9OcepRusUI6i5xhkRwIsdzXmywwVQclOjTYqbDd8CFk2VmTpyY/QdLmi+y2ZyCoWauwgw703XLzJk77ILXS5F7A8x1xbYph5Pr5mqvDHfCCZRVmxpPdm/CrMT5eUosJ6Xku3DseGCWV/XexbeDlOuGnc/kY4b1OACqIcZ+JuphtfYMTG4kgGCE3I4tYPwcUB/K9a/9dBa1Lm/nXbGEXYICMNpnH+wvRmHHBQu6eS/wMwOKSW8fb1cPDLTuENRDunW8ofnZsRR1noLZj/BDbwBgtH3lLbbawPZl9r2ekOW2IM/zUNjtswDaxg0yZMtk1J7sz65pt1kI5nnzV2gTAi+WcTHs0hY8q1Gj8xqVafcWffDF4fmfxVDC2AcvjZBCDt0+b2HT/vt1L13Soqf3cK9Z+vfD6vfedoDmqLYKSV1CfyfPM2ivXz/aEB5/cP3xAiAkrWMOmg/edk86dtXPYE/vWqX7+vH+/ygTHj4fw4UMsb12SjVeSjndWyne1f1ZhPGELtI5IcT60IN/E7cpETXV/Hw3LwlEVeghvyuPkbA0CyfRjdUxJ0XzAfrzB2E58W0xjIVjOXGiN3aGxB71SdIgMUtPzFnIrpPoijKCE+OHRx64JglTPXmGPAgx7DByQQZl7+apjB1xyj1GJrlFjVfuoTxPydwpq3gyBzN3zWx5Ies8jyxbZd9hZsxO3jSflf4sEW/NXJR+HVN4y34gm4hJ8IBIjlKvXdmr0YKZWJPOSKCgRCciiY0nR0nOhZPGPHXUaSxmOUqypeFNPLlKyXWWrvcAM6UXpvG8ZmGm+GT5eqA/SuiJYg8Kiyh+c4x4rhuv6MoJ7nGi4jedXXOi2J5fv3Xr1q0s/QP8eTmKWRVH6QAAAABJRU5ErkJggg=="
                                                            : item.profileImg
                                                    }
                                                />
                                            </Grid>
                                            <Grid
                                                flex
                                                direction="column"
                                                mystyles="width: 220px;"
                                            >
                                                <Grid
                                                    flex
                                                    direction="row"
                                                    mystyles="width: 220px;"
                                                >
                                                    <Text mystyles="width: 120px; font-weight: 700; font-size: 15px;">
                                                        {item.nickname}
                                                    </Text>
                                                    <Grid
                                                        flex
                                                        direction="row"
                                                        mystyles="width: 70px;"
                                                    >
                                                        <Text mystyles="font-weight: 400; font-size: 10px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                            점령률
                                                        </Text>
                                                        <Text mystyles="font-weight: 700; font-size: 10px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                            {item.ratio} %
                                                        </Text>
                                                    </Grid>
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
                                                            {numberWithCommas(
                                                                item.points
                                                            )}
                                                            P
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
                                            mystyles="border-top: 1px solid #DDDDDD; padding: 14px"
                                        >
                                            <Grid
                                                flex
                                                justifyContent="center"
                                                alignItems="center"
                                                mystyles={
                                                    idx === 0
                                                        ? "background-color:#18D4A3;  width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
                                                        : idx === 1
                                                        ? "background-color:#12A47D;  width: 30px;height: 30px; border-radius:30px; margin-right: 22px"
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
                                            <Grid mystyles="width: 50px; height: 50px; border-radius:50px; margin-right: 20px;">
                                                <ProgressDonut
                                                    progress={100 - item.ratio}
                                                    size={50}
                                                    strokeWidth={25}
                                                    circleOneStroke="#5DED86"
                                                    circleTwoStroke="#B3FCC8"
                                                />
                                            </Grid>
                                            <Grid
                                                flex
                                                direction="column"
                                                mystyles="width: 180px;"
                                            >
                                                <Grid
                                                    flex
                                                    direction="row"
                                                    mystyles="width: 220px;"
                                                    alignItems="center"
                                                >
                                                    <Text mystyles="width: 80px; font-weight: 700; font-size: 17px;">
                                                        {item.mbti}
                                                    </Text>
                                                    <Grid
                                                        flex
                                                        direction="row"
                                                        mystyles="width: 100px;"
                                                    >
                                                        <Text mystyles="font-weight: 400; font-size: 17px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                            점령률
                                                        </Text>
                                                        <Text mystyles="font-weight: 700; font-size: 17px; margin-top: 3px; margin-left: 5px; color: #266137;">
                                                            {item.ratio}%
                                                        </Text>
                                                    </Grid>
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
