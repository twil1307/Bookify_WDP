import HeaderInfoStyle from "./HeaderInfo.module.scss";
import { useNavigate } from "react-router-dom";

function HeaderInfo() {
  const navigate = useNavigate();

  const onClickHandler = (event) => {
    event.stopPropagation();
    navigate("/profile");
  };

  return (
    <>
      <ul className={HeaderInfoStyle["breadcrumb"]}>
        <li>
          <p onClick={onClickHandler}>Tài Khoản</p>
        </li>
        <li>Thanh toán và chi trả</li>
      </ul>
      <h2 className={HeaderInfoStyle["title"]}>Thanh toán và chi trả</h2>
      <p className={HeaderInfoStyle["sub-title"]}>
        Esse tempor magna et nulla sunt ea excepteur tempor incididunt nisi
        labore id.
      </p>
    </>
  );
}

export default HeaderInfo;
