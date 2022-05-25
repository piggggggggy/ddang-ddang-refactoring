import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ProgressDonut = (props) => {
    const [offset, setOffset] = useState(0);
    const circleRef = useRef(null);
    const {
        size,
        progress,
        strokeWidth,
        circleOneStroke,
        circleTwoStroke,
        children,
        onClick,
    } = props;

    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);
        circleRef.current.style =
            "transition: stroke-dashoffset 850ms ease-in-out;";
    }, [setOffset, circumference, progress, offset]);

    return (
        <>
            <Svg width={size} height={size}>
                <BackgroundCircle
                    stroke={circleOneStroke}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <ProgressCircle
                    ref={circleRef}
                    stroke={circleTwoStroke}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                <Text onClick={onClick} x={`${center}`} y={`${center + 7}`}>
                    {children}
                </Text>
            </Svg>
        </>
    );
};

ProgressDonut.propTypes = {
    size: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    circleOneStroke: PropTypes.string.isRequired,
    circleTwoStroke: PropTypes.string.isRequired,
};

ProgressDonut.defaultProps = {
    onClick: () => {},
};

const Svg = styled.svg`
    display: block;
    margin: 20px auto;
    max-width: 100%;
`;

const BackgroundCircle = styled.circle`
    fill: none;
`;

const ProgressCircle = styled.circle`
    fill: none;
`;

const Text = styled.text`
    font-size: 2rem;
    text-anchor: middle;
    fill: black;
    font-weight: bold;
    cursor: pointer;
`;

export default ProgressDonut;
