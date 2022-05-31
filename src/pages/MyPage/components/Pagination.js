import React from "react";
import styled from "styled-components";

const Pagination = ({ postLength, setPage, page }) => {
    const pageCounts = (() => {
        if (postLength % 5 > 0) {
            return parseInt(postLength / 5) + 1;
        } else {
            return parseInt(postLength / 5);
        }
    })();

    const pageArray = Array.from(
        { length: pageCounts },
        (value, index) => index + 1
    );
    return (
        <Wrapper>
            {pageArray.map((number) => {
                return (
                    <Page key={number} onClick={() => setPage(number)}>
                        <p
                            style={
                                page === number
                                    ? { color: "#000", fontWeight: 700 }
                                    : {}
                            }
                        >
                            {number}
                        </p>
                    </Page>
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: auto;
    height: 52px;
    padding: 16px 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Page = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    & p {
        font-size: 12px;
        line-height: 1;
        color: #999fab;
    }
`;

export default Pagination;
