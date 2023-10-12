import SignUpForm from "../SignUpForm";
import signUpStyles from "./SignUpModal.module.scss";
import { Logo } from "@/components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalContext } from "@/utils/contexts";
import { usePopup } from "@/utils/hooks";
import { useContext, useEffect } from "react";
import { getSignUpModal } from "@/utils/reducers/modalReducer";
import { getSignInModal } from "@/utils/reducers/modalReducer";
import { BrowserRouter } from "react-router-dom";

function SignUpModal({ animation }) {
  const [isModalOpen, handleClick, containerRef] = usePopup(true);
  const { dispatch } = useContext(ModalContext);
console.log("rendered");
  useEffect(() => {
    if (!isModalOpen) {
      dispatch(getSignUpModal({ isOpen: false }));
    }
  }, [isModalOpen, dispatch]);

  return (
    <div
      className={[
        signUpStyles["sign-up-modal"],
        signUpStyles[animation] ?? "",
      ].join(" ")}
      ref={containerRef}
      tabIndex="-1"
    >
      <div className={signUpStyles["page-logo"]}>
        <BrowserRouter>
          <Logo />
        </BrowserRouter>
        <h3 className={signUpStyles["welcome-heading"]}>Sign Up</h3>
        <h4 className={signUpStyles["sub-heading"]}>Let's get started</h4>
      </div>
      <SignUpForm />
      <div className={signUpStyles["sign-in-link"]}>
        <p>
          Already have and account?
          <span
            className={signUpStyles["link"]}
            onClick={(event) => {
              event.stopPropagation();
              dispatch(
                getSignInModal({
                  isOpen: true,
                  animation: "slide-in-left",
                })
              );
            }}
          >
            Sign In
          </span>
        </p>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch(getSignUpModal({ isOpen: false }));
          handleClick();
        }}
        className={signUpStyles["close-button"]}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
export default SignUpModal;
