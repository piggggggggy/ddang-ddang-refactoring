import React from "react";
import { Grid, Text } from "../../../../elements/index";

export default function DuplicateCheck(props) {
    return (
        <>
            <Grid justifyContent="space-between" inlineStyles="width: 300px">
                <Text inlineStyles="font-size:12px">{props.children}</Text>
                {props.duplicate && (
                    <Text
                        pointer
                        inlineStyles="font-size:12px; font-weight: bolder; color: blue"
                        onClick={props.onClick}
                    >
                        중복확인
                    </Text>
                )}
            </Grid>
        </>
    );
}
