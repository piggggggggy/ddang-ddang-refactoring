import api from "./api";

const getMypage = () => {
    return api.get("/api/players/mypage");
};

const playerEdit = async (nickname, profileImg) => {
    try {
        await api.patch("/api/players/edit", {
            nickname,
            profileImg,
        });
    } catch (err) {
        console.log(err.message);
    }
};

const UserService = {
    getMypage,
    playerEdit,
};
export default UserService;
