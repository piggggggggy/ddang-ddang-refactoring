import React from "react";
import { motion } from "framer-motion";

export default function Animation() {
    return (
        <>
            <motion.h1
                animate={{
                    x: "100px",
                    fontSize: "20px",
                }}
            >
                Weeee I'm animated
            </motion.h1>
        </>
    );
}
