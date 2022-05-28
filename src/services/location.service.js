import KakaoService from "./kakao.service";

export const setLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
        //현재 좌표값을 가져와서 구조분해 할당한다.

        console.log(res)
        const { latitude, longitude } = res.coords;

        //
        const userdata = await KakaoService.getAddress({
            location: { latitude, longitude },
        });

        if (
            typeof userdata.si == "undefined" &&
            typeof userdata.gu == "undefined" &&
            typeof userdata.dong == "undefined"
        ) {
            //이상한 주소

            const tempLocation = {
                lat: 37.5172363,
                lng: 127.0473248,
            };

        return userdata;
        }
    });
};

export default setLocation;
