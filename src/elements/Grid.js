import React from "react";
import styled from "styled-components";

export default function Grid(props) {
    const {
        children,
        flex,
        justifyContent,
        alignItems,
        direction,
        key,
        inlineStyles,
        onClick,
    } = props;

    const styles = {
        flex,
        justifyContent,
        alignItems,
        direction,
        inlineStyles,
    };

    return (
        <Wrapper key={key} {...styles} onClick={onClick}>
            {children}
        </Wrapper>
    );
}

Grid.defaultProps = {
    flex: true,
    justifyContent: "center",
    alignItems: "center",
    direction: "",
    inlineStyles: false,
    onClick: () => {},
    key: "",
};

const Wrapper = styled.div`
    width: 100%;
    ${(props) => (props.flex ? "display: flex" : "")};
    ${(props) =>
        props.justifyContent ? `justify-content: ${props.justifyContent}` : ""};
    ${(props) => (props.alignItems ? `align-items: ${props.alignItems}` : "")};
    ${(props) => (props.direction ? `flex-direction: ${props.direction}` : "")};
    ${(props) => (props.inlineStyles ? `${props.inlineStyles}` : "")};
`;
