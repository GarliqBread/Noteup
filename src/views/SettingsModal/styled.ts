import styled from "styled-components";

export const Version = styled.span`
  position: absolute;
  bottom: 10px;
  left: 15px;
  color: ${(props) => props.theme.color.lightText};
  font-size: ${(props) => props.theme.fontSizes.body};

  @media (max-width: 500px) {
    display: none;
  }
`;
