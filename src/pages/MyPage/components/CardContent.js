import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Grid } from "../../../elements/index";

export default function Content() {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Grid justifyContent="space-between">
                <ProfilePicture layout />
                <h2>댓글</h2>
            </Grid>
            <ProfilePicture layout />
        </motion.div>
    );
}

const ProfilePicture = styled(motion.div)`
    width: 40px;
    height: 40px;
    background-color: #666;
    border-radius: 20px;
`;
