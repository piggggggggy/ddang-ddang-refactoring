import { useEffect, useState } from "react";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import { Grid } from "../../elements/index";
import { useWatchLocation } from "./hooks/locationHooks";

export default function KakaoMap() {
  const { 
    currentMapPosition,
    setCurrentMapPosition,
    position, 
    setPosition, 
    cancelWatchPosition, 
    isDrag, 
    setIsDrag  
  } = useWatchLocation();


  const moveToCenter = () => {
    setIsDrag(false);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('center move', position);
      setCurrentMapPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })    
  }

  useEffect(() => {
    console.log('componentDidMount!')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        setCurrentMapPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  // useEffect(() => {
  //   if (!isDrag) return;
  //   cancelWatchPosition();
  // }, [isDrag, cancelWatchPosition])


  // to do list
  // - isDrag = true 즉 드래그모드일 때, 마커를 간단한 마커로 바꾸어보여주면 좋겠다.
  return (
    <Grid
      mystyles={"position: relative; z-index: 100; height: calc(100vh - 100px); width: 100%; margin: auto"}
    >
      <Map
          center={currentMapPosition}
          isPanto={true}
          onDragEnd={(map) => {
            setIsDrag(true)
            setCurrentMapPosition({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            })
          }} // 중심위치에서 이동 시켰는지?
          style={{ width: "100%", height: "100%" }}
      >
          <MapMarker position={position}>
              <Grid 
                flex
                justifyContent={"center"}
                alignItems={"center"}
                style={{ color: "#000" }}
              >
                <p>{isDrag ? "Drag Mode!" : "Center Mode"}</p>
              </Grid>
          </MapMarker>
          <Circle
              center={position}
              radius={50}
              strokeWeight={2} // 선의 두께입니다
              strokeColor={"#75B8FA"} // 선의 색깔입니다
              strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"dash"} // 선의 스타일 입니다
              fillColor={"#CFE7FF"} // 채우기 색깔입니다
              fillOpacity={0.4} // 채우기 불투명도 입니다
          />
      </Map>
      <Grid
        flex
        justifyContent={"center"}
        alignItems={"center"}
        mystyles={
          "width: 200px;height: 50px;border-radius: 15px; border: 1px solid #000"
        }
        onClick={moveToCenter}
      >
        <p>내 위치</p>
      </Grid>
    </Grid>
  )
}