import { useNavigate } from 'react-router-dom';

export default function BackArrowBtn({ onClickEvent }) {
  const navigate = useNavigate();
  const onClick = () => {
    onClickEvent ? onClickEvent() : navigate(-1);
  }
  return (
      <span style={{height: 24}} onClick={onClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#000" strokeWidth="1.4" fill="none" fillRule="evenodd">
            <path d="M8.071 19.071 1 12l7.071-7.071M1.5 12H24"/>
          </g>
        </svg>
      </span>
  );
}