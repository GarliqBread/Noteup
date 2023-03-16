import styled from "styled-components";

const Bar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${(props) => props.theme.color.secondLayer};
  box-shadow: ${(props) => props.theme.color.shadowBottom};
  border-bottom: 0.5px solid ${(props) => props.theme.color.border};
  z-index: 5;
`;

const CommandButton = styled.button`
  padding: 8px 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => props.theme.color.lightText};

  &:hover {
    background-color: ${(props) => props.theme.color.hover};
  }
`;

export { Bar, CommandButton };
