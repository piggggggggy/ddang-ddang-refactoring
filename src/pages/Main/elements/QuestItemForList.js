import { Grid } from "../../../elements/index";
import styled from "styled-components";
import { questFragment } from "../../../modules/fragment";

export default function QuestItemForList(Props) {
  const fragment = questFragment(Props.type);

  return (
    <Card>
      <Grid
        flex
        // justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Icon>
          <img src={fragment.img} alt={"icon"} />
        </Icon>

        <Grid mystyles={"width: calc(100% - 83px);"}>
          <Title style={{ color: fragment.color }}>{Props.title}</Title>
          <Description>{Props.description}</Description>
        </Grid>

        <Grid
          flex
          direction={"column"}
          alignItems={"center"}
          mystyles={"width: 60px;"}
        >
          <Point style={{ color: fragment.color }}>{Props.reward},000P</Point>
          <Description>난이도</Description>
        </Grid>
      </Grid>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  height: 66px;
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);
  margin-bottom: 16px;
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 7px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.15;
  padding-bottom: 6px;
`;

const Description = styled.p`
  width: 90%;
  font-size: 10px;
  line-height: 1.15;
  color: #909090;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Point = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.15;
  padding-bottom: 7px;
`;
