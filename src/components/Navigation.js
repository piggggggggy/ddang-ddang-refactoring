import styled from "styled-components";
import { Grid } from "../elements";
import NavigationMenu from "./NavigationMenu";
import LogoMedium from "../assets/images/png/logo-medium.png";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();
    const path = window.location.pathname.split("/")[1];

    const iterator = Array.from({ length: 5 }, () => 0);
    const selectedIndex = (() => {
        switch (path) {
            case "":
                return 0;
            case "ranking":
                return 1;
            case "feed":
                return 2;
            case "chat":
                return 3;
            case "myPage":
                return 4;
            default:
                return 0;
        }
    })();

    return (
        <NavigationWrapper>
            <NavigationCircle onClick={() => navigate("/quest")}>
                <img src={LogoMedium} alt={"logo medium"} />
            </NavigationCircle>
            <Grid
                mystyles={
                    "position: relative; z-index: 1001; background: #fff; width: 100%; height: 100%; display: flex;"
                }
            >
                {iterator.map((_, index) => (
                    <NavigationMenu
                        key={index}
                        index={index}
                        isSelected={index === selectedIndex}
                    />
                ))}
            </Grid>
        </NavigationWrapper>
    );
}

const NavigationWrapper = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 1000;
    display: flex;
    max-width: 428px;
    width: 100%;
    height: 64px;
    background: #fff;
    padding: 0;
`;

const NavigationCircle = styled.div`
    position: absolute;
    left: calc(50% - 48px);
    bottom: 42px;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 2px 2px 14px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        width: 48px;
        height: 48px;
        object-fit: contain;
    }
`;
