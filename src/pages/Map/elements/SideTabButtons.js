import styled from "styled-components";

export default function SideTabButtons() {
  

  return (
    <Wrapper>
      <Button><p>알림</p></Button>
      <Divider/>
      <Button><p>스크랩</p></Button>
      <Divider/>
      <Button><p>랭킹</p></Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 32px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
`;
const Button = styled.div`
  width: calc((100% - 1px) / 3);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 10px;
    line-height: 1.1;
    color: #273938;
  }
`;

const Divider = styled.div`
  width: 0.5px;
  height: 24px;
  background: #A6A6A6;
`;