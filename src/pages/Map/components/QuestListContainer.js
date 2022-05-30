import { useState } from "react";
import styled from "styled-components";
import { Grid } from "../../../elements";
import QuestItem from "../elements/QuestItem";

export default function QuestListConatiner({
    title,
    list,
    selectQuest,
    activateDetail,
    openState,
}) {
    const [open, setOpen] = useState(openState);

    const tabOpenHandler = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };
    return (
        <Grid mystyles={open ? "padding: 0 0 12px;" : "padding: 0"}>
            <Label onClick={tabOpenHandler}>
                {title}
                <span>{list.length}</span>
            </Label>
            {open &&
                list.map((item) => (
                    <QuestItem
                        key={item.id}
                        {...item}
                        onClick={() => {
                            selectQuest({ lat: item.lat, lng: item.lng });
                            console.log(item);
                            activateDetail(item);
                        }}
                    />
                ))}
        </Grid>
    );
}

const Label = styled.p`
    font-size: 14px;
    font-weight: 700;
    line-height: 1.15;
    padding-bottom: 16px;
    & span {
        color: #909090;
        padding-left: 5px;
    }
`;
