import { Grid } from "../../../elements/index";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { DEFAULT_PROFILE_IMG } from "../../../shared/Link";

export default function UserInfoContainer({ region }) {
    const userData = useSelector((state) => state.user.user);
    console.log(userData);
    if (userData === null) return;
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
                <Image
                    src={
                        userData.profileImg === ""
                            ? DEFAULT_PROFILE_IMG
                            : userData.profileImg
                    }
                    alt={"profile image"}
                />
            </Grid>

            <Grid>
                <NameAndLevel>
                    <span>Lv. {userData.level}</span> {userData.nickname}
                </NameAndLevel>

                <Grid
                    mystyles={
                        "position: relative; width: 100px; height: 8px; background: #D7D7D7;"
                    }
                >
                    <LevelProgressBar
                        style={{ width: `${userData.expPoints}%` }}
                    />
                </Grid>

                <SubInfoText>
                    {region.regionDong}을 점령한 {userData.mbti}
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
