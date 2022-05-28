import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function ProfilePreview(props) {
    const { mystyles, whileHover, animate, transition, initial } = props;
    const styles = { mystyles };
    const defaultimg =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACACAMAAAC2o+JuAAAAM1BMVEX39/eysbDp6emrqqn6+vqvrq3z8/O5uLfw8PDm5ubV1dTt7e3DwsHNzMy8u7rb2trg4OCVpRZYAAAECUlEQVR4nO2b7ZKrIAyG1QYRUPD+r/aAX+t2awskxHrG98e2O7M7fRpIIPBaVbdu3br1fwoA/I/55Uvl0To1Ou3lRmWqL0SFqm10L0Vdi0n+VfZaddU3oQKoQdYBbi//uxzU14BCp+XjCfEHVeruG0Ch0vKAcSGV+gsi6uq3kBNo7c4Fha7/CDmpNydyQkQot4Cex6kjIScN5zBCFTnga0Bte0ZA2zRKz3nKBE2lPCee6ZQhni0vJAwZlIGTNZyQlON7Ts1J2eRBBim+eLY2H1N2XJTZQx4kBqZwQoOg9JwND2dmlm+YPQtlpVCUXiNHOJHBZAonGGwwa8GwtqPSfMFkSHZMzVxlyy/tCk/JkEQEY84x6iDxlH7FLD45CYLpw1l4YQd0bZ8xC09OcDSYuvCoY5egBbN0N5zTAr1Q6fWSoLgHFS7wFGsQAyZZNAtXpBuTUFeZm/1FMK9RN6+xCl1kTUceJWyYxbfvNJilmyEgqUjFd+8X6YUu0lmSLJeyfJ9OcepRusUI6i5xhkRwIsdzXmywwVQclOjTYqbDd8CFk2VmTpyY/QdLmi+y2ZyCoWauwgw703XLzJk77ILXS5F7A8x1xbYph5Pr5mqvDHfCCZRVmxpPdm/CrMT5eUosJ6Xku3DseGCWV/XexbeDlOuGnc/kY4b1OACqIcZ+JuphtfYMTG4kgGCE3I4tYPwcUB/K9a/9dBa1Lm/nXbGEXYICMNpnH+wvRmHHBQu6eS/wMwOKSW8fb1cPDLTuENRDunW8ofnZsRR1noLZj/BDbwBgtH3lLbbawPZl9r2ekOW2IM/zUNjtswDaxg0yZMtk1J7sz65pt1kI5nnzV2gTAi+WcTHs0hY8q1Gj8xqVafcWffDF4fmfxVDC2AcvjZBCDt0+b2HT/vt1L13Soqf3cK9Z+vfD6vfedoDmqLYKSV1CfyfPM2ivXz/aEB5/cP3xAiAkrWMOmg/edk86dtXPYE/vWqX7+vH+/ygTHj4fw4UMsb12SjVeSjndWyne1f1ZhPGELtI5IcT60IN/E7cpETXV/Hw3LwlEVeghvyuPkbA0CyfRjdUxJ0XzAfrzB2E58W0xjIVjOXGiN3aGxB71SdIgMUtPzFnIrpPoijKCE+OHRx64JglTPXmGPAgx7DByQQZl7+apjB1xyj1GJrlFjVfuoTxPydwpq3gyBzN3zWx5Ies8jyxbZd9hZsxO3jSflf4sEW/NXJR+HVN4y34gm4hJ8IBIjlKvXdmr0YKZWJPOSKCgRCciiY0nR0nOhZPGPHXUaSxmOUqypeFNPLlKyXWWrvcAM6UXpvG8ZmGm+GT5eqA/SuiJYg8Kiyh+c4x4rhuv6MoJ7nGi4jedXXOi2J5fv3Xr1q0s/QP8eTmKWRVH6QAAAABJRU5ErkJggg==";
    return (
        <Preview
            src={props.src === "0" ? defaultimg : props.src}
            {...styles}
            whileHover={whileHover}
            animate={animate}
            transition={transition}
            initial={initial}
        >
            {props.children}
        </Preview>
    );
}

const Preview = styled(motion.img)`
    ${(props) => (props.mystyles ? `${props.mystyles}` : "")};
`;
