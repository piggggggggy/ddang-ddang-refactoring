import RedCircle from "../assets/images/png/red-marker-circle.png";
import YellowCircle from "../assets/images/png/blue-marker-circle.png";
import BlueCircle from "../assets/images/png/yellow-marker-circle.png";
import MobLarge from "../assets/images/png/mob-large.png";
import TimeLarge from "../assets/images/png/time-large.png";
import FeedLarge from "../assets/images/png/feed-large.png";
import AllLarge from "../assets/images/png/all-large.png";
import MobWin from "../assets/images/png/mob-win.png";
import TimeWin from "../assets/images/png/time-win.png";
import Rock from "../assets/images/png/rock.png";
import Scissors from "../assets/images/png/scissors.png";
import Paper from "../assets/images/png/paper.png";
export const questFragment = (type) => {
    switch (type) {
        case "mob":
            return {
                title: "몬스터대전",
                text: "몬스터 대전하러 가기",
                color: "#EB6042",
                subColor: "#F3AC9C",
                description: "땅깨비를 이겨라!",
                icon: RedCircle,
                img: MobLarge,
                winPaper: MobWin,
            };
        case "feed":
            return {
                title: "땅문서작성",
                text: "내 땅 점령하기",
                color: "#61B7FA",
                subColor: "#A3D4FB",
                description: "이 땅을 추천합니땅",
                icon: YellowCircle,
                img: FeedLarge,
                winPaper: "",
            };
        case "time":
            return {
                title: "타임어택",
                text: "타임어택하러 가기",
                color: "#EDEA50",
                subColor: "#F9F7A7",
                description: "땅땅! 시간이 없어요",
                icon: BlueCircle,
                img: TimeLarge,
                winPaper: TimeWin,
            };
        case "all":
            return {
                title: "전체보기",
                text: "내 땅 점령하기",
                color: "#5DEB85",
                subColor: "",
                description: "",
                icon: BlueCircle,
                img: AllLarge,
                winPaper: "",
            };
        default:
            return {
                title: "몬스터대전",
                color: "#EB6042",
                subColor: "#F3AC9C",
                text: "땅깨비를 이겨라",
                description: "땅깨비를 이겨라!",
                icon: RedCircle,
                img: MobLarge,
                winPaper: MobWin,
            };
    }
};

export const RSPFragmentList = [
    {
        text: "가위",
        activeImg: Scissors,
    },
    {
        text: "바위",
        activeImg: Rock,
    },
    {
        text: "보",
        activeImg: Paper,
    },
];
