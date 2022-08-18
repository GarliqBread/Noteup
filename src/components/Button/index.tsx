import { StyledButton, StyledIconButton } from "./style";

type ButtonProps = {
  className?: string;
  title?: string;
  variant?: string;
  onClick: () => void;
  children: string | React.ReactNode;
};

export const Button = ({ className, title, variant, onClick, children }: ButtonProps) => {
  return (
    <StyledButton className={className} title={title} variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export const IconButton = ({ className, title, onClick, children }: ButtonProps) => {
  return (
    <StyledIconButton className={className} onClick={onClick} title={title}>
      {children}
    </StyledIconButton>
  );
};
