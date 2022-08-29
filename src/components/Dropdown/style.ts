import { Content, Item } from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";

const MenuContent = styled(Content)`
display: flex;
flex-direction: column;
gap: 3;
background-color: ${(props) => props.theme.color.context}};
padding: 5px 0;
border-radius: ${(props) => props.theme.radius.xsmall};
border: 1px solid ${(props) => props.theme.color.firstLayer};
min-width: 250px;
box-shadow: ${(props) => props.theme.color.shadower};
z-index: 105;

.select {
  margin: 8px 10px;

  select {
    padding: 8px;
  }
}
`;

const TriggerButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.color.text};
  border: none;
  padding: 5px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;

  .dropdown-icon {
    visibility: hidden;
  }
`;

const DropItem = styled(Item)<{ danger?: "true" | undefined }>`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.color.lightText};
  gap: 5px;

  &:hover {
    background-color: ${(props) =>
      props.danger ? props.theme.color.danger : props.theme.color.contrastGray};
    color: ${(props) => props.danger && props.theme.color.white};
  }

  svg {
    opacity: 0.8;
  }
`;

export { MenuContent, TriggerButton, DropItem };
