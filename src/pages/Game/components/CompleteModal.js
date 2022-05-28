import styled from "styled-components";
import { questFragment } from "../../../modules/fragment";

export default function CompleteModal({ open, setComfirm, type }) {
    const fragment = questFragment(type);
    return (
        <>
            {open && <Dimmed />}
            <Paper style={open ? { bottom: "calc(50vh - 140px)" } : {}}>
                {type !== "feed" && (
                    <WinPaper>
                        <img src={fragment.winPaper} alt={"win paper"} />
                    </WinPaper>
                )}
                <Title style={{ color: fragment.color }}>
                    승리를 축하합니다
                </Title>
                <Reward style={{ background: fragment.color }}>
                    <p>3,000 P</p>
                </Reward>

                <BottomButton
                    onClick={() => setComfirm("point")}
                    style={{ marginBottom: 10, background: fragment.subColor }}
                >
                    <p>포인트 받기</p>
                </BottomButton>
                <BottomButton
                    onClick={() => setComfirm("quest")}
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
`;

const Title = styled.p`
    font-size: 20px;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
    width: 100%;
`;

const WinPaper = styled.div`
    position: absolute;
    top: -28px;
    left: calc(50% - 100px);
    width: 196px;
    height: 56px;
    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Reward = styled.div`
    width: 112px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 14px auto 24px;
    & p {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.15;
        text-align: center;
        width: 100%;
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
