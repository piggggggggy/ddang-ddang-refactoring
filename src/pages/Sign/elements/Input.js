import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Input(props) {
    const {
        inlineStyles,
        placeholder,
        onChange,
        defaultValue,
        type,
        id,
        ref,
        whileFocus,
    } = props;
    const styles = { inlineStyles };

    return (
        <InputField>
            <I
                {...styles}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                id={id}
                ref={ref}
                whileFocus={whileFocus}
            />
        </InputField>
    );
}

Input.defaultProps = {
    inlineStyles: false,
    eyeIconRender: false,
    placeholder: "",
    onChange: () => {},
};

const InputField = styled.div`
    padding: 5px;
    position: relative;
`;

const I = styled(motion.input)`
    ${(props) => (props.inlineStyles ? `${props.inlineStyles}` : "")};
    &:focus {
        outline: none;
    }
    outline: none;
    text-align: center;
`;
