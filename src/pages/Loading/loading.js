import loading from "../../assets/gif/NDND_splash.gif";
import Container from "../../elements/Container";

export default function Loading() {
    return (
        <Container>
            <img src={loading} alt="" />
            <button>시작하기</button>
        </Container>
    );
}
