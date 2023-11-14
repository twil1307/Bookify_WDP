import CardStyle from "./HistoryCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { usePopup } from "@/utils/hooks";
function HistoryCard({
  hotel,
  address,
  adult,
  price,
  status,
  checkinDate,
  checkoutDate,
}) {
  const stat = status ? "ĐÃ ĐẶT" : "ĐÃ HỦY";
  const [isButtonOpen, handleClick, containerRef] = usePopup();
  return (
    <div className={CardStyle["grid-box"]}>
      <div className={CardStyle["card-header"]}>
        <h5>Hotel {hotel}</h5>
        <label htmlFor="cancel" onClick={handleClick} ref={containerRef}>
          <button className={CardStyle["button"]}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          <div className={CardStyle["pop-up"]}>
            <input
              type="checkbox"
              id="cancel"
              onChange={() => {}}
              hidden
              checked={isButtonOpen}
            />
            <ul className={CardStyle["option-list"]}>
              <li className={CardStyle["primary"]}>Hủy</li>
            </ul>
          </div>
        </label>
      </div>
      <div className={CardStyle["card-body-1"]}>
        <p>{address}</p>
        {/* <p>{adult} người lớn</p> */}
        {/* <p className={CardStyle["blue-color"]}>${price}</p> */}
      </div>
      <div className={CardStyle["card-body-2"]}>
        <p>Trạng thái: {stat}</p>
        {/* <p>Nhận phòng: {checkinDate}</p>
        <p>Trả phòng: {checkoutDate}</p> */}
      </div>
    </div>
  );
}
export default HistoryCard;
