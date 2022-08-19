import { StyledButton, StyledIconButton } from "./style";

type ButtonProps = {
  className?: string;
  title?: string;
  variant?: string;
  disabled?: boolean;
  onClick: () => void;
  children: string | React.ReactNode;
};

export const Button = ({ className, title, variant, disabled, onClick, children }: ButtonProps) => {
  return (
    <StyledButton
      className={className}
      disabled={disabled}
      title={title}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export const IconButton = ({ className, title, disabled, onClick, children }: ButtonProps) => {
  return (
    <StyledIconButton className={className} disabled={disabled} onClick={onClick} title={title}>
      {children}
    </StyledIconButton>
  );
};
