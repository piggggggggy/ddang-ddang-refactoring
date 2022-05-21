import React from "react";
import styled from "styled-components";

export default function Text(props) {
    const { children, mystyles, pointer, onClick } = props;
    const styles = { mystyles, pointer };
    return (
        <P {...styles} onClick={onClick}>
            {children}
        </P>
    );
}

Text.defaultProps = {
    mystyles: false,
    pointer: false,
    onClick: () => {},
};

const P = styled.p`
    ${(props) => (props.mystyles ? `${props.mystyles}` : "")};
    ${(props) => (props.pointer ? "cursor:pointer" : "")};
`;
