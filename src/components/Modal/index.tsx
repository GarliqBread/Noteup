import { IconButton } from "../Button";
import { Close } from "../Icons";
import { ModalHeader, Overlay, StyledModal, Wrapper } from "./styled";

type Props = {
  header?: string;
  variant?: "small";
  onModalClose: () => void;
  children: React.ReactNode | React.ReactNode[];
};

export const Modal = ({ header, variant, onModalClose, children }: Props) => {
  return (
    <Wrapper>
      <Overlay onClick={onModalClose} />
      <StyledModal variant={variant}>
        <ModalHeader>
          <div>{header}</div>
          <IconButton title="Close modal" onClick={onModalClose}>
            <Close size={18} />
          </IconButton>
        </ModalHeader>
        {children}
      </StyledModal>
    </Wrapper>
  );
};
