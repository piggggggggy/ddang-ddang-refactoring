import { Grid } from "../../../elements/index";
import styled from "styled-components";

export default function QuestItemForCarousel() {

  return (
    <Grid mystyles={'width: 128px; min-width: 128px; height: 106px; margin: 0px 8px;'}>
      <Card style={{background: '#61B7FA'}}>
        <IconWrapper>
          <img alt={"icon"}/>
        </IconWrapper>
        <Title>
          땅에 대한<br/>
          이야기 만땅
        </Title>
        <Description>어떠한 리뷰든 남겨주세요!</Description>
        <CardFooter style={{background: '#A3D4FB'}}>
          <p>내 위치로부터 30m</p>
        </CardFooter>
      </Card>
    </Grid>
  )
}

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 29px 11px 0;
  box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);
`
const IconWrapper = styled.div`
  position: absolute;
  top: -20px;
  left: 44px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #61B7FA;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

const Title = styled.p`
  padding: 0 0 5px ;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
`;

const Description = styled.p`
  font-size: 8px;
  line-height: 1.1;
  color: #fff;
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 0 11px;
  & p {
    font-size: 8px;
    font-weight: 700;
    line-height: 1.15;
    color: #fff;
  }
`