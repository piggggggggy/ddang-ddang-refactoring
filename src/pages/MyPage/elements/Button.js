import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Button(props) {
    const {
        mystyles,
        children,
        onClick,
        type,
        whileHover,
        animate,
        transition,
    } = props;
    const styles = { mystyles };

    return (
        <>
            <Btn
                {...styles}
                onClick={onClick}
                type={type}
                whileHover={whileHover}
                animate={animate}
                transition={transition}
            >
                {children}
            </Btn>
        </>
    );
}

Button.defaultProps = {
    onClick: () => {},
};

const Btn = styled(motion.button)`
    ${(props) => (props.mystyles ? `${props.mystyles}` : "")};
    cursor: pointer;
`;
