import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

export default function Feed() {
    const token = getCookie("token");
    async function fetchData() {
        try {
            const response = await axios.get("/players/mypage", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);
    const userDetail = useSelector((state) => state.user);
    console.log(userDetail?.user);
    return <></>;
}
