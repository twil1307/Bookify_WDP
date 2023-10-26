import HeaderInfoStyle from "./HeaderInfo.module.scss";
import { useNavigate } from "react-router-dom";

function HeaderInfo() {
  const navigate = useNavigate();

  const onClickHandler = (event) => {
    event.stopPropagation();
    navigate(-1);
  };

  return (
    <>
      <ul className={HeaderInfoStyle["breadcrumb"]}>
        <li>
          <a onClick={onClickHandler}>Tài Khoản</a>
        </li>
        <li>Đăng nhập và bảo mật</li>
      </ul>
      <h2 className={HeaderInfoStyle["title"]}>Đăng nhập và bảo mật</h2>
      <p className={HeaderInfoStyle["sub-title"]}>
        Esse tempor magna et nulla sunt ea excepteur tempor incididunt nisi
        labore id.
      </p>
    </>
  );
}

export default HeaderInfo;
