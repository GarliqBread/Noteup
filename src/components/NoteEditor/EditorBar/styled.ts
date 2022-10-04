import styled from "styled-components";

const TopNav = styled.nav`
  width: 100%;
  min-height: 51px;
  max-height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.secondLayer};
  box-shadow: ${(props) => props.theme.color.shadow};
  z-index: 2;
`;

const TopNavButton = styled.button<{ trash?: boolean; primary?: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => (props.primary ? props.theme.color.primary : props.theme.color.lightText)};
  &:hover {
    background-color: ${(props) => props.theme.color.hover};
    color: ${(props) => props.trash && props.theme.color.danger};
  }

  span {
    font-size: 10px;
    margin-left: 5px;
  }
`;

export { TopNav, TopNavButton };
