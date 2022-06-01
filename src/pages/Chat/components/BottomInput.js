import InputButtonImg from "../../../assets/images/png/chat-submit-button.png";

import styled from "styled-components";

export default function BottomInput({ message, sendMessage, setMessage }) {
    const messageHandler = (e) => {
        setMessage(e.target.value);
    };
    const onEnterInput = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <InputWrapper>
            <Input>
                <input
                    value={message}
                    onChange={messageHandler}
                    onKeyPress={onEnterInput}
                />
            </Input>
            <InputButton onClick={sendMessage}>
                <img src={InputButtonImg} alt={"buttonchat-submit-button"} />
            </InputButton>
        </InputWrapper>
    );
}

const InputWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    max-width: 428px;
    padding: 16px 25px;
    background: #fff;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.div`
    position: relative;
    width: 100%;
    height: 56px;
    border-radius: 30px;
    background: #f3f3f3;
    padding: 20px;
    & input {
        border: none;
        outline: none;
        background: none;
        width: calc(100% - 60px);
    }
`;

const InputButton = styled.div`
    position: absolute;
    top: 16px;
    right: 25px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
