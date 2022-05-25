export const questFragment = (type) => {
    switch (type) {
        case "mob":
            return {
                color: "#EB6042",
                subColor: "#F3AC9C",
                text: "땅깨비를 이겨라!",
            };
        case "time":
            return {
                color: "#61B7FA",
                subColor: "#A3D4FB",
                text: "이 땅을 추천합니땅",
            };
        case "feed":
            return {
                color: "#EDEA50",
                subColor: "#F9F7A7",
                text: "땅땅! 시간이 없어요",
            };
        default:
            return {
                color: "#EB6042",
                subColor: "#F3AC9C",
                text: "땅깨비를 이겨라",
            };
    }
};
