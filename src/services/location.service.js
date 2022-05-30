import KakaoService from "./kakao.service";

export const setLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
        //현재 좌표값을 가져와서 구조분해 할당한다.
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

            return currentLocation;
        } 
    });
};

// const userdata = await KakaoService.getAddress({
//     location: {lat: lat, lng: lng},
// });

// 만약에 사용자의 위치에서 시구동을 못가져오면 현재 가능한지 않는 지역에 있습니다.

//             console.log(userdata);
//             // 주소가 아무것도 없다고 나오면 강제로 주소를 정해준다.
//             if (
//                 typeof userdata.si == "undefined" &&
//                 typeof userdata.gu == "undefined" &&
//                 typeof userdata.dong == "undefined"
//             ) {
//                 //이상한 주소

//                 const tempLocation = {
//                     lat: 37.5172363,
//                     lng: 127.0473248,
//                 };

//                 // 쾌스트를 받아서 셋 해준다.
//                 const data = await getQuestList(tempLocation);
//                 const { regionDong, regionGu, regionSi } = data.currentRegion;
//                 console.log(data)
//                 console.log(regionDong, regionGu, regionSi);

//                 if (data.rows.length > 0) {
//                     setQuestList(data.rows);
//                     dispatch(
//                         userActions.setQuest({
//                             list: data.rows,
//                             region: data.currentRegion,
//                         })
//                     );
//                 }

//                 setRegion(data.currentRegion);

//                 return alert("현재 가능한 지역이 아닙니다. 가상환경에서 시작합니다.");
//             } else {
//                 //  퀘스트를 가져온다
//                 const data = await getQuestList(
//                     res.coords.latitude,
//                     res.coords.longitude
//                 );

//                 if (data.rows.length > 0) {
//                     setQuestList(data.rows);
//                     dispatch(
//                         userActions.setQuest({
//                             list: data.rows,
//                             region: data.currentRegion,
//                         })
//                     );
//                 }
//                 setRegion(data.currentRegion);
//             }
//             console.log(userdata);

//             setTimeout(() => {
//                 setLoading(false);
//             }, 200);
// }
