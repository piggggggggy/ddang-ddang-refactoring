import React, { useState, useEffect } from "react";
import Posts from "../components/Post";
import Pagination from "../components/Pagination";
import api from "../../../modules/api";

export default function BottomPost() {
    const [posts, setPosts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [currentPosts, setCurrentPosts] = useState(null);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await api.get("/api/players/mypage");
            setPosts(res.data.rows.profile[0].completes);
            if (posts !== null) {
                setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
            }
        };
        fetchPosts();
    }, [indexOfLastPost, indexOfFirstPost, posts]);

    // Get current posts
    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {currentPosts !== null && posts !== null && (
                <>
                    <Posts posts={currentPosts} />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                    />
                </>
            )}
        </div>
    );
}
