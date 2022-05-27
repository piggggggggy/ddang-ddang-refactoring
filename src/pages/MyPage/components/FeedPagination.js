import React from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Nav>
            <UnorderedList>
                {pageNumbers.map((number) => (
                    <List key={number}>
                        <div
                            onClick={() => paginate(number)}
                            className="page-link"
                        >
                            {number}
                        </div>
                    </List>
                ))}
            </UnorderedList>
        </Nav>
    );
};

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const UnorderedList = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding-right: 12%;
`;

const List = styled.li`
    margin-left: 10px;
    &: hover {
        color: black;
        background-color: ;
    }
    color: grey;
`;

export default Pagination;
