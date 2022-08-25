import styled from "styled-components";

import { Flex } from "styles/layout";

export const StyledSidebar = styled(Flex)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #2d2d2d;

  &:hover {
    overflow-y: auto;
  }
`;

export const SidebarButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  cursor: pointer;
  border: none;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  background-color: ${(props) => (props.selected ? "#232323" : "transparent")};
  color: ${(props) => props.theme.color.white};

  svg {
    color: ${(props) => props.selected && props.theme.color.primary};
    opacity: ${(props) => (props.selected ? 1 : 0.4)};
  }

  &:hover {
    background-color: ${(props) => !props.selected && "#383838"};
    svg {
      opacity: 1;
    }
  }
`;
