import { useState } from "react";
import BottomPost from "./BottomPost";
import FeedBottomPost from "./FeedBottomPost";
import MapView from "./Map";

export default function FooterContent() {
    const [tabIndex, setTabIndex] = useState(0);

    const changeTab = (index) => {
        if (index === tabIndex) return;
        setTabIndex(index);
    };

    return (
        <>
            <MapView tabIndex={tabIndex} changeTab={changeTab} />
            {tabIndex === 0 ? <BottomPost /> : <FeedBottomPost />}
        </>
    );
}
