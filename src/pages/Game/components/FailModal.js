import styled from "styled-components";
import { questFragment } from "../../../modules/fragment";
import TimeImg from "../../../assets/images/png/time-large.png";

export default function FailModal({ open, setComfirm, type, title }) {
    const fragment = questFragment(type);
    return (
        <>
            {open && <Dimmed />}
            <Paper style={open ? { bottom: "calc(50vh - 140px)" } : {}}>
                <Title style={{ color: fragment.color }}>{title}</Title>
                <Image>
                    <img src={TimeImg} alt={"time"} />
                </Image>
                <BottomButton
                    onClick={setComfirm}
                    style={{ background: fragment.subColor }}
                >
                    <p>다른 퀘스트 하러가기</p>
                </BottomButton>
            </Paper>
        </>
    );
}

const Dimmed = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 100vw;
    max-width: 428;
    height: 100vh;
    background: rgba(39, 57, 56, 0.75);
`;

const Paper = styled.div`
    position: fixed;
    width: 290px;
    height: 280px;
    background: #fff;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    border-radius: 4px;
    bottom: -100%;
    left: calc(50% - 140px);
    z-index: 2001;
    padding: 44px 16px 20px;
    transition: all 500ms ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.p`
    font-size: 20px;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
    width: 100%;
`;

const Image = styled.div`
    width: 80px;
    height: 80px;
    margin: auto;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const BottomButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background: #f3ac9c;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    border-radius: 4px;
    & p {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.15;
        color: #000;
    }
`;
