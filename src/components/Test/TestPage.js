import styled from "styled-components";
import { Container, Grid } from "../../elements/index";
import KakaoMap from "./KakaoMap";

export default function TestPage() {
    return (
        <Container>
            <Grid
                flex
                justifyContent={"center"}
                alignItems={"center"}
                mystyles={"height: 200px"}
            >
                <Title>테스트</Title>
            </Grid>
            <KakaoMap />
        </Container>
    );
}

const Title = styled.p`
    font-size: 50px;
    font-weight: bold;
`;
