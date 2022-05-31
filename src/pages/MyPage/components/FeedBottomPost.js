import React, { useState, useEffect } from "react";
import Posts from "../components/Post";
import Pagination from "../components/Pagination";
import api from "../../../modules/api";

export default function FeedBottomPost() {
    const [feeds, setFeeds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const setPage = (index) => {
        if (index === currentPage) return;
        setCurrentPage(index);
    };
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await api.get("/api/players/mypage");
            setFeeds(
                res.data.rows.profile[0].completes.filter((value) => {
                    return value.quest.type === "feed";
                })
            );
        };
        fetchPosts();
    }, []);

    return (
        <div>
            {feeds.length && (
                <>
                    <Posts
                        posts={feeds.slice(
                            (currentPage - 1) * 5,
                            currentPage * 5
                        )}
                    />
                    <Pagination
                        postLength={feeds.length}
                        setPage={setPage}
                        page={currentPage}
                    />
                </>
            )}
        </div>
    );
}
