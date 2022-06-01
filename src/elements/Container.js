import styled from "styled-components";

export default function Container({ children, color = "#fafafa" }) {
    return (
        <Wrapper style={color ? { background: color } : {}}>{children}</Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    max-width: 428px;
    width: 100%;
    min-height: 100vh;
    margin: auto;
    box-sizing: border-box;
    background: #fafafa;
    overflow: hidden;
    /* border-radius: 25px; */
`;
