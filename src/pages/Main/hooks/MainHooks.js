import { FlashOnOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getQuestList } from "../../../apis/mainApi";

const useMainData = () => {
  const [loading, setLoading] = useState(false);
  const [questList, setQuestList] = useState([]);
  const [questType, setQuestType] = useState('all');
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  })

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition( async (res) => {
      setLocation({
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      })
      const data = await getQuestList(res.coords.latitude, res.coords.longitude);
      console.log(res);
      if (data.rows.length > 0) {
        setQuestList(data.rows)
      }
      setTimeout(() => {
        setLoading(false)
      }, 200)
    });
  }, [])


  return {
    questList,
    loading,
    questType,
    setQuestType,
    location,
  }
}

export {
  useMainData,
}