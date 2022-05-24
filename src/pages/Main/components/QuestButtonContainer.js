import { Grid } from "../../../elements/index";
import styled from "styled-components";
import { questFragment } from "../../../modules/fragment";

export default function QuestButtonContainer({ setType }) {
  return (
    <Wrapper>
      <ButtonItem onClick={() => setType("mob")}>
        <img src={questFragment("mob").img} alt={"mob"} />
        <p>몬스터대전</p>
      </ButtonItem>

      <Divider />

      <ButtonItem onClick={() => setType("time")}>
        <img src={questFragment("time").img} alt={"time"} />
        <p>타임어택</p>
      </ButtonItem>

      <Divider />

      <ButtonItem onClick={() => setType("feed")}>
        <img src={questFragment("feed").img} alt={"feed"} />
        <p>땅문서작성</p>
      </ButtonItem>

      <Divider />

      <ButtonItem onClick={() => setType("all")}>
        <img src={questFragment("all").img} alt={"all"} />
        <p>전체보기</p>
      </ButtonItem>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 104px;
  background: #fff;
  border-radius: 10px;
  padding: 0px 10px;
  margin-bottom: 43px;
  box-shadow: 1px 1px 1px 2px rgba(137, 142, 139, 0.05);
`;

const ButtonItem = styled.div`
  width: calc(25% - 1px);
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
  & p {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
    padding-top: 6px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 80px;
  background: #e4e4e4;
  /* margin: 0px 25px; */
`;
