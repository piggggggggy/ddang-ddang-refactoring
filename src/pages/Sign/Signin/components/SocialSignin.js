import styled from "styled-components";
import { KAKAO_OAUTH_URL } from "../../../../shared/OAuth";
import kakaoIcon from "../../../../assets/images/png/kakao_icon.png";

const SocialSignin = (props) => {
    // onClick={() => window.location.replace(KAKAO_OAUTH_URL)}
    return (
        <KakaoBtn onClick={() => alert("준비중인 서비스입니다")}>
            <img alt="kakao login" src={kakaoIcon} />
            <span>카카오로 시작하기</span>
        </KakaoBtn>
    );
};

const KakaoBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    max-width: 560px;
    height: 60px;
    border-radius: 12px;
    background-color: #fee500;
    &:hover {
        cursor: pointer;
    }
    img {
        margin-right: 10px;
        width: 30px;
        height: 30px;
    }
    span {
        color: #000000;
    }
`;

export default SocialSignin;
