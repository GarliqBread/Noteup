import styled from "styled-components";

const TopNav = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.secondLayer};
  border-top: 0.4px solid ${(props) => props.theme.color.border};
  box-shadow: ${(props) => props.theme.color.shadow};
  margin-bottom: 4px;

  @media (max-width: 500px) {
    position: sticky;
    bottom: -1px;
  }
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
