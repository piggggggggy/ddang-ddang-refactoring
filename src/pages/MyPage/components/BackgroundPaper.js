import React from "react";
import styled from "styled-components";

export default function BackgroundPaper() {
    return (
        <>
            <Background />
        </>
    );
}

const Background = styled.div`
    position: absolute;
    top: -1280px;
    left: calc(50% - 750px);
    z-index: 0;
    width: 1500px;
    height: 1500px;
    background: #266137;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
`;
