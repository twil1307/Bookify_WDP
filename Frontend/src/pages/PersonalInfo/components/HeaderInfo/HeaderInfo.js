import HeaderInfoStyle from "./HeaderInfo.module.scss";
import { useNavigate } from "react-router-dom";

function HeaderInfo() {
  const navigate = useNavigate();

  const onClickHandler = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <ul className={HeaderInfoStyle["breadcrumb"]}>
        <li>
          <p onClick={onClickHandler} className="profile-button-link">Tài Khoản</p>
        </li>
        <li>Thông tin cá nhân</li>
      </ul>

      <h2 className={HeaderInfoStyle["title"]}>Thông tin cá nhân</h2>
      <p className={HeaderInfoStyle["sub-title"]}>
        Esse tempor magna et nulla sunt ea excepteur tempor incididunt nisi
        labore id.
      </p>
    </>
  );
}

export default HeaderInfo;
