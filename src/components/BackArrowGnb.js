import styled from "styled-components";
import BackArrowBtn from "../assets/images/icon/BackArrowBtn";

export default function BackArrowGnb() {
    return (
        <GnbWrapper>
            <BackArrowBtn />
        </GnbWrapper>
    );
}

const GnbWrapper = styled.div`
    position: fixed;
    max-width: 428px;
    width: 100vw;
    z-index: 1000;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    background: #fff;
`;
