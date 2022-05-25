import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { motion, AnimateSharedLayout } from "framer-motion"
import { Text, Button, Grid } from "../Feed/elements/index"
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import CardItem from "../Feed/components/CardItem"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import TokenService from "../../services/token.service"
import { getFeedsAxios } from "../../store/thunk-actions/feedActions"

export default function Feed() {
  const token = TokenService.getLocalAccessToken

  const dispatch = useDispatch()
  const playerId = useSelector((state) => state?.user?.user?.playerId)
  console.log(playerId)

  // 시 구 동 정보 body로 request 보내기
  React.useEffect(() => {
    const region = {
      regionSi: "서울시",
      regionGu: "강남구",
      regionDong: "삼성동",
    }
    dispatch(getFeedsAxios(token, region))
  }, [dispatch, token])

  const feeds = useSelector((state) => state?.feed?.feeds)
  console.log(feeds)
  console.log(feeds[0]?.quest?.lat)
  console.log(feeds[1]?.quest?.lng)

  console.log(items)

  // 지도 경도 표시

  const [feedLocation, setFeedLocation] = React.useState([
    "33.5563",
    "126.79581",
    "현재 내 위치",
  ])

  console.log(feedLocation)
  console.log(parseFloat(feedLocation[0]).toFixed(4))
  console.log(parseFloat(feedLocation[1]).toFixed(4))

  // 카테고리
  const [category, setCategory] = React.useState("1")
  console.log(category)

  return (
    <>
      <Background>
        <motion.div
          style={{
            backgroundColor: "rgba(88, 224, 126, 0.8)",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            height: "30vh",
            position: "absolute",
            width: "100%",
          }}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, padding: "20px" }}
          transition={{ delay: 0.1 }}
          style={{ zIndex: 1 }}
        >
          <Grid direction="row" justifyContent="space-between">
            <Text></Text>
            <Text mystyles="font-weight: 600; font-size: 20px; z-index:1; color: white;">
              <LocationOnIcon />
              서울 특별시 용산구 보광동
            </Text>
            <Text></Text>
          </Grid>
          <Grid
            justifyContent="space-between"
            mystyles="width: 250px; margin: auto;"
          >
            <Button
              onClick={() => {
                setCategory("1")
              }}
              mystyles="background-color: rgba(243,172,156,0.9);z-index: 2; border: none; border-radius: 10px; width: 70px; height: 25px;color: white"
            >
              인기순
            </Button>
            <Button
              onClick={() => {
                setCategory("2")
              }}
              mystyles="background-color: rgba(237,234,80,0.9);z-index: 2; border: none; border-radius: 10px; width: 70px; height: 25px;color: white"
            >
              최신순
            </Button>
            <Button
              onClick={() => {
                setCategory("3")
              }}
              mystyles="background-color: rgba(163, 212, 251, 0.8);z-index: 2; border: none; border-radius: 10px; width: 70px; height: 25px;color: white"
            >
              인기순
            </Button>
          </Grid>
        </motion.div>
        <Grid>
          <MapContaner animate={{ opacity: 1 }}>
            <Map
              center={{
                lat: parseFloat(feedLocation[0]).toFixed(4),
                lng: parseFloat(feedLocation[1]).toFixed(4),
              }}
              level={5}
              style={{
                width: "350px",
                height: "270px",
                position: "relative",
              }}
            >
              <MapMarker
                position={{
                  lat: parseFloat(feedLocation[0]).toFixed(4),
                  lng: parseFloat(feedLocation[1]).toFixed(4),
                }}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                  size: {
                    widht: 24,
                    height: 35,
                  }, // 마커이미지의 크기입니다
                }}
              ></MapMarker>
              {/* <CustomOverlayMap
                                position={{
                                    lat: parseFloat(feedLocation[0]).toFixed(4),
                                    lng: parseFloat(feedLocation[1]).toFixed(4),
                                }}
                                yAnchor={3}
                                xAnchor={0.3}
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "25px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "10px",
                                }}
                            >
                                <Text
                                    initial={{ y: -5 }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        yoyo: Infinity,
                                    }}
                                    mystyles="color: rgba(243,172,156,0.9); font-size: 20px; font-weight: 800; margin: auto"
                                >
                                    땅문서
                                </Text>
                            </CustomOverlayMap> */}
            </Map>
          </MapContaner>
        </Grid>

        <Grid
          direction="column"
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimateSharedLayout>
            {items.map((feed, idx) => (
              <UnorderedList layout initial={{ borderRadius: 25 }}>
                <CardItem
                  page={category}
                  onClick={() => {
                    setFeedLocation([
                      items[idx]?.quest?.lat,
                      items[idx]?.quest?.lng,
                      items[idx]?.id,
                    ])
                  }}
                  key={idx}
                  item={feed}
                  id={feed[idx]?.id}
                />
              </UnorderedList>
            ))}
          </AnimateSharedLayout>
        </Grid>
      </Background>
    </>
  )
}

const Background = styled.div`
  position: relative;
`

const MapContaner = styled(motion.div)`
  border-radius: 50px;
  overflow: hidden;
`

const UnorderedList = styled(motion.ul)`
  width: 350px;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 10px;
  border-radius: 25px;
  margin-bottom: 5px;
`

// 대전
// (36.320485, 127.399521)
// 수원
// 37.237824, 127.023137;
const items = [
  {
    id: 1,
    image1_url: "111",
    image2_url: "222",
    image3_url: "333",
    content: "new oneeee",
    createdAt: "2022-05-12T01:00:57.861Z",
    updatedAt: "2022-05-13T05:53:41.100Z",
    deletedAt: null,
    quest: {
      id: 2,
      lat: "36.320485",
      lng: "127.399521",
      type: "",
      title: "test title2",
      description: "test description2",
      difficulty: 3,
      reward: 2,
      timeUntil: null,
    },
    player: {
      id: 1,
      email: "test@test.com",
      nickname: "kiwooseok",
      mbti: "intp",
      profileImg: "s3-upload",
      level: 1,
      exp: 0,
    },
    comments: [
      {
        id: 4,
        comment: "lets gooooo",
        createdAt: "2022-05-12T03:50:10.513Z",
        updatedAt: "2022-05-12T03:50:10.513Z",
        deletedAt: null,
      },
    ],
    likes: [
      {
        id: 2,
      },
    ],
    region: {
      id: 1,
      date: "2022-05-13 10:01:40",
      regionSi: "대전시",
      regionGu: "중구",
      regionDong: "목동",
    },
    likeCnt: 1,
    liked: true,
    commentCnt: 1,
  },
  {
    id: 2,
    image1_url: "iii",
    image2_url: "kkk",
    image3_url: "aaa",
    content: "second content",
    createdAt: "2022-05-12T01:22:15.000Z",
    updatedAt: "2022-05-13T05:53:41.100Z",
    deletedAt: null,
    quest: {
      id: 3,
      lat: "37.237824",
      lng: "127.023137",
      type: "",
      title: "test title3",
      description: "test description3",
      difficulty: 2,
      reward: 1,
      timeUntil: null,
    },
    player: {
      id: 1,
      email: "test@test.com",
      nickname: "kiwooseok",
      mbti: "intp",
      profileImg: "s3-upload",
      level: 1,
      exp: 0,
    },
    comments: [
      {
        id: 3,
        comment: "lets go",
        createdAt: "2022-05-12T03:49:44.644Z",
        updatedAt: "2022-05-12T03:49:44.644Z",
        deletedAt: null,
      },
      {
        id: 2,
        comment: "asdf",
        createdAt: "2022-05-12T02:04:26.000Z",
        updatedAt: "2022-05-12T02:43:23.226Z",
        deletedAt: null,
      },
      {
        id: 1,
        comment: "tdddest comment",
        createdAt: "2022-05-12T01:47:45.408Z",
        updatedAt: "2022-05-12T02:03:51.000Z",
        deletedAt: null,
      },
    ],
    likes: [
      {
        id: 3,
      },
    ],
    region: {
      id: 1,
      date: "2022-05-13 10:01:40",
      regionSi: "서울시",
      regionGu: "강남구",
      regionDong: "삼성동",
    },
    likeCnt: 1,
    liked: true,
    commentCnt: 3,
  },
  {
    id: 3,
    image1_url: "000",
    image2_url: "yyy",
    image3_url: "rrr",
    content: "testtest333",
    createdAt: "2022-05-12T06:19:43.000Z",
    updatedAt: "2022-05-13T05:53:41.100Z",
    deletedAt: null,
    quest: {
      id: 1,
      lat: "37.508498",
      lng: "127.454534",
      type: "",
      title: "test title",
      description: "test description",
      difficulty: 3,
      reward: 2,
      timeUntil: null,
    },
    player: {
      id: 2,
      email: "test2@test.com",
      nickname: "wsssss",
      mbti: "esfp",
      profileImg: "ssssssss",
      level: 1,
      exp: 0,
    },
    comments: [],
    likes: [],
    region: {
      id: 1,
      date: "2022-05-13 10:01:40",
      regionSi: "경기도",
      regionGu: "수원",
      regionDong: "군사시설",
    },
    likeCnt: 0,
    liked: false,
    commentCnt: 0,
  },
]
