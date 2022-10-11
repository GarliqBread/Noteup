import { Content } from "@radix-ui/react-popover";
import styled from "styled-components";

const PopoverContent = styled(Content)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.context}};
  padding: 5px;
  border-radius: ${(props) => props.theme.radius.xsmall};
  border: 1px solid ${(props) => props.theme.color.firstLayer};
  min-width: 150px;
  box-shadow: ${(props) => props.theme.color.shadower};
  z-index: 105;
`;

const PopoverItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 5px;
  color: ${(props) => props.theme.color.lightText};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.contrastGray};
  }

  svg {
    opacity: 0.8;
  }
`;

export { PopoverContent, PopoverItem };
