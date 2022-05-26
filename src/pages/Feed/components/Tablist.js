import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Grid } from "../elements/index";

export default function Tablist(props) {
    return (
        <>
            <Grid
                flex
                direction="row"
                alignItems="center"
                justifyContent="center"
                mystyles="margin-top: 47px"
            >
                <Tabcard
                    initial={{ y: -250, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={props.getLatest}
                    style={
                        props.tabIndex === 0
                            ? {
                                  background: "#F3AC9C",
                                  color: "white",
                              }
                            : {
                                  background: "white",
                                  color: "#EB6042",
                              }
                    }
                >
                    {props.children}
                </Tabcard>
            </Grid>
        </>
    );
}

const Tabcard = styled(motion.div)`
    width: 112px;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    color: #c4c4c4;
    cursor: pointer;
`;
