import api from "./api"
import { getWithExpiry } from "../modules/localStorageControl"

// const headers = {
//   headers: {
//     Authorization: getWithExpiry("accessToken"),
//   },
// }

const getMypage = () => {
  return api.get("/api/players/mypage")
}

const playerEdit = async (nickname, profileImg) => {
  try {
    await axios.patch("/api/players/edit", {
      nickname,
      profileImg,
    })
  } catch (err) {
    console.log(err.message)
  }
}

const UserService = {
  getMypage,
  playerEdit,
}
export default UserService
