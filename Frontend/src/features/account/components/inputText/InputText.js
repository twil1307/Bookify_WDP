import InputTextStyles from "./inputText.module.scss";
import React, { memo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { ModalContext, UserContext } from "@/utils/contexts";
import { getPasswordModal } from "@/utils/reducers/modalReducer";
function InputText({
  value,
  onValueChange,
  id,
  label,
  type,
  isValid = true,
  isSignIn = false,
  icon = null,
}) {
  const { dispatch } = useContext(ModalContext);
  // console.log("input field rerender");
  const inputLabel = label !== "Card" ? label : "Card Number";
  const inputPlaceholder = label !== "Card" ? label : "XXXX-XXXX-XXXX-XXXX";
  const ClickHandler = (e) => {
    e.preventDefault();
    type === "password"
      ? dispatch(getPasswordModal({ isOpen: true, modal: "new password" }))
      : dispatch(getPasswordModal({ isOpen: true, modal: "new card number" }));
  };

  return (
    <>
      <span className={InputTextStyles["input-row"]}>
        <span className={InputTextStyles["input-field"]}>
          <label htmlFor={inputLabel}>
            <b className={InputTextStyles["label"]}>{inputLabel}</b>
          </label>
          <div>
            <input
              id={id}
              className={[
                isValid ? "" : InputTextStyles["error"],
                type === "password" || label === "Card"
                  ? InputTextStyles["input-password"]
                  : InputTextStyles["input-update"],
              ].join(" ")}
              readOnly={true}
              type={type}
              value={value}
              placeholder={inputPlaceholder}
              onChange={(e) => onValueChange(e.target.value)}
            />
            {type === "password" || label === "Card" ? (
              <button
                className={InputTextStyles["button"]}
                onClick={ClickHandler}
              >
                <FontAwesomeIcon icon={faWrench} />
              </button>
            ) : (
              ""
            )}
          </div>
        </span>
      </span>
    </>
  );
}

export default memo(InputText);
