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
  padding: 10px;
  border-radius: ${(props) => props.theme.radius.small};
  border: 0.5px solid ${(props) => props.theme.color.border};
  box-shadow: ${(props) => props.theme.color.shadow};
  font-size: 15px;
`;

export { InputContainer, StyledInput };
