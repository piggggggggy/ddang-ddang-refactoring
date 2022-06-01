import React from "react";

import { Grid, Text } from "../elements/index";

const Posts = ({ posts }) => {
    return (
        <Grid mystyles="margin-top: 33px;">
            {posts.map((post) => (
                <Grid mystyles="margin-top: 10px; border-radius: 4px; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);">
                    {post.quest.type === "mob" && (
                        <Grid
                            flex
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            key={post.id}
                            mystyles="width: 352px; height: 53px;"
                        >
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="background: #F3AC9C; height: 53px; width: 253px; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); border-radius: 4px 0px 0px 4px;"
                            >
                                <Text mystyles="font-weight: 700; font-size: 12px; color: rgba(5, 36, 14, 0.5);">
                                    {post.createdAt
                                        .substring(5, 10)
                                        .replace("-", ".")}
                                </Text>
                            </Grid>
                            <Grid mystyles="width: 630px; font-weight: 700; font-size: 12px; line-height: 14px; padding: 5px; margin-left: 10px;">
                                <Text mystyles="font-weight: 700; font-size: 12px;">
                                    {post.quest.title}
                                </Text>
                                <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px;">
                                    {post.quest.description}
                                </Text>
                            </Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="height: 53px; width: 200px;"
                            >
                                <Text mystyles="margin-top: 18px; font-weight: 700;font-size: 10px;">
                                    {post.quest.reward}P
                                </Text>
                            </Grid>
                        </Grid>
                    )}
                    {post.quest.type === "feed" && (
                        <Grid
                            flex
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            key={post.id}
                            mystyles="width: 352px; height: 53px;"
                        >
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="background: #A3D4FB; height: 53px; width: 253px; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); border-radius: 4px 0px 0px 4px;"
                            >
                                <Text mystyles="font-weight: 700; font-size: 12px; color: rgba(5, 36, 14, 0.5);">
                                    {post.createdAt
                                        .substring(5, 10)
                                        .replace("-", ".")}
                                </Text>
                            </Grid>
                            <Grid mystyles="width: 630px; font-weight: 700; font-size: 12px; line-height: 14px; padding: 5px; margin-left: 10px;">
                                <Text>{post.quest.title}</Text>
                                <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px;">
                                    {post.quest.description}
                                </Text>
                            </Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="height: 53px; width: 200px;"
                            >
                                <Text mystyles="margin-top: 18px; font-weight: 700;font-size: 10px;">
                                    {post.quest.reward}P
                                </Text>
                            </Grid>
                        </Grid>
                    )}
                    {post.quest.type === "time" && (
                        <Grid
                            flex
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            key={post.id}
                            mystyles="width: 352px; height: 53px;"
                        >
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="background: #F9F7A7; height: 53px; width: 253px; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); border-radius: 4px 0px 0px 4px;"
                            >
                                <Text mystyles="font-weight: 700; font-size: 12px; color: rgba(5, 36, 14, 0.5);">
                                    {post.createdAt
                                        .substring(5, 10)
                                        .replace("-", ".")}
                                </Text>
                            </Grid>
                            <Grid mystyles="width: 630px; font-weight: 700; font-size: 12px; line-height: 14px; padding: 5px; margin-left: 10px;">
                                <Text>{post.quest.title}</Text>
                                <Text mystyles="font-weight: 400; font-size: 8px; margin-top: 5px;">
                                    {post.quest.description}
                                </Text>
                            </Grid>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="height: 53px; width: 200px;"
                            >
                                <Text mystyles="margin-top: 18px; font-weight: 700;font-size: 10px;">
                                    {post.quest.reward}P
                                </Text>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
