import styled from "styled-components";

export default function QuestPaperBottomButton({ text, color, onClick, isOn }) {
    return (
        <ButtonWrapper
            onClick={onClick}
            style={isOn ? { background: color } : { background: "#EBEBEB" }}
        >
            <p>{text}</p>
        </ButtonWrapper>
    );
}

const ButtonWrapper = styled.div`
    position: relative;
    margin: 0 auto;
    height: 40px;
    width: 80%;
    border-radius: 4px;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    & p {
        font-size: 16;
        font-weight: 700;
    }
`;
