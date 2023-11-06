import { Logo } from "@/components";
import NewPasswordForm from "../NewPasswordForm";
import ModalStyles from "../PasswordModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { ModalContext } from "@/utils/contexts";
import { usePopup } from "@/utils/hooks";
import { getNewPasswordModal } from "@/utils/reducers/modalReducer";
import { BrowserRouter } from "react-router-dom";

function NewPasswordModal({ animation }) {
  const [isModalOpen, handleClick, containerRef] = usePopup(true);
  const { dispatch } = useContext(ModalContext);
  useEffect(() => {
    if (!isModalOpen) {
      dispatch(getNewPasswordModal({ isOpen: true }));
    }
  }, [isModalOpen, dispatch]);
  return (
    <div
      className={[
        ModalStyles["sign-in-modal"],
        ModalStyles[animation] ?? "",
      ].join(" ")}
      tabIndex="-1"
      ref={containerRef}
    >
      <div className={ModalStyles["page-logo"]}>
        <BrowserRouter>
          <Logo />
        </BrowserRouter>
      </div>
      <p className={ModalStyles["label"]}>Nhập mật khẩu mới của bạn</p>
      <NewPasswordForm />
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch(
            getNewPasswordModal({
              isOpen: false,
            })
          );
          handleClick();
        }}
        className={ModalStyles["close-button"]}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
export default NewPasswordModal;
