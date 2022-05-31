import styled, { keyframes } from "styled-components";

import { useEffect, useState } from "react";

export default function ToastPageMsg({ children, onToast, setOnToast, top }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (onToast && !open) {
            setOpen(true);
            setOnToast(false);

            setTimeout(() => {
                setOpen(false);
            }, 2000);
        } else {
            setOnToast(false);
        }
    }, [onToast]);

    return (
        <>
            {open && (
                <ToastMsg style={top ? { top: top } : {}}>
                    <p>{children}</p>
                </ToastMsg>
            )}
        </>
    );
}
const Toast = keyframes`

  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const ToastMsg = styled.div`
    position: fixed;
    left: calc(50vw - 115px);
    top: calc(50vh - 40px);
    width: 230px;
    min-height: 40px;
    opacity: 0;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.75);
    z-index: 9999;
    padding: 10px 15px;
    animation: ${Toast} 2000ms ease;
    & p {
        font-size: 14px;
        line-height: 1.2;
        color: #fff;
        text-align: center;
    }
`;
