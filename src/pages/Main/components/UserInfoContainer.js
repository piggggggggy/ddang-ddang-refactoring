import { Grid } from "../../../elements/index";
import styled from "styled-components";
import TestImage from "../../../assets/images/png/screenshot.png";

export default function UserInfoContainer() {
    return (
        <UserInfoCardWrapper>
            <Grid
                flex
                justifyContent={"center"}
                alignItems={"center"}
                mystyles={
                    "min-width: 80px; width: 80px; height: 80px; margin-right: 15px; border-radius: 8px; overflow: hidden;"
                }
            >
                <Image src={TestImage} alt={"profile image"} />
            </Grid>

            <Grid>
                <NameAndLevel>
                    <span>Lv. 88</span> 강윤지
                </NameAndLevel>

                <Grid
                    mystyles={
                        "position: relative; width: 100px; height: 8px; background: #D7D7D7;"
                    }
                >
                    <LevelProgressBar style={{ width: "70%" }} />
                </Grid>

                <SubInfoText>
                    여기에 등어갈 정보는 마이페이지에서 끌어올래
                </SubInfoText>
            </Grid>
        </UserInfoCardWrapper>
    );
}

const UserInfoCardWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 12px 13px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 1px 1px 1px 2px rgba(137, 142, 139, 0.05);
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const NameAndLevel = styled.p`
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -5%;
    padding: 11px 0 4px;
    & span {
        color: #266137;
    }
`;

const LevelProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100px;
    height: 8px;
    background: #5deb85;
`;

const SubInfoText = styled.p`
    font-size: 10px;
    line-height: 1.15;
    letter-spacing: -5%;
    color: #909090;
    padding-top: 13px;
`;
