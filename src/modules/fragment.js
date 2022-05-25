import RedCircle from "../assets/images/png/red-marker-circle.png";
import YellowCircle from "../assets/images/png/blue-marker-circle.png";
import BlueCircle from "../assets/images/png/yellow-marker-circle.png";
import MobLarge from "../assets/images/png/mob-large.png";
import TimeLarge from "../assets/images/png/time-large.png";
import FeedLarge from "../assets/images/png/feed-large.png";
import AllLarge from "../assets/images/png/all-large.png";

export const questFragment = (type) => {
    switch (type) {
        case "mob":
            return {
                title: "몬스터대전",
                text: "몬스터 대전하러 가기",
                color: "#EB6042",
                subColor: "#F3AC9C",
                text: "땅깨비를 이겨라!",
                icon: RedCircle,
                img: MobLarge,
            };
        case "time":
            return {
                title: "땅문서작성",
                text: "내 땅 점령하기",
                color: "#61B7FA",
                subColor: "#A3D4FB",
                text: "이 땅을 추천합니땅",
                icon: YellowCircle,
                img: FeedLarge,
            };
        case "feed":
            return {
                title: "타임어택",
                text: "타임어택하러 가기",
                color: "#EDEA50",
                subColor: "#F9F7A7",
                text: "땅땅! 시간이 없어요",
                icon: BlueCircle,
                img: TimeLarge,
            };
        case "all":
            return {
                title: "전체보기",
                text: "내 땅 점령하기",
                color: "",
                subColor: "",
                text: "",
                icon: BlueCircle,
                img: AllLarge,
            };
        default:
            return {
                title: "몬스터대전",
                color: "#EB6042",
                subColor: "#F3AC9C",
                text: "땅깨비를 이겨라",
                icon: RedCircle,
                img: MobLarge,
            };
    }
};
