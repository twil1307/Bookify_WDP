import { Logo } from "@/components";
import SignInForm from "../SignInForm";
import signInModalStyles from "./SignInModal.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { ModalContext } from "@/utils/contexts";
import { usePopup } from "@/utils/hooks";
import { getSignInModal, getSignUpModal } from "@/utils/reducers/modalReducer";
import { BrowserRouter } from "react-router-dom";

function SignInModal({ animation }) {
  const [isModalOpen, handleClick, containerRef] = usePopup(true);
  const { dispatch } = useContext(ModalContext);

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(getSignInModal({ isOpen: false }));
    }
  }, [isModalOpen, dispatch]);

  return (
    <div
      className={[
        signInModalStyles["sign-in-modal"],
        signInModalStyles[animation] ?? "",
      ].join(" ")}
      tabIndex="-1"
      ref={containerRef}
    >
      <div className={signInModalStyles["page-logo"]}>
        <Logo />

        <h3 className={signInModalStyles["welcome-heading"]}>
          Welcome back, Mate
        </h3>
      </div>
      <SignInForm setModalOpen={handleClick} />
      <div className={signInModalStyles["sign-up-link"]}>
        <p>
          Don't have account yet?
          <span
            className={signInModalStyles["link"]}
            onClick={(e) => {
              // e.stopPropagation();

              dispatch(
                getSignUpModal({
                  isOpen: true,
                  animation: "slide-in-right",
                })
              );
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch(
            getSignUpModal({
              isOpen: false,
            })
          );
          handleClick();
        }}
        className={signInModalStyles["close-button"]}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

export default SignInModal;
