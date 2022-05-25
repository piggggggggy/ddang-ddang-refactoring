import styled from "styled-components";
import MyLocationIcon from "../../../assets/images/icon/MyLocationIcon";

export default function CenterButton(Props) {
    return (
        <IconGroup onClick={Props.onClick}>
            <Circle>
                <MyLocationIcon />
            </Circle>
            <BottomBox>
                <span>새로고침</span>
            </BottomBox>
        </IconGroup>
    );
}

const IconGroup = styled.div`
    position: absolute;
    right: 20px;
    top: -60px;
    width: 48px;
    height: 48px;
`;

const Circle = styled.div`
    position: absolute;
    top: 0;
    left: 4px;
    z-index: 10;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    border: 2px solid #5eef87;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        width: 16px;
        height: 16px;
        object-fit: contain;
    }
`;

const BottomBox = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 11;
    width: 48px;
    height: 16px;
    background: #5eef87;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    & span {
        font-size: 8px;
        line-height: 1.15;
    }
`;
