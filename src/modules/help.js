const localNameHandlerForSi = (si) => {
    if (
        si === "서울" ||
        si === "부산" ||
        si === "인천" ||
        si === "대전" ||
        si === "광주" ||
        si === "대구" ||
        si === "울산" ||
        si === "경주"
    ) {
        return si + "시";
    } else {
        return si;
    }
};

export { localNameHandlerForSi };
