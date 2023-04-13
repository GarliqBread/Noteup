import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  .clear-button {
    position: absolute;
    right: 5px;
    color: ${(props) => props.theme.color.primary};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  background-color: ${(props) => props.theme.color.input};
  color: ${(props) => props.theme.color.lightText};
  border-radius: ${(props) => props.theme.radius.small};
  border: 0.5px solid ${(props) => props.theme.color.border};
  box-shadow: ${(props) => props.theme.color.shadow};
  font-size: 15px;

  @media (max-width: 500px) {
    padding: 13px;
  }
`;

export { InputContainer, StyledInput };
