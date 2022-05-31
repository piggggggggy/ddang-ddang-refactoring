import styled from "styled-components";

export default function ChatBalloon({ text, time, name, isMe }) {
    const Balloon = styled.div`
        width: 280px;
        min-height: 92px;
        border-radius: 46px 46px ${isMe ? "0 46px" : "46px 0"};
        padding: 20px 40px;
        background: ${isMe ? "#3BE06B" : "#F3F3F3"};

        & p {
            width: 100%;
            font-size: 15px;
            line-height: 17px;
            color: ${isMe ? "#fff" : "#000"};
            white-space: pre-wrap;
            word-break: break-all;
        }
    `;
    const Time = styled.p`
        padding: 10px 0 20px;
        width: 100%;
        font-size: 10px;
        line-height: 11px;
        ${isMe ? "text-align: right" : "text-align: left"};
    `;

    const Wrapper = styled.div`
        position: relative;
        width: 100%;
        ${isMe
            ? "padding-left: calc(100% - 280px)"
            : "padding-right: calc(100 - 280px)"};
    `;
    return (
        <Wrapper>
            <Balloon>
                <p>{text}</p>
            </Balloon>
            <Time>
                {name} {time ? time.substring(0, 10) : null}
            </Time>
        </Wrapper>
    );
}
