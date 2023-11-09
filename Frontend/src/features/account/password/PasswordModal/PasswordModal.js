import { Logo } from "@/components";
import PasswordForm from "../PasswordForm";
import ModalStyles from "../PasswordModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { ModalContext } from "@/utils/contexts";
import { usePopup } from "@/utils/hooks";
import { getPasswordModal } from "@/utils/reducers/modalReducer";
import { BrowserRouter } from "react-router-dom";

function PasswordModal({ animation, submodal }) {
  const [isModalOpen, handleClick, containerRef] = usePopup(true);
  const { dispatch } = useContext(ModalContext);
  // console.log(submodal);
  useEffect(() => {
    if (!isModalOpen) {
      dispatch(getPasswordModal({ isOpen: true }));
    }
  }, [isModalOpen, dispatch]);
  return (
    <div
      className={[
        ModalStyles["sign-in-modal"],
        ModalStyles[animation] ?? "",
      ].join(" ")}
      ref={containerRef}
    >
      <div className={ModalStyles["page-logo"]}>
        <BrowserRouter>
          <Logo />
        </BrowserRouter>
      </div>
      <p className={ModalStyles["label"]}>
        <b>Nhập mật khẩu</b> của bạn để thực hiện
      </p>
      <PasswordForm submodal={submodal} />
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch(
            getPasswordModal({
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

export default PasswordModal;
