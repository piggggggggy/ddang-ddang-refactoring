import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function ProgressBar(props) {
    const { mystyles } = props;
    const styles = { mystyles };
    return <Progress {...styles}></Progress>;
}

const Progress = styled(motion.div)`
    ${(props) => (props.mystyles ? `${props.mystyles}` : "")};
`;
