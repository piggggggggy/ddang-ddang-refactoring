import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Text(props) {
    const {
        children,
        mystyles,
        pointer,
        onClick,
        whileHover,
        animate,
        transition,
        initial,
    } = props;
    const styles = { mystyles, pointer };
    return (
        <P
            {...styles}
            onClick={onClick}
            whileHover={whileHover}
            animate={animate}
            transition={transition}
            initial={initial}
        >
            {children}
        </P>
    );
}

Text.defaultProps = {
    mystyles: false,
    pointer: false,
    onClick: () => {},
};

const P = styled(motion.p)`
    ${(props) => (props.mystyles ? `${props.mystyles}` : "")};
    ${(props) => (props.pointer ? "cursor:pointer" : "")};
`;
