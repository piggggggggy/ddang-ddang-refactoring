import styled from "styled-components";

export default function RockScissorsPaperItem({ text, isSelected, onClick, reverse=false }) {
  
  return (
    <Card 
      style={isSelected ? {background: '#F3AC9C'} : {}}
      onClick={onClick}
    > 
      {reverse ? (
        <>
          <p>{text}</p>
          <div>
            <img/>
            이미지
          </div>
        </>
      ) : (
        <>
          <div>
            <img/>
            이미지
          </div>
          <p>{text}</p>
        </>
      )}
    </Card>
  )
}

const Card = styled.div`
  padding: 8px;
  width: 100%;
  height: 120px;
  border-radius: 10px;
  /* background: #F3AC9C; */
  background: #EBEBEB;
  box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  & div {
    width: 60%;
    height: 100%;
    background: #fff;
    box-shadow: inherit;
    border-radius: 10px;
  }
  & p {
    width: 40%;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    color: #273938;
    line-height: 1.15;
  }
`;

