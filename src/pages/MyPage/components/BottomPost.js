import React, { useState, useEffect } from "react";
import Posts from "../components/Post";
import Pagination from "../components/Pagination";
import api from "../../../modules/api";

export default function BottomPost() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const setPage = (index) => {
        if (index === currentPage) return;
        setCurrentPage(index);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await api.get("/api/players/mypage");
            setPosts(res.data.rows.profile[0].completes);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            {posts.length && (
                <>
                    <Posts
                        posts={posts.slice(
                            (currentPage - 1) * 5,
                            currentPage * 5
                        )}
                    />
                    <Pagination
                        postLength={posts.length}
                        setPage={setPage}
                        page={currentPage}
                    />
                </>
            )}
        </div>
    );
}
