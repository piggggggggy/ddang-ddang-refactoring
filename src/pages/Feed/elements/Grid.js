import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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
        whileHover,
        animate,
        transition,
        initial,
    } = props;

    const styles = {
        flex,
        justifyContent,
        alignItems,
        direction,
        mystyles,
    };

    return (
        <Wrapper
            key={key}
            {...styles}
            onClick={onClick}
            whileHover={whileHover}
            animate={animate}
            transition={transition}
            initial={initial}
        >
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

const Wrapper = styled(motion.div)`
    width: 100%;
    ${(props) => (props.flex ? "display: flex" : "")};
    ${(props) =>
        props.justifyContent ? `justify-content: ${props.justifyContent}` : ""};
    ${(props) => (props.alignItems ? `align-items: ${props.alignItems}` : "")};
    ${(props) => (props.direction ? `flex-direction: ${props.direction}` : "")};
    ${(props) => (props.mystyles ? `${props.mystyles}` : "")};
`;
