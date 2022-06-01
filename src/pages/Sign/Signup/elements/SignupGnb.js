import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackDirectionIcon from "../../../../assets/images/icon/BackDirectionIcon";

export default function SignupGnb({ text }) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <IconBox onClick={() => navigate(-1)}>
                <BackDirectionIcon />
            </IconBox>
            <Title>
                <p>{text}</p>
            </Title>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    max-width: 428px;
    padding: 20px 36px;
    display: flex;
    background: #fafafa;
    margin-top: 20px;
`;
const IconBox = styled.div`
    width: 30px;
    height: 16px;
`;
const Title = styled.div`
    position: absolute;
    width: 50%;
    height: 56px;
    top: 0;
    left: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    & p {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        text-align: center;
    }
`;
