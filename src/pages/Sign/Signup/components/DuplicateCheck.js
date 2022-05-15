import React from "react";
import { Grid, Text } from "../../../../elements/index";

export default function DuplicateCheck(props) {
    return (
        <>
            <Grid justifyContent="space-between" mystyles="width: 250px; ">
                <Text mystyles="font-size:12px">{props.children}</Text>
                {props.duplicate && (
                    <Text
                        pointer
                        mystyles="font-size:12px; font-weight: bolder; color: blue"
                        onClick={props.onClick}
                    >
                        중복확인
                    </Text>
                )}
            </Grid>
        </>
    );
}
