import AccountCardStyles from "./AccountCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function AccountCard({ icon, title, description, path}) {
  const navigate = useNavigate();

  const routing = (e) => {
    e.stopPropagation();
    navigate(path);
  }

  return (
    <div className={AccountCardStyles["card"]} onClick={routing}>
      <div className={AccountCardStyles["container"]}>
        <span className={AccountCardStyles["icon"]}>
          <FontAwesomeIcon icon={icon} />
        </span>

        <h4 className={AccountCardStyles["title"]}>
          <b>{title}</b>
        </h4>
        <p className={AccountCardStyles["description"]}>{description}</p>
      </div>
    </div>
  );
}

export default AccountCard;
