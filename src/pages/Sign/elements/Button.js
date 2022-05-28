import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Button(props) {
    const {
        key,
        mystyles,
        children,
        onClick,
        type,
        whileHover,
        animate,
        transition,
        disabled,
        initial,
    } = props;
    const styles = { mystyles };

    return (
        <>
            {props.disabled ? (
                <>
                    <Btn
                        {...styles}
                        key={key}
                        onClick={onClick}
                        type={type}
                        whileHover={whileHover}
                        initial={initial}
                        animate={animate}
                        transition={transition}
                        disabled
                    >
                        {children}
                    </Btn>
                </>
            ) : (
                <>
                    <Btn
                        {...styles}
                        key={key}
                        onClick={onClick}
                        type={type}
                        whileHover={whileHover}
                        animate={animate}
                        transition={transition}
                    >
                        {children}
                    </Btn>
                </>
            )}
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
