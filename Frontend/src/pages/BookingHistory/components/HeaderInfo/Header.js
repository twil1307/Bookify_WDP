import HeaderStyles from "../../BookingHistory.module.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const onClickHandler = (event) => {
    event.stopPropagation();
    navigate("/profile");
  };

  return (
    <>
      <ul className={HeaderStyles["breadcrumb"]}>
        <li>
          <a onClick={onClickHandler}>Tài Khoản</a>
        </li>
        <li>Lịch sử đặt phòng</li>
      </ul>
      <h2 className={HeaderStyles["title"]}>Lịch sử đặt phòng</h2>
      <p className={HeaderStyles["sub-title"]}>
        Esse tempor magna et nulla sunt ea excepteur tempor incididunt nisi
        labore id.
      </p>
    </>
  );
}
export default Header;
