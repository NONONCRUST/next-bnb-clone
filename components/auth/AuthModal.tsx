import React from "react";
import SignUpModal from "./SignUpModal";
import { useSelector, RootState } from "../../store";
import LoginModal from "./LoginModal";

interface Props {
  closeModal: () => void;
}

const AuthModal: React.FC<Props> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </>
  );
};

export default AuthModal;
