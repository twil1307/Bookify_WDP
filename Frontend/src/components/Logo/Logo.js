import logoStyles from "./Logo.module.scss";
import { faCircleNotch, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

function Logo({ children }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    navigate("/");
  };

  return (
    <div className={logoStyles["logo-wrapper"]} onClick={handleClick}>
      <div className={logoStyles["logo"]}>
        <FontAwesomeIcon
          className={logoStyles["fa-circle-notch"]}
          icon={faCircleNotch}
        />
        <FontAwesomeIcon className={logoStyles["fa-circle"]} icon={faCircle} />
      </div>
      {children}
    </div>
  );
}

export default memo(Logo);
