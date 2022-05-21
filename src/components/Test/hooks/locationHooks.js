import { useEffect, useRef, useState } from "react"
import { getUpdatedDistance } from "../../../modules/location";

const geolocationOptions = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 5000,
}

const useWatchLocation = () => {
  const [currentMapPosition, setCurrentMapPosition] = useState({
    lat: 0,
    lng: 0
  });
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  })
  const [isDrag, setIsDrag] = useState(false);
  const [record, setRecord] = useState(null);

  const watchId = useRef(null);

  const cancelWatchPosition = () => {
    if (navigator.geolocation && watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
    }
  }

  // useEffect(() => {
    if (!isDrag) {
      if (!navigator.geolocation) {
        window.alert('gps 에러');
      }
      console.log('와치 작동');
      watchId.current = navigator.geolocation.watchPosition(
        (_position)=> {
          // console.log(_position.coords)
          let update = true;
          const newRecord = {
            lat: _position.coords.latitude,
            lng: _position.coords.longitude,
          }
          if (record !== null) {
            const distance = getUpdatedDistance({ lat: record.lat, lng: record.lng, _lat: newRecord.lat, _lng: newRecord.lng})
            if (distance < 0.03) update = false;
          }
          if (update) {
            // console.log(update, '와치 업데이트 성공!!!!', "이전 :", record, "뉴 :", newRecord);
            setRecord(newRecord);
            setPosition(newRecord);
          } else {
            // console.log('와치 업데이트 실패');
          }
        },
        (err)=>{},
        // {...geolocationOptions},
      )
    }

    // watchId.current = navigator.geolocation.watchPosition(
    //   (position) => {
    //     console.log("check", position)
    //   }
    // )
    
    // return cancelWatchPosition;
  // }, [isDrag, record]);

  return {
    currentMapPosition,
    setCurrentMapPosition,
    position,
    setPosition,
    cancelWatchPosition,
    isDrag,
    setIsDrag,
  }
}



export {
  useWatchLocation,
  geolocationOptions,

}