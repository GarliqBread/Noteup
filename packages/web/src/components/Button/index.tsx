import { StyledButton } from "@noteup/shared/components/Button/style";
import { ChangeEvent, useRef } from "react";

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
