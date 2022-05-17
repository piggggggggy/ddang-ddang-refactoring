import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Grid } from "../../../elements/index";
import { Text } from "../elements/index";

export default function Content(props) {
    const { list } = props;

    return (
        <>
            {list.map((li, idx) => (
                <>
                    <motion.div
                        key={li.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Grid justifyContent="space-between;">
                            <ProfilePicture layout />
                            <ListHeader>
                                <Text mystyles="margin-left: -30px; font-size: 15px; font-weight: bolder">
                                    {li.comment}
                                </Text>
                            </ListHeader>
                        </Grid>
                    </motion.div>
                </>
            ))}
        </>
    );
}

const ProfilePicture = styled(motion.div)`
    width: 40px;
    height: 40px;
    background-color: #666;
    border-radius: 20px;
`;

const ListHeader = styled(motion.div)`
    overflow-wrap: break-word;
    width: 200px;
    margin-left: 20px;
`;
