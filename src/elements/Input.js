import React from "react";
import styled from "styled-components";

export default function Input(props) {
    const { inlineStyles, placeholder, onChange, defaultValue, type, id, ref } =
        props;
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

const I = styled.input`
    ${(props) => (props.inlineStyles ? `${props.inlineStyles}` : "")};
`;
