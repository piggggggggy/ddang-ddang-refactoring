import { useCallback, useRef } from "react";
import styled from "styled-components";

export default function FeedInput({ text, placeholder, value, valueHandler }) {
    const textRef = useRef();
    const heightHandler = useCallback(() => {
        if (
            textRef === null ||
            textRef.current === null ||
            textRef.current === undefined
        )
            return;
        textRef.current.style.height = "70px";
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);
    return (
        <Wrapper>
            <Label>{text}</Label>
            <TextBox>
                <textarea
                    ref={textRef}
                    placeholder={placeholder}
                    onInput={heightHandler}
                    value={value}
                    onChange={valueHandler}
                />
            </TextBox>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
`;

const Label = styled.p`
    font-size: 16px;
    font-weight: 700;
    line-height: 1.15;
    color: #273938;
    padding-bottom: 9px;
`;
const TextBox = styled.div`
    width: 100%;
    min-height: 90px;
    padding: 10px;
    box-shadow: 0px 1px 4px 0.5px rgba(137, 142, 139, 0.4);
    border-radius: 4px;
    & textarea {
        border: none;
        outline: none;
        resize: none;
        width: 100%;
        height: 50px;
        min-height: 50px;
        font-size: 12px;
        line-height: 1.15;
        padding: 0;
        letter-spacing: -0.05;
        & ::placeholder {
            color: rgba(39, 57, 56, 0.3);
            letter-spacing: -0.05;
        }
    }
`;
