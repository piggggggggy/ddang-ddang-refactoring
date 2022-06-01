import React from "react";
import {
    signupAxios,
    kakaoLogin,
} from "../../../../store/thunk-actions/userActions";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Text, Image, Button } from "../../elements/index";
import logo from "../../../../assets/images/png/sign/logo.png";

export default function Mbti(props) {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [finalSignupValue, setFinalSignupValue] = React.useState({
        ...props.finalSignupValue,
    });

    const [mbtiSelected, setMbtiSelected] = React.useState(false);

    const [eandI, setEandI] = React.useState("");

    const [nandS, setNandS] = React.useState("");

    const [tandF, setTandF] = React.useState("");

    const [jandP, setJandP] = React.useState("");

    // console.log(eandI, nandS, tandF, jandP);
    const [mbti, setMbti] = React.useState(eandI + nandS + tandF + jandP);
    // console.log(mbti);

    const EClick = () => {
        setEandI("E");
    };
    const IClick = () => {
        setEandI("I");
    };
    const NClick = () => {
        setNandS("N");
    };
    const SClick = () => {
        setNandS("S");
    };
    const TClick = () => {
        setTandF("T");
    };
    const FClick = () => {
        setTandF("F");
    };
    const JClick = () => {
        setJandP("J");
    };
    const PClick = () => {
        setJandP("P");
    };

    const signupComplete = () => {
        try {
            const myMbti = mbti;
            const profileImg = "0";


            if (props.finalSignupValue) {
                const { email, password, nickname } = props.finalSignupValue;

                if (mbti.length === 4) {
                    dispatch(
                        signupAxios(
                            email,
                            nickname,
                            password,
                            myMbti,
                            profileImg,
                            (url) => navigate(url)
                        )
                    );
                } else if (mbti.length !== 4) {
                }
            } else if (state.data) {
                const { getKakaoMbti, playerId } = state.data;
                if (getKakaoMbti === "" && playerId > 0) {
                    dispatch(
                        kakaoLogin(playerId, mbti, (url) => navigate(url))
                    );
                }
            }
            console.log("끝");
        } catch (err) {
            console.log(err);
        }
    };

    // ready page
    const [page, setPage] = React.useState(2);
    const nextPage = () => {
        setPage(3);
    };

    const goBack = () => {
        setPage(2);
    };

    React.useEffect(() => {
        setMbti(eandI + nandS + tandF + jandP);
        if (mbti.length === 4) {
            setMbtiSelected(true);
        }
    }, [eandI, nandS, tandF, jandP, mbti.length]);

    return (
        <>
            {page === 2 && (
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

                    <Grid mystyles="margin-top: 40px;">
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="space-between"
                            mystyles="width: 300px; margin: auto;"
                        >
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="width: 150px;"
                            >
                                {eandI === "E" ? (
                                    <Text
                                        mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 55.125px;"
                                        onClick={EClick}
                                    >
                                        E
                                    </Text>
                                ) : (
                                    <Text
                                        mystyles="font-weight: 700; font-size: 55.125px; color: rgba(5, 36, 14, 0.1);"
                                        onClick={EClick}
                                    >
                                        E
                                    </Text>
                                )}
                            </Grid>
                            <Grid mystyles="border: 1px solid rgba(5, 36, 14, 0.5);"></Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="width: 150px;"
                            >
                                {eandI === "I" ? (
                                    <Text
                                        mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 55.125px;"
                                        onClick={IClick}
                                    >
                                        I
                                    </Text>
                                ) : (
                                    <Text
                                        mystyles="font-weight: 700; font-size: 55.125px; color: rgba(5, 36, 14, 0.1);"
                                        onClick={IClick}
                                    >
                                        I
                                    </Text>
                                )}
                            </Grid>
                        </Grid>
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="space-between"
                            mystyles="width: 300px; margin: auto;"
                        >
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="width: 150px;"
                            >
                                {nandS === "N" ? (
                                    <Text
                                        mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 55.125px;"
                                        onClick={NClick}
                                    >
                                        N
                                    </Text>
                                ) : (
                                    <Text
                                        mystyles="font-weight: 700; font-size: 55.125px; color: rgba(5, 36, 14, 0.1);"
                                        onClick={NClick}
                                    >
                                        N
                                    </Text>
                                )}
                            </Grid>
                            <Grid mystyles="border: 1px solid rgba(5, 36, 14, 0.5);"></Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="width: 150px;"
                            >
                                {nandS === "S" ? (
                                    <Text
                                        mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 55.125px;"
                                        onClick={SClick}
                                    >
                                        S
                                    </Text>
                                ) : (
                                    <Text
                                        mystyles="font-weight: 700; font-size: 55.125px; color: rgba(5, 36, 14, 0.1);"
                                        onClick={SClick}
                                    >
                                        S
                                    </Text>
                                )}
                            </Grid>
                        </Grid>
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="space-between"
                            mystyles="width: 300px; margin: auto;"
                        >
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="width: 150px;"
                            >
                                {tandF === "T" ? (
                                    <Text
                                        mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 55.125px;"
                                        onClick={TClick}
                                    >
                                        T
                                    </Text>
                                ) : (
                                    <Text
                                        mystyles="font-weight: 700; font-size: 55.125px; color: rgba(5, 36, 14, 0.1);"
                                        onClick={TClick}
                                    >
                                        T
                                    </Text>
                                )}
                            </Grid>
                            <Grid mystyles="border: 1px solid rgba(5, 36, 14, 0.5);"></Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="width: 150px;"
                            >
                                {tandF === "F" ? (
                                    <Text
                                        mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 55.125px;"
                                        onClick={FClick}
                                    >
                                        F
                                    </Text>
                                ) : (
                                    <Text
                                        mystyles="font-weight: 700; font-size: 55.125px; color: rgba(5, 36, 14, 0.1);"
                                        onClick={FClick}
                                    >
                                        F
                                    </Text>
                                )}
                            </Grid>
                        </Grid>
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="space-between"
                            mystyles="width: 300px; margin: auto;"
                        >
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="width: 150px;"
                            >
                                {jandP === "J" ? (
                                    <Text
                                        mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 55.125px;"
                                        onClick={JClick}
                                    >
                                        J
                                    </Text>
                                ) : (
                                    <Text
                                        mystyles="font-weight: 700; font-size: 55.125px; color: rgba(5, 36, 14, 0.1);"
                                        onClick={JClick}
                                    >
                                        J
                                    </Text>
                                )}
                            </Grid>
                            <Grid mystyles="border: 1px solid rgba(5, 36, 14, 0.5);"></Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="width: 150px;"
                            >
                                {jandP === "P" ? (
                                    <Text
                                        mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 55.125px;"
                                        onClick={PClick}
                                    >
                                        P
                                    </Text>
                                ) : (
                                    <Text
                                        mystyles="font-weight: 700; font-size: 55.125px; color: rgba(5, 36, 14, 0.1);"
                                        onClick={PClick}
                                    >
                                        P
                                    </Text>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="width: 303px; height: 41px; margin: 32px auto 0 auto; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.3); border-radius: 4px;"
                    >
                        {mbtiSelected === false && (
                            <Text mystyles="color:rgba(94, 239, 135, 1); font-weight: 400; font-size: 24px;">
                                MBTI
                            </Text>
                        )}
                        {mbtiSelected === true && (
                            <Text mystyles="color:rgba(94, 239, 135, 1); font-weight: 700; font-size: 24px;">
                                {mbti}
                            </Text>
                        )}
                    </Grid>
                    <Grid
                        flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        mystyles="position: fixed; bottom: 0; z-index: 1000; display: flex; max-width: 428px; width: 100%; background: #fff; padding: 0;"
                    >
                        <Grid flex alignItems="center" justifyContent="center">
                            <Grid mystyles="width: 8px; height: 8px;  border-radius: 8px; border: 0.5px solid #05240E;"></Grid>
                            <Grid mystyles="margin-left: 16px; width: 8px; height: 8px; border-radius: 8px; border: 0.5px solid #05240E; background: #05240E;"></Grid>
                        </Grid>
                        {mbtiSelected === false && (
                            <>
                                <Button
                                    disabled
                                    mystyles="height: 40px; width: 300px; border: none; border: 1.5px solid #5CEB84; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); background: white; font-weight: 700; font-size: 14px; margin-bottom: 50px; margin-top: 20px;"
                                >
                                    완료
                                </Button>
                            </>
                        )}
                        {mbtiSelected === true && (
                            <>
                                <Button
                                    onClick={nextPage}
                                    mystyles="height: 40px; width: 300px; border: none; border: 1.5px solid #5CEB84; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); background: white; font-weight: 700; font-size: 14px; margin-bottom: 50px; margin-top: 20px; background: #5CEB84;"
                                >
                                    완료
                                </Button>
                            </>
                        )}
                    </Grid>
                </>
            )}
            {page === 3 && (
                <>
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                    >
                        <Grid
                            flex
                            justifyContent="center"
                            alignItems="center"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            mystyles="margin: 257px auto 0px auto; width: 128px; height: 127px; padding: 11px;"
                        >
                            <Image
                                src={logo}
                                mystyles="width: 128px; height: 127px;"
                            ></Image>
                        </Grid>
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="center"
                            direction="column"
                            mystyles="width: 173px; height: 80px; margin-top: 44px"
                        >
                            <Text mystyles="color: #05240E; font-weight: 700; font-size: 16px;">
                                환영합니다!
                            </Text>
                            <Text mystyles="color: #05240E; font-weight: 700; font-size: 16px;">
                                내 땅을 찾으러
                            </Text>
                            <Text mystyles="color: #05240E; font-weight: 700; font-size: 16px;">
                                함께 떠나볼까요?
                            </Text>
                        </Grid>
                        <Grid
                            flex
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            mystyles="position: fixed; bottom: 0; z-index: 1000; display: flex; max-width: 428px; width: 100%; background: #fff; padding: 0;"
                        >
                            <Button
                                onClick={signupComplete}
                                mystyles="height: 40px; width: 300px; border: none; border: 1.5px solid #5CEB84; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); background: white; font-weight: 700; font-size: 14px; margin-bottom: 50px; margin-top: 20px; background: #5CEB84;"
                            >
                                시작하기
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
