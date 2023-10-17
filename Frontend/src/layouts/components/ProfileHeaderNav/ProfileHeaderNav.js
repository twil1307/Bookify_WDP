import profileNav from "./ProfileHeaderNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import OptionList from "../OptionList";
import { usePopup } from "@/utils/hooks";

function ProfileHeaderNav() {
  const [isNavOpen, handleClick, containerRef] = usePopup();

  return (
    <div tabIndex="-1" className={profileNav["profile-header-nav"]}>
      <label htmlFor="button-toggle" onClick={handleClick} ref={containerRef}>
        <button className={profileNav["profile-button"]}>
          <div className={profileNav["profile-icon"]}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className={profileNav["profile-user-avatar"]}>
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
        </button>
        <div className={profileNav["profile-nav"]} tabIndex="-1">
          {isNavOpen && <OptionList handleClick={handleClick} />}
        </div>
      </label>
    </div>
  );
}

export default ProfileHeaderNav;
