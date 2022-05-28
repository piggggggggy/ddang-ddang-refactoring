import { useEffect, useRef, useState } from "react";
import { getUpdatedDistance } from "../../../modules/location";

const geolocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 1000,
};

const useWatchLocation = (questList, type) => {
    const [inCircleList, setInCircleList] = useState([]);
    const [currentMapPosition, setCurrentMapPosition] = useState({
        lat: 0,
        lng: 0,
    });
    const [position, setPosition] = useState({
        lat: 0,
        lng: 0,
    });
    const [isDrag, setIsDrag] = useState(false);
    const [record, setRecord] = useState(null);

    const watchId = useRef(null);

    const cancelWatchPosition = () => {
        if (navigator.geolocation && watchId.current) {
            navigator.geolocation.clearWatch(watchId.current);
        }
    };

    useEffect(() => {
        if (!isDrag) {
            if (!navigator.geolocation) {
                window.alert("gps 에러");
            }
            watchId.current = navigator.geolocation.watchPosition(
                (_position) => {
                    // console.log("와치 인", _position, type);
                    let filteredList = questList.filter((item) => {
                        let distance = getUpdatedDistance({
                            lat: _position.coords.latitude,
                            lng: _position.coords.longitude,
                            _lat: Number(item.lat),
                            _lng: Number(item.lng),
                        });
                        if (type === "all") {
                            return distance < 0.03 && !item.completed;
                        } else {
                            return (
                                distance < 0.03 &&
                                item.type === type &&
                                !item.completed
                            );
                        }
                    });
                    setInCircleList(filteredList);

                    let update = true;
                    const newRecord = {
                        lat: _position.coords.latitude,
                        lng: _position.coords.longitude,
                    };
                    if (record !== null) {
                        const distance = getUpdatedDistance({
                            lat: record.lat,
                            lng: record.lng,
                            _lat: newRecord.lat,
                            _lng: newRecord.lng,
                        });
                        if (distance < 0.01) update = false;
                    }
                    if (update) {
                        // console.log(update, '와치 업데이트 성공!!!!', "이전 :", record, "뉴 :", newRecord);
                        setRecord(newRecord);
                        setPosition(newRecord);
                    } else {
                        // console.log('와치 업데이트 실패');
                    }
                },
                (err) => {},
                { ...geolocationOptions }
            );
        }

        return cancelWatchPosition;
    }, [isDrag, record, questList]);

    return {
        currentMapPosition,
        setCurrentMapPosition,
        position,
        setPosition,
        cancelWatchPosition,
        isDrag,
        setIsDrag,
        inCircleList,
    };
};

export { useWatchLocation, geolocationOptions };
