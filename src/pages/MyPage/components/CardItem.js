import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Grid } from "../../../elements/index";
import { Text } from "../elements/index";
import Content from "./CardContent";

export default function Item(props) {
    const { item, onClick } = props;
    console.log(item);
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <div onClick={onClick}>
                <List
                    layout
                    onClick={toggleOpen}
                    initial={{ borderRadius: 10 }}
                >
                    <Grid justifyContent="space-between">
                        <ProfilePicture layout />
                        <ListHeader layout>
                            <Text mystyles="margin:0">
                                Title: {item?.quest?.title}
                            </Text>
                            <Text mystyles="margin:0">
                                location: {item?.region?.regionDong}
                            </Text>
                        </ListHeader>
                    </Grid>
                    <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
                </List>
            </div>
        </>
    );
}
const List = styled(motion.li)`
    background-color: rgba(214, 214, 214, 0.5);
    border-radius: 10px;
    padding: 20px;
    overflow: hidden;
    cursor: pointer;
`;

const ListHeader = styled(motion.div)`
    border: 2px solid red;
    overflow-wrap: break-word;
    width: 200px;
`;

const ProfilePicture = styled(motion.div)`
    width: 40px;
    height: 40px;
    background-color: #666;
    border-radius: 20px;
`;
