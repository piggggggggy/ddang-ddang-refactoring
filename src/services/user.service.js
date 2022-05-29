import api from "../modules/api";

const getMypage = () => {
    return api.get("/api/players/mypage");
};

const playerEdit = async (nickname, profileImg) => {
    return await api.patch("/api/players/edit", {
        nickname,
        profileImg,
    });
};

const UserService = {
    getMypage,
    playerEdit,
};
export default UserService;
