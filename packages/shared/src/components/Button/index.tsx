import { StyledButton, StyledIconButton } from "./style";

type ButtonProps = {
  testId?: string;
  className?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  variant?: string;
  disabled?: boolean;
  onClick?: () => void;
  onUpload?: (file: File) => void;
  children: string | React.ReactNode;
};

export const Button = ({
  testId,
  className,
  title,
  type,
  variant,
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <StyledButton
      data-testid={testId}
      className={className}
      disabled={disabled}
      type={type}
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
