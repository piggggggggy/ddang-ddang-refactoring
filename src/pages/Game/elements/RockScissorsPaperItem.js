import styled from "styled-components";
export default function RockScissorsPaperItem({
    text,
    img,
    isSelected,
    onClick,
    reverse = false,
    isResult = false,
}) {
    const Card = styled.div`
        padding: 8px;
        width: 80%;
        height: ${isResult ? "120px" : "calc((100% - 100px) / 3)"};
        border-radius: 10px;
        /* background: #F3AC9C; */
        background: #ebebeb;
        box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto 20px;
        & div {
            width: 60%;
            height: 100%;
            background: #fff;
            box-shadow: inherit;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            & img {
                height: 90%;
                object-fit: contain;
            }
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

    return (
        <Card
            style={isSelected ? { background: "#F3AC9C" } : {}}
            onClick={onClick}
        >
            {reverse ? (
                <>
                    <p>{text}</p>
                    <div>
                        <img src={img} alt={"rsp"} />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <img src={img} alt={"rsp"} />
                    </div>
                    <p>{text}</p>
                </>
            )}
        </Card>
    );
}
