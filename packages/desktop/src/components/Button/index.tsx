import { StyledButton } from "@noteup/shared/components/Button/style";
import { open } from "@tauri-apps/api/dialog";
import { readBinaryFile } from "@tauri-apps/api/fs";

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
  const handleTauriClick = () => {
    open({
      filters: [
        {
          name: "files",
          extensions: ["json"],
        },
      ],
    }).then((path: string) => {
      if (typeof path === "string") {
        readBinaryFile(path).then((res) => {
          const blob = new Blob([res], { type: "application/octet-stream" });
          const file = new File([blob], "test", { type: "application/octet-stream" });
          onUpload && onUpload(file);
        });
      }
    });
  };

  return (
    <StyledButton
      className={className}
      disabled={disabled}
      title={title}
      variant={variant}
      onClick={handleTauriClick}
    >
      {children}
    </StyledButton>
  );
};
