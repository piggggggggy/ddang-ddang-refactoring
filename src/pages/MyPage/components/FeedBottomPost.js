import React, { useState, useEffect } from "react";
import Posts from "../components/Post";
import Pagination from "../components/Pagination";
import api from "../../../modules/api";

export default function BottomPost() {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [currentPosts, setCurrentPosts] = useState(null);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const [feed, setFeed] = React.useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await api.get("/api/players/mypage");

            if (res.data.rows.profile[0].completes !== null) {
                setFeed(
                    res.data.rows.profile[0].completes.filter((value) => {
                        return value.quest.type === "feed";
                    })
                );
            }

            if (feed !== null) {
                setCurrentPosts(feed.slice(indexOfFirstPost, indexOfLastPost));
            }
        };
        fetchPosts();
    }, [indexOfLastPost, indexOfFirstPost, feed]);

    // Get current posts
    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {currentPosts !== null && feed !== null && (
                <>
                    <Posts posts={currentPosts} />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={feed.length}
                        paginate={paginate}
                    />
                </>
            )}
        </div>
    );
}
