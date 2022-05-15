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
        mystyles,
        onClick,
    } = props;

    const styles = {
        flex,
        justifyContent,
        alignItems,
        direction,
        mystyles,
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
    mystyles: false,
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
    ${(props) => (props.mystyles ? `${props.mystyles}` : "")};
`;
