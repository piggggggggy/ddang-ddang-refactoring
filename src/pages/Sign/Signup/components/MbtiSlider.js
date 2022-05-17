import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import { Text, Grid, Button } from "../../elements/index";
import mbti from "../../../../assets/images/png/mbti";

export default function Mbti(props) {
    const { onClick } = props;
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [userMbti, setUserMbti] = React.useState(0);
    console.log(userMbti);
    return (
        <div>
            <Text
                initial={{ x: -250, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                mystyles="text-align:center; font-size: 20px; font-weight: bolder"
            >
                스크롤 & 클릭
            </Text>
            <Slider {...settings}>
                {mbti.map((image, idx) => {
                    return (
                        <>
                            <div key={idx}>
                                <Content
                                    key={idx}
                                    onClick={() => {
                                        setUserMbti(idx);
                                    }}
                                >
                                    <img src={image} alt="" />
                                </Content>
                            </div>
                        </>
                    );
                })}
            </Slider>
            {userMbti === 0 && <Grid> ENFP 이시네요?</Grid>}
            {userMbti === 1 && <Grid> ISTJ 이시네요?</Grid>}
            {userMbti === 2 && <Grid> INTJ 이시네요?</Grid>}
            <Grid onClick={onClick} mystyles="margin-top: 40px">
                <Button mystyles="height: 50px; width: 200px; border-radius: 25px; margin-top: 20px; border: none; font-size: 20px; font-weight: bold; background-color: #D6E9FE">
                    {userMbti === 0 && "ENFP 선택하기"}
                    {userMbti === 1 && "INTJ 선택하기"}
                    {userMbti === 2 && "ISTJ 선택하기"}
                </Button>
            </Grid>
        </div>
    );
}

Mbti.defaultProps = {
    onClick: () => {},
};

const Content = styled.h3`
    height: 400px;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
`;
