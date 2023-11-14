import { Logo } from "@/components";
import ChangeCardForm from "../ChangeCardForm";
import changeCardStyle from "./ChangeCardModal.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { ModalContext } from "@/utils/contexts";
import { usePopup } from "@/utils/hooks";
import { getChangeCard, getSignUpModal } from "@/utils/reducers/modalReducer";
import { BrowserRouter } from "react-router-dom";

function ChangeCard({ animation }) {
  const [isModalOpen, handleClick, containerRef] = usePopup(true);
  const { dispatch } = useContext(ModalContext);

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(getChangeCard({ isOpen: false }));
    }
  }, [isModalOpen, dispatch]);

  return (
    <div
      className={[
        changeCardStyle["sign-in-modal"],
        changeCardStyle[animation] ?? "",
      ].join(" ")}
      tabIndex="-1"
      ref={containerRef}
    >
      <div className={changeCardStyle["page-logo"]}>
        <Logo />

        <h3 className={changeCardStyle["welcome-heading"]}>
          Change your Bank account Card number
        </h3>
      </div>
      <ChangeCardForm setModalOpen={handleClick} />
      <div className={changeCardStyle["sign-up-link"]}></div>
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
        className={changeCardStyle["close-button"]}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

export default ChangeCard;
