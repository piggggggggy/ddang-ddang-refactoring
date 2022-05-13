import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Button(props) {
    const { inlineStyles, children, onClick, type, whileHover } = props;
    const styles = { inlineStyles };

    return (
        <>
            <Btn
                {...styles}
                onClick={onClick}
                type={type}
                whileHover={whileHover}
            >
                {children}
            </Btn>
        </>
    );
}

Button.defaultProps = {
    inlineStyles: false,
    onClick: () => {},
};

const Btn = styled(motion.button)`
    ${(props) => (props.inlineStyles ? `${props.inlineStyles}` : "")};
    cursor: pointer;
`;
