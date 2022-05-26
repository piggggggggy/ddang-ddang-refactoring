import styled from "styled-components";
import { KAKAO_OAUTH_URL } from "../../../../shared/OAuth";
import kakaoIcon from "../../../../assets/images/png/sign/kakao_icon.png";

const SocialSignin = (props) => {
    // onClick={() => window.location.replace(KAKAO_OAUTH_URL)}
    return (
        <a href="/api/players/kakaoauth">
            <KakaoBtn>
                <KakaoImg alt="kakao login" src={kakaoIcon} />
                <KakaoText>카카오로 시작하기</KakaoText>
            </KakaoBtn>
        </a>
    );
};

const KakaoBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 308px;
    border-radius: 4px;
    background-color: #fee500;
    padding-top: 19px;
    padding-bottom: 19px;
    &:hover {
        cursor: pointer;
    }
    img {
        margin-right: 10px;
    }
    span {
        color: #000000;
    }
`;

const KakaoText = styled.span`
    color: #191600;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
`;

const KakaoImg = styled.img`
    width: 24px;
    height: 24px;
    margin-top: 3px;
`;

export default SocialSignin;
