import React from "react";
import styled from "styled-components";

export default function Button(props) {
    const { inlineStyles, children, onClick, type } = props;
    const styles = { inlineStyles };

    return (
        <>
            <Btn {...styles} onClick={onClick} type={type}>
                {children}
            </Btn>
        </>
    );
}

Button.defaultProps = {
    inlineStyles: false,
    onClick: () => {},
};

const Btn = styled.button`
    ${(props) => (props.inlineStyles ? `${props.inlineStyles}` : "")};
`;
