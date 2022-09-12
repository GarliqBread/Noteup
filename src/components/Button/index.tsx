import { open } from "@tauri-apps/api/dialog";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { ChangeEvent, useRef } from "react";

import { isTauri } from "@/utils/helpers";

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

  const handleTauriClick = () => {
    open({
      filters: [
        {
          name: "files",
          extensions: ["json"],
        },
      ],
    }).then((path) => {
      if (typeof path === "string") {
        readBinaryFile(path).then((res) => {
          const blob = new Blob([res], { type: "application/octet-stream" });
          const file = new File([blob], "test", { type: "application/octet-stream" });
          onUpload && onUpload(file);
        });
      }
    });
  };

  return isTauri ? (
    <StyledButton
      className={className}
      disabled={disabled}
      title={title}
      variant={variant}
      onClick={handleTauriClick}
    >
      {children}
    </StyledButton>
  ) : (
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
