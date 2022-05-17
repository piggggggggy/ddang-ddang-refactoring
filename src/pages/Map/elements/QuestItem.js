import styled from "styled-components";
import { Grid } from "../../../elements";
import { questFragment } from "../../../modules/fragment";

export default function QuestItem(Props) {
  const fragment = questFragment(Props.type);

  return (
    <Card>
      
      <Tip style={{background: fragment.subColor}}/>
      
      <Grid>
        <Title style={{color: fragment.color}}>{Props.title}</Title>
        <Description>{Props.description}</Description>
      </Grid>

      {Props.completed && (
        <Grid
          flex
          justifyContent={"center"}
          alignItems={"center"}
          mystyles={
            'position: absolute; z-index: 10; top: 0; left: 0; width: 100%; height: 100%; background: rgba(132, 132, 132, 0.75); border-radius: 10px;'
          }
        >
          <CompletedText><p>완료</p></CompletedText>
        </Grid>
      )}
    </Card>
  )
}

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 232px;
  height: 53px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);
  padding: 0 16px;
  margin-bottom: 8px;
`;
const Tip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: #A3D4FB;
`;

const CompletedText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 24px;
  background: #FFFFFF;
  border: 1px solid #5DEB85;
  transform: rotate(-5deg);
  & p {
    font-size: 10px;
    font-weight: 700;
    line-height: 1.15;
    color: #5DEB85;
  }
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 700;
  line-height: 1.15;
  padding-bottom: 10px;
`;

const Description = styled.p`
  width: 70%;
  font-size: 8px;
  font-weight: 700;
  line-height: 1.15;
  color: #BABABA;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;