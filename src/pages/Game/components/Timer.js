import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { padNumber, timeReverseCalculator } from "../../../modules/time";

export default function Timer({ time, openFailModal }) {
    const { subtractedSeconds } = timeReverseCalculator(time);
    console.log(subtractedSeconds);
    const existedTime = useRef(subtractedSeconds);
    const interval = useRef(null);
    const [hour, setHour] = useState(
        padNumber(Math.floor(subtractedSeconds / 60 / 60), 2)
    );
    const [min, setMin] = useState(
        padNumber(Math.floor((subtractedSeconds / 60) % 60), 2)
    );
    const [sec, setSec] = useState(padNumber(subtractedSeconds & 60, 2));

    useEffect(() => {
        interval.current = setInterval(() => {
            existedTime.current -= 1;
            setSec(padNumber(existedTime.current % 60, 2));
            setMin(padNumber(Math.floor((existedTime.current / 60) % 60), 2));
            setHour(padNumber(Math.floor(existedTime.current / 60 / 60), 2));
        }, 1000);
        return () => clearInterval(interval.current);
    }, []);

    useEffect(() => {
        if (existedTime.current <= 0) {
            clearInterval(interval.current);
            openFailModal();
        }
    }, [sec]);

    return (
        <TimerWrapper>
            <TimerText>
                {Number(hour) < 0 ? "00" : hour}:{Number(min) < 0 ? "00" : min}:
                {Number(sec) < 0 ? "00" : sec}
            </TimerText>
        </TimerWrapper>
    );
}

const TimerWrapper = styled.div`
    padding: 20px;
    margin: auto;
`;

const TimerText = styled.p`
    font-size: 28px;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
`;
