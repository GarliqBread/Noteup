import { Content, Item, SubContent, SubTrigger } from "@radix-ui/react-context-menu";
import styled from "styled-components";

const ContextWrapper = styled.div`
  position: relative;
  width: 100%;

  &:hover {
    .dropdown-icon {
      visibility: visible !important;
    }
  }
`;

const ContextContent = styled(Content)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.context}};
  padding: 5px;
  border-radius: ${(props) => props.theme.radius.xsmall};
  border: 1px solid ${(props) => props.theme.color.firstLayer};
  min-width: 200px;
  box-shadow: ${(props) => props.theme.color.shadower};
  z-index: 105;

  .select {
    margin: 3px 0 8px 0;

    select {
      padding: 8px;
    }
  }
`;

const ContextMenuSubContent = styled(SubContent)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.context}};
  padding: 5px;
  border-radius: ${(props) => props.theme.radius.xsmall};
  border: 1px solid ${(props) => props.theme.color.firstLayer};
  min-width: 150px;
  box-shadow: ${(props) => props.theme.color.shadower};
  z-index: 106;
`;

const ContextItem = styled(Item)<{ danger?: "true" | undefined }>`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 5px;
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

const ContextMenuSubTrigger = styled(SubTrigger)`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.color.lightText};
  gap: 5px;

  &:hover,
  &[data-state="open"] {
    background-color: ${(props) => props.theme.color.contrastGray};
  }

  svg {
    opacity: 0.8;
  }
`;

export {
  ContextWrapper,
  ContextContent,
  ContextItem,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
};
