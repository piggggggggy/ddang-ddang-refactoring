import styled from "styled-components";

export default function Container({ children }) {
    return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
    position: relative;
    max-width: 428px;
    width: 100%;
    min-height: 100vh;
    margin: auto;
    box-sizing: border-box;
    background: #FDFDFD;
    /* border: 4px solid black; */
    overflow: hidden;
    /* border-radius: 25px; */
`;
