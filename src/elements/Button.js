import React from "react";
import styled from "styled-components";

export default function Button(props) {
    const { mystyles, children, onClick, type } = props;
    const styles = { mystyles };

    return (
        <>
            <Btn {...styles} onClick={onClick} type={type}>
                {children}
            </Btn>
        </>
    );
}

Button.defaultProps = {
    mystyles: false,
    onClick: () => {},
};

const Btn = styled.button`
    ${(props) => (props.mystyles ? `${props.mystyles}` : "")};
`;
