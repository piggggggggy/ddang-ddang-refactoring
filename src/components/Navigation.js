import styled from "styled-components";
import { Grid } from "../elements";
import NavigationMenu from "./NavigationMenu";

export default function Navigation() {
  const path = window.location.pathname.split('/')[1];

  const iterator = Array.from({ length: 5 }, () => 0);
  const selectedIndex = (() => {
    switch (path) {
      case '' :
        return 0;
      case 'ranking':
        return 1;
      case 'quest':
        return 2;
      case '':
        return 3;
      case 'myPage':
        return 4;
      default:
        return 0;
    }
  })();

  return (
    <NavigationWrapper>
      <NavigationCircle/>
      <Grid
        mystyles={
          'position: relative; z-index: 1001; background: #fff; width: 100%; height: 100%; display: flex;'
        }
      >
        {iterator.map((_, index) => (
          <NavigationMenu key={index} index={index} isSelected={index === selectedIndex}/>
        ))}
      </Grid>
    </NavigationWrapper>
  );
}

const NavigationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  max-width: 428px;
  width: 100%;
  height: 64px;
  background: #fff;
  padding: 0;
`;

const NavigationCircle = styled.div`
  position: absolute;
  left: calc(50% - 66px);
  bottom: 26px;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 2px 2px 14px rgba(0, 0, 0, 0.1);
`;