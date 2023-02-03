import { useAuth } from "@/utils/hooks/useAuth";

import { Modal } from "@/components/Modal";

import { LoginSignup } from "./LoginSignup";

type Props = {
  onModalClose: () => void;
};

export const AuthModal = ({ onModalClose }: Props) => {
  const { isAuthenticated } = useAuth();

  return (
    <Modal variant="small" onModalClose={onModalClose}>
      {!isAuthenticated && <LoginSignup />}
    </Modal>
  );
};
