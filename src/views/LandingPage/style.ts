import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  margin: 0 auto;
  overflow-x: hidden;
`;

export const Navbar = styled.nav<{ shadow: boolean }>`
  width: 100%;
  background-color: #ffffff;
  padding: 16px;
  position: sticky;
  top: 0;
  box-shadow: ${(props) => props.shadow && "rgba(0, 0, 0, 0.04) 0px 3px 5px"};
  transition: box-shadow 1 ease;

  .banner {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const InnerNavbar = styled.div`
  width: 100%;
  max-width: 1240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;

  svg {
    margin-right: 8px;
  }

  mark {
    background-color: transparent;
    color: ${(props) => props.theme.color.primary};
  }
`;

export const Section = styled.section`
  width: 100%;
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  margin: 0 auto;
`;

export const Header = styled.h1`
  text-align: center;
  font-size: 46px;
  font-weight: 600;
  line-height: 1.2;
  font-family: Tahoma;

  @media (max-width: 500px) {
    font-size: 32px;
  }
`;

export const SubHeader = styled.h2`
  max-width: 50%;
  margin: 30px 0;
  text-align: center;
  font-size: 22px;
  font-family: Tahoma;

  @media (max-width: 500px) {
    font-size: 18px;
    max-width: 90%;
  }
`;

export const AppButton = styled(Link)`
  padding: 10px 25px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 3px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 900px;
`;

export const AppImage = styled.img`
  width: 100%;
  height: auto;
  box-shadow: rgba(150, 150, 193, 0.4) 5px 5px, rgba(150, 150, 193, 0.1) 10px 10px,
    rgba(150, 150, 193, 0.05) 15px 15px;
  margin-top: 10px;
`;
