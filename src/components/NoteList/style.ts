import styled from "styled-components";

const NotesList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${(props) => props.theme.color.noteList};
  border-right: 0.5px solid ${(props) => props.theme.color.border};
`;

const List = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const EmptyListMessage = styled.p`
  width: 100%;
  margin-top: 20px;
  text-align: center;
  color: ${(props) => props.theme.color.gray};
`;

const SearchContainer = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid ${(props) => props.theme.color.border};
`;

const NoteItemContainer = styled.div<{ selected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 8px;
  min-height: 80px;
  background-color: ${(props) =>
    props.selected ? props.theme.color.primary : props.theme.color.noteList};
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  color: ${(props) => (props.selected ? props.theme.color.white : props.theme.color.text)};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => !props.selected && props.theme.color.contrastGray};
  }

  label {
    color: ${(props) =>
      props.selected ? props.theme.color.offWhite : props.theme.color.lightText};
  }

  p {
    color: ${(props) =>
      props.selected ? props.theme.color.offWhite : props.theme.color.lightText};
  }

  .highlighted {
    color: ${(props) => (props.selected ? props.theme.color.primary : props.theme.color.white)};
    background-color: ${(props) =>
      props.selected ? props.theme.color.white : props.theme.color.primary};
  }

  .pin {
    margin-right: 3px;
    color: ${(props) => (props.selected ? props.theme.color.white : props.theme.color.primary)};
  }
`;

export { NotesList, List, EmptyListMessage, SearchContainer, NoteItemContainer };
