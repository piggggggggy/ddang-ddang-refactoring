import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NavigationMenu({ index, isSelected }) {
    const navigate = useNavigate();

    const menuList = [
        { title: "홈" },
        { title: "랭킹" },
        { title: "피드" },
        { title: "채팅" },
        { title: "MY" },
    ];
    const currentMenu = menuList[index];

    const moveToPageTop = () => {
        window.scrollTo(0, 0);
    };

    const moveToPage = () => {
        switch (index) {
            case 0:
                navigate("/");
                return;
            case 1:
                navigate("/ranking");
                return;
            case 2:
                navigate("/feed");
                return;
            case 3:
                navigate("/chat/1/pol/wer");
                return;
            case 4:
                navigate("/myPage");
                return;
            default:
                navigate("/");
                return;
        }
    };

    return (
        <MenuItem
            onClick={() => {
                moveToPage();
                moveToPageTop();
            }}
        >
            <span style={isSelected ? { color: "#5DED86" } : {}}>
                {currentMenu.title}
            </span>
        </MenuItem>
    );
}

const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 64px;
    & span {
        font-size: 16px;
        line-height: 1.15;
        text-align: center;
        color: #dddddd;
    }
`;
