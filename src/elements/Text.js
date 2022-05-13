import React from "react";
import styled from "styled-components";

export default function Text(props) {
    const { children, inlineStyles, pointer, onClick } = props;
    const styles = { inlineStyles, pointer };
    return (
        <P {...styles} onClick={onClick}>
            {children}
        </P>
    );
}

Text.defaultProps = {
    inlineStyles: false,
    pointer: false,
    onClick: () => {},
};

const P = styled.p`
    ${(props) => (props.inlineStyles ? `${props.inlineStyles}` : "")};
    ${(props) => (props.pointer ? "cursor:pointer" : "")};
`;
