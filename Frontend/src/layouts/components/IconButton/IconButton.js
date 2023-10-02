import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconButtonStyles from "./IconButton.module.scss";
import { usePopup as useDropdown } from "@/utils/hooks";
import { useClsx } from "@/utils/hooks";
import { ModalContext, UserContext } from "@/utils/contexts";
import { useContext } from "react";
import { getSignInModal } from "@/utils/reducers/modalReducer";

function IconButton({ icon, renderChild, isHasNotifUnRead = null }) {
  const [isOpen, handleClick, containerRef] = useDropdown();
  const { user } = useContext(UserContext);
  // console.log(user);

  return (
    <div
      className={useClsx(iconButtonStyles["icon-button-wrapper"])}
      ref={containerRef}
    >
      <button
        className={useClsx(
          iconButtonStyles["icon-button"],
          isHasNotifUnRead ? iconButtonStyles["unread"] : ""
        )}
        onClick={(e) => {
          e.stopPropagation();
         
          handleClick(e);
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
      {isOpen && renderChild(handleClick)}
    </div>
  );
}

export default IconButton;
