import { ChangeEvent, useRef } from "react";

import { StyledButton, StyledIconButton } from "./style";

type ButtonProps = {
  className?: string;
  title?: string;
  variant?: string;
  disabled?: boolean;
  onClick?: () => void;
  onUpload?: (file: File) => void;
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

export const UploadButton = ({
  className,
  title,
  variant,
  disabled,
  onUpload,
  children,
}: ButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onUpload) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <input
        accept=".json"
        tabIndex={-1}
        autoComplete="off"
        ref={inputRef}
        type="file"
        onChange={handleFileInput}
        style={{
          display: "none",
        }}
      />
      <StyledButton
        className={className}
        disabled={disabled}
        title={title}
        variant={variant}
        onClick={handleClick}
      >
        {children}
      </StyledButton>
    </div>
  );
};

export const IconButton = ({ className, title, disabled, onClick, children }: ButtonProps) => {
  return (
    <StyledIconButton className={className} disabled={disabled} onClick={onClick} title={title}>
      {children}
    </StyledIconButton>
  );
};
