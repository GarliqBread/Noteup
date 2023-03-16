import styled from "styled-components";

const StyledButton = styled.button<{ variant?: string }>`
  display: flex;
  align-items: center;
  padding: 9px 10px;
  border: none;
  border-radius: ${(props) => props.theme.radius.small};
  background-color: ${(props) =>
    props.variant === "primary"
      ? props.theme.color.primary
      : props.variant === "danger"
      ? props.theme.color.danger
      : props.theme.color.darkGray};
  color: ${(props) =>
    props.variant === "primary" || props.variant === "danger"
      ? props.theme.color.white
      : props.theme.color.text};
  cursor: pointer;
  gap: 10px;

  &:hover {
    background-color: ${(props) =>
      props.variant === "danger"
        ? props.theme.color.danger
        : props.variant === "primary"
        ? props.theme.color.primary
        : props.theme.color.darkerGray};
    color: ${(props) => props.variant === "danger" && props.theme.color.white};
    opacity: ${(props) => (props.variant === "primary" ? 0.9 : 1)};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.color.input};
    color: ${(props) => props.theme.color.lightText};
  }

  @media (max-width: 500px) {
    padding: 13px;
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
