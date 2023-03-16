import styled from "styled-components";

const SelectContainer = styled.div`
  position: relative;
  height: 30px;
  min-width: 130px;
  display: flex;
  align-items: center;

  &:after {
    content: "\\2304";
    color: ${(props) => props.theme.color.lightText};
    top: -2px;
    right: 6px;
    position: absolute;
    pointer-events: none;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  font-size: 1rem;
  padding: 5px 20px 5px 8px;
  background-color: ${(props) => props.theme.color.input};
  color: ${(props) => props.theme.color.lightText};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: ${(props) => props.theme.radius.small};
  -webkit-appearance: none;

  &:active &:focus {
    border: 1px solid lighten(${(props) => props.theme.color.primary}, 15%);
    box-shadow: 0 0 0.2rem lighten(${(props) => props.theme.color.primary}, 15%);
  }
`;

export { SelectContainer, StyledSelect };
