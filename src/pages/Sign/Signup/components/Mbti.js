import React from "react";
import { signupAxios } from "../../../../store/thunk-actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Text, Image, Button } from "../../elements/index";
import logo from "../../../../assets/images/png/sign/logo.png";

export default function Mbti(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [finalSignupValue, setFinalSignupValue] = React.useState({
        ...props.finalSignupValue,
    });

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

    const [cardSelected, setCardSelected] = React.useState("");
    const [profile, setProfile] = React.useState("");

    const MbtiClick = (idx) => {
        setCardSelected(mbtiData[idx].name);
        setProfile(mbtiData[idx].src);
    };

    const signupComplete = () => {
        const email = props.finalSignupValue.email;
        const nickname = props.finalSignupValue.nickname;
        const password = props.finalSignupValue.password;
        const mbti = cardSelected;
        const profileImg = "asdf";

        dispatch(
            signupAxios(email, nickname, password, mbti, profileImg, (url) =>
                navigate(url)
            )
        );
    };

    // ready page
    const [page, setPage] = React.useState(2);
    const nextPage = () => {
        setPage(3);
    };

    const goBack = () => {
        setPage(2);
    };

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
                    <Grid flex mystyles="flex-wrap: wrap; padding: 50px">
                        {mbtiData.map((mbti, idx) => (
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                key={idx}
                                mystyles={
                                    mbti.name === cardSelected
                                        ? "background: red; width: 50%; cursor: pointer"
                                        : "width: 50%; cursor: pointer"
                                }
                                onClick={() => {
                                    MbtiClick(idx);
                                }}
                            >
                                <Image
                                    whileHover={{ border: "1px solid blue" }}
                                    src={mbti.src}
                                    alt=""
                                    mystyles="border: 2px solid rgba(180, 189, 183, 0.5); width: 100%;  height: 120px; margin: 10px; border-radius: 8px"
                                />
                            </Grid>
                        ))}
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
                        {cardSelected === "" && (
                            <>
                                <Button
                                    disabled
                                    mystyles="height: 40px; width: 300px; border: none; border: 1.5px solid #5CEB84; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); background: white; font-weight: 700; font-size: 14px; margin-bottom: 50px; margin-top: 20px;"
                                >
                                    mbti를 선택해주세요
                                </Button>
                            </>
                        )}
                        {cardSelected !== "" && (
                            <>
                                <Button
                                    onClick={nextPage}
                                    mystyles="height: 40px; width: 300px; border: none; border: 1.5px solid #5CEB84; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); background: white; font-weight: 700; font-size: 14px; margin-bottom: 50px; margin-top: 20px; background: #5CEB84;"
                                >
                                    {cardSelected} 선택
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
