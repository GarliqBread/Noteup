import styled from "styled-components";

const StyledButton = styled.button<{ variant?: string }>`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: none;
  border-radius: ${(props) => props.theme.radius.small};
  background-color: ${(props) => props.theme.color.darkGray};
  color: ${(props) => props.theme.color.text};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.variant === "danger" ? props.theme.color.danger : props.theme.color.darkerGray};
    color: ${(props) => props.variant === "danger" && props.theme.color.white};
  }
`;

const StyledIconButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:hover {
    background-color: rbga(0, 0, 0, 0.01);
  }
`;

export { StyledButton, StyledIconButton };
