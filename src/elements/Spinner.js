import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

export default function Spinner() {
    return (
        <SpinnerContainer>
            <LoadingContainer>
                <CircularProgress>Loading...</CircularProgress>
            </LoadingContainer>
        </SpinnerContainer>
    );
}

const SpinnerContainer = styled.div`
    position: relative;
    max-width: 428px;
    width: 100%;
    min-height: 100vh;
    margin: auto;
    box-sizing: border-box;
    background: #58e07e;
    border: 4px solid black;
    border-radius: 25px;
    display: flex;
    align-items: center;
`;

const LoadingContainer = styled.div`
    margin: auto;
`;
