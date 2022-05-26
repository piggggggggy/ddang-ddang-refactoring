import styled from "styled-components";
import { Grid } from "../../../elements";
import QuestItem from "../elements/QuestItem";

export default function QuestListConatiner({
    title,
    list,
    selectQuest,
    activateDetail,
}) {
    return (
        <Grid mystyles={"padding: 0 0 24px;"}>
            <Label>
                {title}
                <span>{list.length}</span>
            </Label>
            {list.map((item) => (
                <QuestItem
                    key={item.id}
                    {...item}
                    onClick={() => {
                        selectQuest({ lat: item.lat, lng: item.lng });
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
