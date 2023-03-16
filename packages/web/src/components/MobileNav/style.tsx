import styled from "styled-components";

const Nav = styled.nav<{ hidden: boolean }>`
  position: sticky;
  top: 0;
  display: ${(props) => props.hidden && "none !important"};
  background-color: ${(props) => props.theme.color.secondLayer};
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  color: ${(props) => props.theme.color.text};
  z-index: 90;

  svg {
    color: ${(props) => props.theme.color.text};
  }

  @media (max-width: 500px) {
    display: flex;
  }
`;

export { Nav };
